/**
 * Vite Plugin: Process data-include attributes in HTML during development
 * Reuses the same logic as build.js for consistency
 */
import fs from 'fs';
import path from 'path';
import { processIncludes } from './build.js';

export function vitePluginInclude(options = {}) {
  return {
    name: 'vite-plugin-include',
    
    // Hook into the development server setup
    configureServer(server) {
      // Intercept HTML requests
      server.middlewares.use((req, res, next) => {
        // Only process HTML requests
        const url = req.url || '';
        const isHtmlRequest = url.endsWith('.html') || url === '/' || url === '/index.html';
        
        if (isHtmlRequest) {
          // Determine which HTML file to read
          let htmlPath;
          if (url === '/' || url === '/index.html') {
            htmlPath = path.resolve(server.config.root, 'index.html');
          } else {
            htmlPath = path.resolve(server.config.root, url.slice(1));
          }
          
          // Check if file exists
          if (fs.existsSync(htmlPath)) {
            try {
              let html = fs.readFileSync(htmlPath, 'utf-8');
              
              // Process data-include attributes (reuse build.js logic)
              const baseDir = path.dirname(htmlPath);
              html = processIncludes(html, baseDir);
              
              // Send the processed HTML
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
              return;
            } catch (err) {
              console.error('[vite-plugin-include] Error:', err);
              res.statusCode = 500;
              res.end('Internal Server Error');
              return;
            }
          }
        }
        
        // Not an HTML request or file not found, continue
        next();
      });
    }
  };
}
