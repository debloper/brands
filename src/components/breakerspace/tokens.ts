/**
 * BreakerSpace Design Tokens — TypeScript
 *
 * Single source of truth for all brand values.
 * These feed into tokens.css, Tailwind's `@theme`, and the Astro components below.
 */

export const brandColors = {
  darkBaseline: '#001122',
  darkContrast: '#DDEEFF',
  lightBaseline: '#FAFCFE',
  lightContrast: '#112233',

  slate: '#445566',
  grayBlue: '#667788',
  paleBlue: '#CCDDEE',
  brightBlue: '#EFF7FF',

  destructive: '#d4183d',
} as const;

export const brandHSL = {
  darkBaseline: 'hsl(210, 100%, 7%)',
  darkContrast: 'hsl(210, 100%, 93%)',
  lightBaseline: 'hsl(210, 67%, 99%)',
  lightContrast: 'hsl(210, 50%, 13%)',
  slate: 'hsl(210, 20%, 33%)',
  grayBlue: 'hsl(210, 14%, 47%)',
  paleBlue: 'hsl(210, 50%, 87%)',
  brightBlue: 'hsl(210, 100%, 97%)',
} as const;

export const brandTypography = {
  wordmark: {
    family: 'Montserrat, sans-serif',
    weights: { thin: 100, light: 300 },
    tracking: '-0.025em',
  },
  body: {
    family: '"Noto Sans", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    weights: { normal: 400, medium: 500 },
  },
  mono: {
    family: '"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },
} as const;

export const brandTypeScale = {
  display: { size: '3.75rem', lineHeight: '1', weight: 300, tracking: '-0.025em' },
  h1: { size: '3rem', lineHeight: '1', weight: 500, tracking: '-0.025em' },
  h2: { size: '2.25rem', lineHeight: '1.1', weight: 500, tracking: '-0.025em' },
  h3: { size: '1.875rem', lineHeight: '1.2', weight: 500, tracking: 'normal' },
  body: { size: '1rem', lineHeight: '1.5', weight: 400, tracking: 'normal' },
  caption: { size: '0.875rem', lineHeight: '1.43', weight: 400, tracking: 'normal' },
  overline: { size: '0.75rem', lineHeight: '1.33', weight: 500, tracking: '0.05em' },
} as const;

export const brandSpacing = {
  unit: '0.25rem',
  values: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
  },
} as const;

export const brandRadius = {
  default: '0.625rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
} as const;

export const brandContainer = {
  maxWidth: '80rem',
  pagePadding: { mobile: '1.5rem', desktop: '2.5rem' },
} as const;

/** Color palette entries for the interactive swatch grid — derived from brandColors/brandHSL above to avoid restating hex values. */
export const colorPaletteEntries = [
  { name: 'Dark Baseline', hex: brandColors.darkBaseline, hsl: brandHSL.darkBaseline, token: '--brand-dark-baseline', role: 'Dark mode background, thematic undertone' },
  { name: 'Dark Contrast', hex: brandColors.darkContrast, hsl: brandHSL.darkContrast, token: '--brand-dark-contrast', role: 'Dark mode foreground, visual contrast' },
  { name: 'Light Baseline', hex: brandColors.lightBaseline, hsl: brandHSL.lightBaseline, token: '--brand-light-baseline', role: 'Light mode background, thematic undertone' },
  { name: 'Light Contrast', hex: brandColors.lightContrast, hsl: brandHSL.lightContrast, token: '--brand-light-contrast', role: 'Light mode foreground, visual contrast' },
  { name: 'Slate Blue', hex: brandColors.slate, hsl: brandHSL.slate, token: '--brand-slate', role: 'Controlled contrast, borders' },
  { name: 'Gray Blue', hex: brandColors.grayBlue, hsl: brandHSL.grayBlue, token: '--brand-gray-blue', role: 'Medium contrast, muted text' },
  { name: 'Pale Blue', hex: brandColors.paleBlue, hsl: brandHSL.paleBlue, token: '--brand-pale-blue', role: 'Medium brightness, dividers' },
  { name: 'Bright Blue', hex: brandColors.brightBlue, hsl: brandHSL.brightBlue, token: '--brand-bright-blue', role: 'Controlled brightness, hover states' },
] as const;

/** Type scale entries for the specimen display */
export const typeScaleEntries = [
  { level: 'Display', ...brandTypeScale.display, sample: 'Break it till you make it' },
  { level: 'Heading 1', ...brandTypeScale.h1, sample: 'Break it till you make it' },
  { level: 'Heading 2', ...brandTypeScale.h2, sample: 'Break it till you make it' },
  { level: 'Heading 3', ...brandTypeScale.h3, sample: 'Break it till you make it' },
  { level: 'Body', ...brandTypeScale.body, sample: 'Break it till you make it' },
  { level: 'Caption', ...brandTypeScale.caption, sample: 'ad factores mundi' },
] as const;
