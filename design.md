# brands — Repository Design & Architecture Spec

> This file is the **how**: the implementation contract for this repository. It is the
> repo-wide equivalent of an `AGENTS.md`/`CLAUDE.md` — read it before adding or restructuring
> anything. For the **why**, see [`README.md`](README.md). For a specific brand's actual design
> spec (colors, type, logo rules), see `context/<slug>/design.md`.

---

## 1. Purpose

This repository hosts the branding and design guide for **every** entity ("brand") the owner
runs — not just one. Every brand has two matching locations:

- `context/<slug>/` — the brand's **intent**: written spec, overview, and reference material
  (mood boards, exports, archives). Human- or agent-authored, contains no Astro/UI code.
- `src/components/<slug>/` — the brand's **implementation**: tokens, logo, and the composed
  guide component that realize that intent, plus a single-file route (`src/pages/<slug>.astro`)
  that renders it.

Think of `context/<slug>/` as source material and `src/components/<slug>/` as the build output a
coding agent (or a person) produces from it — kept separate specifically so editing one never
risks accidentally breaking or conflating the other.

On top of that, the repo provides:

1. A **landing page** (`/`) listing every brand that has both context and an implementation.
2. A **guide page** per brand (`/<slug>/`) rendering that brand's own design guide, themed with
   that brand's own tokens.
3. A **contract** (this file + the `_template` scaffolds) so adding a brand never requires
   touching shared code, config, or a central registry.

## 2. Core principle: zero-config discovery

Brands are discovered by directory shape, not by editing a list anywhere. `src/lib/brands.ts`
joins `context/<slug>/brand.config.ts` (metadata) with the existence of `src/pages/<slug>.astro`
(a real, working page) — a brand only appears on the landing page once **both** exist. Nothing
elsewhere needs editing when a new brand is added.

Do not introduce a central `brands.json`/registry/`switch` statement that enumerates brands by
name. If you find yourself wanting one, you're fighting the architecture — extend
`src/lib/brands.ts`'s discovery convention instead.

## 3. Tech stack & why

- **Astro**, static output. Each brand's guide page compiles down to plain HTML/CSS with no
  framework runtime tax, and its implementation directory (`src/components/<slug>/`) can be
  lifted into another Astro project far more easily than a Next.js page.
- **Tailwind v4** for the repo's own UI (landing page, brand guide chrome). Brand *tokens*
  themselves are always plain CSS custom properties (`tokens.css`) first — Tailwind's `@theme`
  layer just consumes those variables. This means a brand's tokens are usable even by teams not
  using Tailwind.
- No client-side framework (React/Vue/etc.) — interactivity (tabs, copy-to-clipboard, scroll
  spy) is small vanilla `<script>` blocks, kept dependency-free for portability.

## 4. Dark/light mode

The landing page (`/`) has a dark/light toggle, defaulting to the visitor's OS preference and
persisting their explicit choice in `localStorage` (`theme` key). It's implemented as a single
self-contained component, `src/components/ThemeToggle.astro` — it renders the toggle button and
also carries its own `is:inline` init script (reads the stored/system preference and applies the
`.dark` class on `<html>` synchronously, before paint, to avoid a flash of the wrong theme). Drop
`<ThemeToggle />` as the first thing in a page's body to get both behaviors at once; it renders
`position: fixed` so where exactly it sits in the DOM doesn't affect layout.

