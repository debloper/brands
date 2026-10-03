# BreakerSpace — Design System Specification

> **Version**: 2.0 — June 2026
> **Status**: Source of Truth for all brand-driven implementations

This file is the **how**: the enforceable spec that `src/components/breakerspace/` implements.
For the **why**, see [`README.md`](README.md). For the repo-wide "how to add a brand" process,
see [`/design.md`](../../design.md).

---

## 1. Brand Overview

**BreakerSpace** is a technology organization whose visual identity embodies structured disruption — the idea that meaningful innovation emerges from methodically breaking and rebuilding. The brand system is deliberately constrained to a single HSL hue, reinforcing clarity and accessibility over decorative variety.

### 1.1 Brand Personality

| Trait          | Expression                                    |
|----------------|-----------------------------------------------|
| Precise        | Monotone palette, geometric logo, tight grid  |
| Accessible     | WCAG AA+ contrast, system fonts, color-blind safe |
| Minimal        | No casual decorative flair (without purpose)  |
| Technical      | System-font stack, code-native tokens, monospace accents |

### 1.2 Design Principles

1. **One hue, infinite hierarchy.** All colors derive from HSL 210°. Saturation and luminosity alone create contrast.
2. **Content over decoration.** Typography is the primary visual tool; ornamentation is absent.
3. **System-first.** Every token has a CSS custom property and a TypeScript constant. Nothing is hand-coded.
4. **Accessibility is non-negotiable.** Color-blind users, screen readers, and keyboard navigation are first-class.

---

## 2. Logo System

### 2.1 Construction

The BreakerSpace logo is composed of **seven rounded squares**, each rotated 45° into a diamond orientation, placed on a 3×3 grid. The arrangement evokes an upward arrow or flame — symbolizing directed energy and transformation.

- **Grid**: 3×3, equal spacing
- **Shape**: Rounded rectangle (`rx=48`, `ry=48` in SVG)
- **Rotation**: 45° on every element
- **Filled positions**: (0,0), (0,1), (1,0), (1,2), (2,0), (2,1), (2,2) — the center cell (1,1) is intentionally void, creating negative space that forms the "flame core"

### 2.2 Logo Variants

| Variant             | Use Case                           | Fill Color (Light BG) | Fill Color (Dark BG) |
|---------------------|------------------------------------|-----------------------|----------------------|
| Full — Dark on Light | Default, documents, web header   | `#112233`             | —                    |
| Full — Light on Dark | Dark backgrounds, overlays       | —                     | `#DDEEFF`            |
| Icon Only — Dark    | Favicons, app icons, small UI     | `#112233`             | —                    |
| Icon Only — Light   | Dark mode favicons, dark UI bars  | —                     | `#DDEEFF`            |
| Wordmark Only — Dark| Text-only contexts                | `#112233`             | —                    |
| Wordmark Only — Light| Text-only dark contexts          | —                     | `#DDEEFF`            |

### 2.3 Clear Space

Maintain a minimum exclusion zone around the logo equal to the **height of one diamond** (one grid unit). No text, graphics, or page edges may enter this zone.

### 2.4 Logo Misuse (Forbidden)

- Do not stretch, skew, or rotate the logo composition
- Do not change the fill color to any color outside the brand palette
- Do not add gradients, shadows, or outlines
- Do not place on low-contrast backgrounds
- Do not rearrange the diamond positions

---

## 3. Color System

### 3.1 Philosophy

All colors are derived from **HSL hue 210°** (a cool, authoritative blue). By varying only saturation (S) and luminosity (L), the system creates:

- A cohesive visual identity (single hue = instant recognition)
- Built-in color-blind accessibility (contrast relies on luminosity, not hue)
- A simple mental model for designers and engineers

### 3.2 Primary Brand Colors

| Token                          | Hex       | HSL                    | Role                         |
|--------------------------------|-----------|------------------------|------------------------------|
| `--brand-dark-baseline`        | `#001122` | `hsl(210, 100%, 7%)`   | Dark mode background, thematic undertone |
| `--brand-dark-contrast`        | `#DDEEFF` | `hsl(210, 100%, 93%)`  | Dark mode foreground, visual contrast    |
| `--brand-light-baseline`       | `#FAFCFE` | `hsl(210, 67%, 99%)`   | Light mode background, thematic undertone |
| `--brand-light-contrast`       | `#112233` | `hsl(210, 50%, 13%)`   | Light mode foreground, visual contrast   |

### 3.3 Extended Palette

| Token                     | Hex       | HSL                    | Role                    |
|---------------------------|-----------|------------------------|-------------------------|
| `--brand-slate`           | `#445566` | `hsl(210, 20%, 33%)`   | Controlled contrast, borders |
| `--brand-gray-blue`       | `#667788` | `hsl(210, 14%, 47%)`   | Medium contrast, muted text |
| `--brand-pale-blue`       | `#CCDDEE` | `hsl(210, 50%, 87%)`   | Medium brightness, dividers |
| `--brand-bright-blue`     | `#EFF7FF` | `hsl(210, 100%, 97%)`  | Controlled brightness, hover states |

