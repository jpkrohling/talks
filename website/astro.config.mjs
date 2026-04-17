import { defineConfig } from 'astro/config';

// Adjust `site` if a custom domain is used (e.g. 'https://kroehling.de')
// If using custom domain, remove the `base` key.
export default defineConfig({
  site: 'https://jpkrohling.github.io',
  base: '/talks',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    server: { watch: { ignored: ['**/.superpowers/**'] } },
  },
});
