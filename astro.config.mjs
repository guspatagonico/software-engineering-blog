import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  base: '/software-engineering',
  integrations: [react(), mdx()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['galadriel'],
  },
    devToolbar: {
    enabled: false
  }
});
