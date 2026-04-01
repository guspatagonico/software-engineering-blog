import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  base: '/software-engineering',
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['galadriel'],
  },
});
