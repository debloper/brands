/**
 * Contract every `context/<slug>/brand.config.ts` must satisfy.
 * The directory name itself is the canonical slug/route — there is no
 * separate slug field to keep in sync.
 */
export interface BrandMeta {
  /** Display name. */
  name: string;
  /** One-line description shown on the landing page card. */
  tagline: string;
  /** A few swatch colors used to theme the landing page card without importing the full brand stylesheet. */
  colors: {
    background: string;
    foreground: string;
    accent: string;
  };
}
