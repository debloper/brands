import type { BrandMeta } from '@/lib/types';

// 1. Copy this whole `_template/` directory to `context/<your-slug>/` — the
//    directory name becomes the URL slug (e.g. `context/acme/` -> `/acme/`, served under
//    whatever `base` the site is deployed at, see root design.md §8).
// 2. Fill in the metadata below. The matching implementation lives separately at
//    `src/pages/<your-slug>.astro` + `src/components/<your-slug>/` — see
//    src/components/_template/README.md for that scaffold.
export default {
  name: 'Your Brand Name',
  tagline: 'One line describing the brand, shown on the landing page card.',
  colors: {
    background: '#111111',
    foreground: '#FFFFFF',
    accent: '#888888',
  },
} satisfies BrandMeta;
