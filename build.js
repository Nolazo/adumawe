const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');

/**
 * Process data-include attributes in HTML content
 * @param {string} htmlContent - The HTML content to process
 * @param {string} baseDir - The base directory for resolving partial paths
 * @returns {string} - HTML with includes processed
 */
function processIncludes(htmlContent, baseDir) {
    const includeRegex = /<div data-include="([^"]+)"><\/div>/g;
    
    return htmlContent.replace(includeRegex, (match, partialPath) => {
        const fullPath = path.join(baseDir, partialPath);
        
        if (!fs.existsSync(fullPath)) {
            console.warn(`⚠️  Partial not found: ${partialPath}`);
            return match;
        }
        
        console.log(`✓ Including: ${partialPath}`);
        const partialContent = fs.readFileSync(fullPath, 'utf-8');
        return partialContent;
    });
}

// Export for Vite plugin (development mode)
module.exports = { processIncludes };

/**
 * Main build function
 */
function build() {
    console.log('🏗️  Building Adumawe Landing Page...\n');
    
    // Read index.html
    if (!fs.existsSync(INDEX_FILE)) {
        console.error('❌ index.html not found!');
        process.exit(1);
    }
    
    let html = fs.readFileSync(INDEX_FILE, 'utf-8');
    
    // Process includes
    html = processIncludes(html, ROOT_DIR);
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Write the processed HTML to dist (this is what Vite will use as entry point)
    const outputFile = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(outputFile, html, 'utf-8');
    console.log(`✓ Processed includes: ${outputFile}`);
    
    // Copy CSS to dist (Vite will handle JS bundling)
    const cssDir = path.join(ROOT_DIR, 'css');
    const distCssDir = path.join(OUTPUT_DIR, 'css');
    
    // Copy JS modules to dist (Vite will bundle them)
    const jsDir = path.join(ROOT_DIR, 'js');
    const distJsDir = path.join(OUTPUT_DIR, 'js');
    
    // Copy assets to dist
    const assetsDir = path.join(ROOT_DIR, 'assets');
    const distAssetsDir = path.join(OUTPUT_DIR, 'assets');
    
    // Copy directories
    function copyDir(src, dest) {
        if (!fs.existsSync(src)) return;
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
    
    copyDir(cssDir, distCssDir);
    copyDir(jsDir, distJsDir);
    copyDir(assetsDir, distAssetsDir);
    
    console.log(`\n✅ Build preparation complete! Now run: vite build`);
    console.log(`   The dist/ folder is ready for Vite to bundle.`);
}

build();
