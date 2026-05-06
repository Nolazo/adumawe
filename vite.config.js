import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist', // Serve files from dist folder (after build.js processes includes)
  base: '/adumawe/', // ✅ Correct! Base path for GitHub Pages subdirectory
  server: {
    port: 3000,
    open: true, // Auto-open browser
  },
  build: {
    outDir: '.', // Output to same dist folder (not dist/dist)
    rollupOptions: {
      input: 'index.html' // Entry point is the already-processed dist/index.html
    }
  },
});
