import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Served from the root of https://kroehling.de (custom domain configured
// via public/CNAME). To deploy to jpkrohling.github.io/talks/ instead,
// set site back to 'https://jpkrohling.github.io' and add `base: '/talks'`.
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
