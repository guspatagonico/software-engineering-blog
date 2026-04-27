import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { rehypeD2 } from './src/lib/rehypeD2.mjs';

export default defineConfig({
  site: 'https://dev.ecim.tech',
  base: '/software-engineering',
  integrations: [react(), mdx({
    rehypePlugins: [rehypeD2],
  })],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['galadriel', 'metaponto'],
  },
	vite: {
		build: {
			chunkSizeWarningLimit: 8500,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules/three')) {
							return 'three';
						}
						if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
							return 'react-vendor';
						}
						if (id.includes('node_modules/@terrastruct/d2')) {
							return 'd2-wasm';
						}
					},
				},
			},
		},
	},
});
