import { defineConfig } from 'vite';
import { vitePluginInclude } from './vite-plugin-include.js';

// For local dev: serve from project root with '/' base
// For build: use dist/ as root with /adumawe/ base
const isDev = process.env.NODE_ENV !== 'production' && !process.env.GITHUB_ACTIONS;

export default defineConfig({
  // Use project root for dev, dist/ for build
  root: isDev ? '.' : 'dist',
  base: isDev ? './' : '/adumawe/', // Relative for dev, /adumawe/ for production
  server: {
    port: 3000,
    open: true, // Auto-open browser
    // Serve static files from dist/ as well (for CSS/JS local dev)
    publicDir: 'dist'
  },
  plugins: [
    // Only activate data-include processing in development mode
    isDev ? vitePluginInclude() : null
  ].filter(Boolean),
  build: {
    outDir: 'dist', // Output to dist folder for production
    rollupOptions: {
      input: 'index.html' // Entry point is dist/index.html (already processed)
    }
  },
});