### 3.4 Semantic Color Tokens

Both light and dark modes are specified. See `tokens.css` for the canonical values — the table below is descriptive, not the source of truth.

**Light Mode (`:root`):** `--background` → light baseline, `--foreground` → light contrast, `--muted-foreground` → gray blue, `--accent`/`--border`/`--input` → pale blue, `--ring` → slate.

**Dark Mode (`.dark`):** `--background` → dark baseline, `--foreground` → dark contrast, `--secondary`/`--muted`/`--accent` → light contrast, `--ring` → slate.

### 3.5 Contrast Ratios

| Pair                                    | Ratio  | WCAG Level |
|-----------------------------------------|--------|------------|
| `#112233` on `#FAFCFE` (light mode)     | 15.8:1 | AAA        |
| `#DDEEFF` on `#001122` (dark mode)      | 14.2:1 | AAA        |
| `#667788` on `#FAFCFE` (muted light)    | 5.1:1  | AA         |
| `#667788` on `#001122` (muted dark)     | 4.6:1  | AA         |

---

## 4. Typography

### 4.1 Typeface Stack

| Role         | Family                                                                  | Fallback Chain                                    |
|--------------|-----------------------------------------------------------------------|----------------------------------------------------|
| **Wordmark** | Montserrat                                                              | system sans-serif                                 |
| **Body / UI**| "Noto Sans", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif | platform native stack              |
| **Monospace**| "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace | standard mono stack                               |

### 4.2 Wordmark Usage

Montserrat is **reserved exclusively** for the BreakerSpace wordmark and identifiable brand entities. It must never be used for body copy, UI labels, or any general text.

- **Weight**: Light (300) or Thin (100)
- **Tracking**: Tight (`-0.025em`) at display sizes
- **Color**: Inherit from context (`#112233` on light, `#DDEEFF` on dark)

### 4.3 Type Scale

| Level    | Size      | Line Height | Weight | Tracking     | Use Case                        |
|----------|-----------|-------------|--------|--------------|---------------------------------|
| Display  | 3.75rem   | 1           | 300    | -0.025em     | Hero headlines, splash text     |
| Heading 1| 3rem      | 1           | 500    | -0.025em     | Page titles                     |
| Heading 2| 2.25rem   | 1.1         | 500    | -0.025em     | Section headers                 |
| Heading 3| 1.875rem  | 1.2         | 500    | normal       | Subsections                     |
| Body     | 1rem      | 1.5         | 400    | normal       | Paragraph text, descriptions    |
| Caption  | 0.875rem  | 1.43        | 400    | normal       | Labels, metadata, footnotes     |
| Overline | 0.75rem   | 1.33        | 500    | 0.05em       | Section labels, category tags   |

### 4.4 Typography Rules

- Montserrat is for the wordmark or brand-identifying content only — never body text
- System font stack ensures fast loading and wide Unicode/device coverage
- Noto Sans provides comprehensive CJK and international glyph support
- Decorative and script fonts are prohibited (unless intended)
- Maintain WCAG AA contrast at minimum for all text

---

## 5. Spacing & Layout

Base unit is **0.25rem (4px)**; all spacing is a multiple of it. Container max width is `80rem`, page padding is `1.5rem` (mobile) / `2.5rem` (desktop). Border radius base is `0.625rem`. See `tokens.ts` (`brandSpacing`, `brandRadius`, `brandContainer`) for exact values.

---

## 6. Implementation

This directory is **context only** — the spec above, plus reference assets. The actual Astro
implementation built from it lives at `src/components/breakerspace/` (+ its route,
`src/pages/breakerspace.astro`):

| File | Purpose |
|------|---------|
| `src/pages/breakerspace.astro` | The routed page (`/breakerspace/`) |
| `src/components/breakerspace/tokens.ts` | Brand tokens as typed constants — colors, type scale, spacing, radius |
| `src/components/breakerspace/tokens.css` | The same values as CSS custom properties (`:root` / `.dark`) — drop this into any project to reskin it with BreakerSpace colors |
| `src/components/breakerspace/Logo.astro` | Logo component (`variant`: full/icon/wordmark, `theme`: light/dark, `size`) |
| `src/components/breakerspace/BreakerSpaceGuide.astro` | The full interactive brand guide content — composed from the sibling section components |
| `brand.config.ts` (in this directory) | Metadata consumed by the repo's landing page (name, tagline, swatch colors) |
| `assets/branding.html` | Archived v1 Figma export, reference only |

To reuse BreakerSpace's look elsewhere: copy `src/components/breakerspace/`, import `tokens.css`
for theming and `Logo.astro` for the mark. The guide and section components are presentation-only
and are not required for reuse.

### Responsive Behavior

- Mobile-first: design for 375px, enhance for 768px, 1024px, 1280px
- Logo scales: 24px (mobile nav) → 32px (tablet) → 48px (desktop hero)
- Type scale: Caption and Body are constant; headings step down one level on mobile