Brand pages **do not** have this yet — deliberately, so each brand's dark-mode support ships
brand-by-brand instead of all at once. Each brand's `tokens.css` already has a `.dark` block as
scaffolding (Tailwind's `dark:` variant and the `.dark` CSS custom properties are ready), so
adding brand-level dark mode later should just mean reusing `<ThemeToggle />` inside that brand's
page/guide component — no new mechanism needed.

## 5. Adding a new brand

This is a two-step process — write the context, then implement it.

### Step 1 — author the context

1. Copy `context/_template/` to `context/<slug>/` (lowercase, URL-safe — `<slug>` becomes the
   route `/<slug>/`).
2. Fill in `design.md` (the brand's actual spec: colors, type, logo rules, do's/don'ts),
   `README.md` (a few-line overview), `brand.config.ts` (name/tagline/swatch colors), and drop
   any reference material (mood boards, Figma exports, existing logo files) into `assets/`.

### Step 2 — implement it

3. Copy `src/components/_template/` to `src/components/<slug>/`, and `src/pages/_template.astro`
   to `src/pages/<slug>.astro` (same `<slug>`; dropping the leading `_` is what makes it a real,
   routed page). Use `src/components/breakerspace/` + `src/pages/breakerspace.astro` as a fully
   worked reference.
4. Following `context/<slug>/design.md`, replace the placeholder tokens, logo, and guide content
   under `src/components/<slug>/` with the real implementation, and update the imports in
   `src/pages/<slug>.astro` to match.
5. That's it — no other file in the repo needs to change. The brand appears on `/` automatically.

### Required shape

`context/<slug>/`:

| File | Required? | Purpose |
|------|-----------|---------|
| `design.md` | required | Brand's own design specification (the "how" for that brand) |
| `README.md` | required | Brand's own short overview (the "why") |
| `brand.config.ts` | required | Metadata: `name`, `tagline`, `colors` (see `src/lib/types.ts`) — this is the only file here that's actually imported by the build |
| `assets/` | optional | Reference material: mood boards, exports, archived files, raw logo assets |

Implementation:

| File | Required? | Purpose |
|------|-----------|---------|
| `src/pages/<slug>.astro` | required | The actual route, rendered at `/<slug>/`. Imports the brand's tokens + guide component from `src/components/<slug>/` and wraps them in `BrandLayout` |
| `src/components/<slug>/tokens.css` | strongly suggested | CSS custom properties (`:root`/`.dark`) — the portable, framework-agnostic form of the brand's tokens |
| `src/components/<slug>/tokens.ts` | suggested | Same values as typed constants, for programmatic use |
| `src/components/<slug>/Logo.astro` | suggested | Logo component |
| `src/components/<slug>/<Brand>Guide.astro` | suggested | The composed guide content, kept out of the page file for readability |
| `src/components/<slug>/components/` | optional | Internal presentation pieces used only by the guide component |

`src/components/` is never scanned by Astro's router, so nothing under `src/components/<slug>/`
needs an underscore prefix or any other routing-safety convention — only `src/pages/` is
routed, which is why the page file there stays a single flat `<slug>.astro`. `_template` is
excluded from discovery by the leading-underscore convention (`src/pages/_template.astro` is
never built as a page; `src/components/_template/` simply has no matching `src/pages/*.astro`).

## 6. How discovery works

`src/lib/brands.ts` eagerly globs `context/*/brand.config.ts` for metadata, and separately globs
(lazily, just for the keys) `src/pages/*.astro` to know which slugs have a real implementation
(excluding `index.astro`, the landing page itself). It joins the two by slug and exposes
`getBrands()` / `getBrand(slug)`. `src/pages/index.astro` lists the result; each brand's own
`src/pages/<slug>.astro` is a perfectly ordinary, flat Astro page — no dynamic routing or
runtime component resolution is involved, so every brand page is independently readable and
type-checked like any other Astro page.

## 7. Portability contract

A team building an actual site/press-kit for a brand should be able to:

1. Copy `src/components/<slug>/` (or just `tokens.css` + `Logo.astro`) into their own project.
2. Use the CSS variables directly, or run it through Astro/any bundler that can import `.astro`
   files, with **no dependency** on this repo's `astro.config.mjs`, layouts, `context/`, or
   `src/lib/brands.ts`.

Keep this in mind before adding a dependency from anything under `src/components/<slug>/` to
something outside its own directory (aside from Tailwind utility classes, which are optional
sugar, not required for the tokens to work).

## 8. Deployment

Target: GitHub Pages, project site at `code.debs.io/brands/` (fixed by the repo name).
`astro.config.mjs` sets `site`/`base` accordingly, and every internal link in the app uses
`import.meta.env.BASE_URL` rather than a hardcoded `/` — this is what makes the routes above work
underneath that subpath. The dev server (`npm run dev`) mirrors the same `/brands` prefix
intentionally, so local URLs (`http://localhost:4321/brands/`, `.../brands/<slug>/`) match
production exactly. `.github/workflows/deploy.yaml` builds and publishes to Pages on every push
to `main` (via `withastro/action` + `actions/deploy-pages`).

## 9. History

This repo started as a single-brand Next.js site for BreakerSpace, then generalized to host any
number of brands. Two decisions from that process are worth knowing:

- The context/implementation split was originally one directory (`entities/<slug>/`) mixing both;
  it was split so a brand's written spec can never be confused with, or accidentally broken by,
  edits to its code.
- Brand implementation code briefly lived under `src/pages/<slug>/_brand/` — an underscore prefix
  was required there only because Astro's router scans everything under `src/pages/`. It moved to
  `src/components/<slug>/` once we noticed `src/components/` was never subject to that scan in the
  first place, removing the need for the escape hatch entirely.
