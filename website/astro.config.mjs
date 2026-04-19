import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Served from the root of https://kroehling.de (deployed via Netlify).
export default defineConfig({
  site: 'https://kroehling.de',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  vite: {
    server: { watch: { ignored: ['**/.superpowers/**'] } },
  },
});
