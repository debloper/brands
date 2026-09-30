# Brand Context Template

This directory is the checklist and scaffold for a new brand's **context** — the written intent,
not the implementation. Copy it, don't edit it in place. For the full two-step process (context
+ implementation) see the root [`design.md`](../../design.md) §5.

## Checklist

1. Copy this entire `context/_template/` directory to `context/<slug>/` — pick a short,
   URL-safe, lowercase `<slug>` (e.g. `acme`, `breakerspace`). This becomes the route `/<slug>/`
   once implemented (see step 5).
2. Edit `brand.config.ts` — `name`, `tagline`, and the three `colors` used to theme its card on
   the landing page. The directory name is the slug; no separate slug field needed.
3. Rewrite this `design.md` with the brand's actual specification (colors, type, logo rules,
   spacing, do's/don'ts) — this is the enforceable "how" a coding agent implements from.
4. Rewrite `README.md` with a few-line "why" overview. Drop any reference material (mood boards,
   Figma exports, existing logo files) into `assets/`.
5. Once this context is filled in, implement it: copy `src/components/_template/` to
   `src/components/<slug>/` and `src/pages/_template.astro` to `src/pages/<slug>.astro` (same
   slug) and follow the checklist in `src/components/_template/README.md` — see root
   `design.md` §5, Step 2. Until that implementation exists, this brand won't appear on the
   landing page.
6. Delete this checklist section (or move it into your own notes) once done.

## Required shape

```
context/<slug>/
  design.md            required — brand specification (the "how" for this brand)
  README.md             required — short overview (the "why")
  brand.config.ts       required — metadata (name, tagline, colors)
  assets/                optional — mood boards, exports, archives, raw logo files
```

Nothing outside this directory needs to change — the landing page discovers new context via
`context/*/brand.config.ts`, and only lists a brand once a matching `src/pages/<slug>.astro`
also exists (see `src/lib/brands.ts`).
