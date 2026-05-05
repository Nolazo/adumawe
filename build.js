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
    
    // Copy CSS and JS to dist
    const cssDir = path.join(ROOT_DIR, 'css');
    const jsDir = path.join(ROOT_DIR, 'js');
    const assetsDir = path.join(ROOT_DIR, 'assets');
    
    const distCssDir = path.join(OUTPUT_DIR, 'css');
    const distJsDir = path.join(OUTPUT_DIR, 'js');
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
    
    // Update paths in HTML for dist structure (they should be relative, so should work)
    // Write final HTML
    const outputFile = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(outputFile, html, 'utf-8');
    
    console.log(`\n✅ Build complete! Output: ${outputFile}`);
    console.log(`   Open ${outputFile} in your browser to view the site.`);
}

build();
