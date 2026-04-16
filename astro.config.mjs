import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://dev.ecim.tech',
  base: '/software-engineering',
  integrations: [react(), mdx()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['galadriel'],
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) {
              return 'three';
            }
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/mermaid')) {
              return 'mermaid';
            }
          },
        },
      },
    },
  },
});
