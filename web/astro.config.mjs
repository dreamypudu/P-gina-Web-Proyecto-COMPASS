// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static, SEO-friendly, near-zero JS.
// ES served at `/`, EN served at `/en/`.
export default defineConfig({
  site: 'https://compass.giia.udec.cl',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
