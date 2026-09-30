/**
 * Brand tokens as typed constants — mirror whatever your design source
 * (Figma, a written spec, etc.) actually defines. This shape is a suggestion,
 * not a hard contract: only `brand.config.ts` has a required shape.
 */
export const brandColors = {
  background: '#111111',
  foreground: '#FFFFFF',
  accent: '#888888',
} as const;

export const brandTypeScale = {
  display: { size: '3.75rem', lineHeight: '1', weight: 300, tracking: '-0.025em' },
  h1: { size: '3rem', lineHeight: '1', weight: 500, tracking: '-0.025em' },
  body: { size: '1rem', lineHeight: '1.5', weight: 400, tracking: 'normal' },
} as const;

export const brandSpacing = {
  unit: '0.25rem',
} as const;
