# BreakerSpace

Structured disruption in a single hue. BreakerSpace's identity is built on one HSL hue (210°),
system fonts, and a seven-diamond logo mark — precision and accessibility over decoration.

See [`design.md`](design.md) for the full specification, or run the repo's dev server and visit
`/breakerspace/` for the live, interactive guide (implemented at `src/components/breakerspace/`).

| Path | Purpose |
|------|---------|
| `design.md` | Canonical design specification |
| `brand.config.ts` | Metadata for the repo's landing page |
| `assets/` | Logo files and the archived v1 Figma export (reference only) |

The actual Astro implementation (tokens, logo component, guide page) lives at
[`../../src/components/breakerspace/`](../../src/components/breakerspace/), routed by
[`../../src/pages/breakerspace.astro`](../../src/pages/breakerspace.astro) — this directory only
holds the brand's context, not its code.
