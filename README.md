# brands

This is where I keep the branding and design guides for everything I run — one repo, one
consistent way to add a new brand. Each brand lives in two matching spots: `context/<slug>/`
(what I've written about it — spec, overview, reference material) and `src/components/<slug>/`
(the actual Astro implementation built from that spec) — kept apart so I never end up editing
one and accidentally breaking the other.

Built with **Astro** and **Tailwind v4**. [`design.md`](design.md) is the technical spec — how
brands are discovered, how to add one, why things are shaped the way they are. Each brand's own
`context/<slug>/README.md` / `design.md` covers that brand specifically.

## Quick start

```bash
npm install
npm run dev
```

Visit `/` for the list of brands, or `/<slug>/` for a specific guide.

## Structure

| Path | Purpose |
|------|---------|
| `design.md` | Repo-wide architecture spec — how brands are discovered, how to add one |
| `context/<slug>/` | One brand's written spec + reference material (no code) |
| `context/_template/` | Scaffold + checklist for a new brand's context |
| `src/pages/<slug>.astro` | One brand's live route — a thin wrapper around `src/components/<slug>/` |
| `src/pages/_template.astro` | Scaffold for a new brand's route (unrouted reference) |
| `src/pages/index.astro` | Landing page — lists discovered brands |
| `src/components/<slug>/` | One brand's tokens, logo, and guide component |
| `src/components/_template/` | Scaffold for a new brand's implementation |
| `src/lib/brands.ts` | Joins `context/` metadata with `src/pages/` implementations — no manual registration needed |
