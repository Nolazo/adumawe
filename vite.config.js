import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist', // Serve files from dist folder
  server: {
    port: 3000,
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist', // Keep build output in dist
  },
});
