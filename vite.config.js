import { defineConfig } from 'vite';
import 'dotenv/config'; // Load .env file

export default defineConfig({
  root: 'dist', // Serve files from dist folder
  server: {
    port: 3000,
    open: true, // Auto-open browser
    envPrefix: 'VITE_', // Only expose vars with VITE_ prefix
  },
  build: {
    outDir: 'dist', // Keep build output in dist
  },
  // Expose env vars to client-side code
  define: {
    'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.VITE_EMAILJS_PUBLIC_KEY),
    'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID),
    'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID),
  }
});
