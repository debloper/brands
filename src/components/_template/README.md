# src/components/_template

Implementation scaffold for a new brand — the "compiled" counterpart to
[`context/_template/`](../../context/_template/). Lives under `src/components/`, so unlike
`src/pages/`, nothing here needs an underscore prefix for routing safety — it's excluded from
discovery simply because no `src/pages/_template.astro` route exists for it (and the sibling
`src/pages/_template.astro` reference page is itself excluded by its own underscore).

## Checklist

1. Copy this whole `src/components/_template/` directory to `src/components/<slug>/` — the
   same `<slug>` used under `context/<slug>/`.
2. Copy `src/pages/_template.astro` to `src/pages/<slug>.astro` (dropping the leading `_` is
   what makes it a real, routed page at `/<slug>/`) and update its imports to point at
   `src/components/<slug>/` instead of `src/components/_template/`.
3. Rename `TemplateGuide.astro` to `<YourBrand>Guide.astro` and update the import in
   `src/pages/<slug>.astro` to match.
4. Following `context/<slug>/design.md`, replace `tokens.ts` / `tokens.css` with the brand's
   real values, and `Logo.astro`'s placeholder markup with the real logo.
5. Flesh out `<YourBrand>Guide.astro` with the actual guide content — use
   `src/components/breakerspace/` as a fully worked reference (logo, color, typography,
   applications, code export, asset matrix sections).

Once `src/pages/<slug>.astro` exists, `src/lib/brands.ts` picks it up automatically and the
brand appears on `/`.
