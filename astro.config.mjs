// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves project repos at <user>.github.io/<repo>/ — `base` must match that
// fixed path so internal links (via `import.meta.env.BASE_URL`) resolve correctly. The dev
// server mirrors this same prefix on purpose, so local URLs match production exactly.
export default defineConfig({
  site: 'https://code.debs.io',
  base: '/brands/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
