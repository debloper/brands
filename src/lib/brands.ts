import type { BrandMeta } from './types';

export interface Brand {
  slug: string;
  meta: BrandMeta;
}

// A brand is "live" when it has both authored context (`context/<slug>/brand.config.ts`)
// and a built implementation (`src/pages/<slug>.astro`). Neither location needs
// editing when the other is added — this file is the only place that joins them.
const metaModules = import.meta.glob<{ default: BrandMeta }>(
  '/context/*/brand.config.ts',
  { eager: true },
);

// Lazy: we only need to know which slugs have a page, not import the pages themselves
// (Astro already routes `src/pages/**` on its own). `index.astro` (the landing page) is
// excluded at the glob level to avoid Vite warning about it being both statically and
// dynamically imported.
const pageModules = import.meta.glob(['/src/pages/*.astro', '!/src/pages/index.astro']);

function contextSlugFromPath(path: string): string {
  const match = path.match(/^\/context\/([^/]+)\//);
  if (!match) throw new Error(`Could not derive brand slug from path: ${path}`);
  return match[1];
}

// `/src/pages/breakerspace.astro` -> `breakerspace`
const implementedSlugs = new Set(
  Object.keys(pageModules).map((path) => path.match(/^\/src\/pages\/([^/]+)\.astro$/)![1]),
);

const brands: Brand[] = Object.entries(metaModules)
  .map(([path, mod]) => ({ slug: contextSlugFromPath(path), meta: mod.default }))
  // `_template` (and any other `_`-prefixed scratch dir) is a scaffold, not a real brand
  .filter((b) => !b.slug.startsWith('_'))
  // Context without a matching implementation isn't ready to be listed/linked yet
  .filter((b) => implementedSlugs.has(b.slug))
  .sort((a, b) => a.meta.name.localeCompare(b.meta.name));

export function getBrands(): Brand[] {
  return brands;
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
