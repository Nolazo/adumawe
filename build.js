/**
 * ADUMAWE - Build Script
 * Compila los partials en un HTML único para deploy
 * Concatena módulos JS
 * 
 * Uso: 
 *   node build.js          # Build normal
 *   node build.js --min    # Build con minificación
 *   node build.js --watch  # Watch mode (desarrollo)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;

// ============================================
// UTILIDADES
// ============================================

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf-8');
}

function log(msg, type = 'info') {
    const icons = { info: 'ℹ', warn: '⚠', error: '❌', success: '✅' };
    console.log(`${icons[type] || ''} ${msg}`);
}

// Generador de hash MD5
function generateHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

// ============================================
// PARTIALS COMPILER
// ============================================

function findPartials(html) {
    const regex = /<div data-include="([^"]+)"[^>]*><\/div>/g;
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        matches.push(match);
    }
    return matches;
}

function compilePartials(html) {
    const partials = findPartials(html);
    for (let i = partials.length - 1; i >= 0; i--) {
        const [fullMatch, partialPath] = partials[i];
        const filePath = path.join(ROOT, partialPath);
        try {
            const partialContent = readFile(filePath);
            html = html.replace(fullMatch, partialContent);
        } catch (e) {
            log(`No se encontró: ${partialPath}`, 'warn');
        }
    }
    return html;
}

// ============================================
// JS MODULES BUNDLER
// ============================================

function findJsModules() {
    const modulesDir = path.join(ROOT, 'js', 'modules');
    if (!fs.existsSync(modulesDir)) return [];
    
    return fs.readdirSync(modulesDir)
        .filter(f => f.endsWith('.js'))
        .sort()  // Orden consistente
        .map(f => path.join(modulesDir, f));
}

function bundleJs() {
    const modules = findJsModules();
    if (modules.length === 0) {
        log('No se encontraron módulos JS', 'warn');
        return null;
    }
    
    // Concatenar todos los módulos en orden
    let bundle = `/**
 * ADUMAWE Landing Page - Bundled JavaScript
 * Generated at ${new Date().toISOString()}
 */

(function() {
    'use strict';

`;
    
    modules.forEach(modulePath => {
        const code = readFile(modulePath);
        bundle += '\n/* ============================================ */\n';
        bundle += `/* ${path.basename(modulePath)} */\n`;
        bundle += '/* ============================================ */\n\n';
        
        // Quitar export default y usar IIFE para aislamiento
        const cleanCode = code
            .replace(/export\s+function\s+(\w+)/g, 'function $1')
            .replace(/export\s+default\s+\w+;/g, '')
            .replace(/^export\s+default\s+\w+;$/gm, '');
        
        bundle += cleanCode + '\n';
    });
    
    // Agregar init que llama a todos los módulos
    bundle += `
/* ============================================ */
/* INIT */
/* ============================================ */

function initAdumawe() {
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    if (typeof initHeaderScroll === 'function') initHeaderScroll();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initFormHandler === 'function') initFormHandler();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initLazyLoad === 'function') initLazyLoad();
    if (typeof initHeroCarousel === 'function') initHeroCarousel();
    if (typeof initBackToTop === 'function') initBackToTop();
    
    console.log('Adumawe Landing Page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdumawe);
} else {
    initAdumawe();
}
})();`;
    
    return bundle;
}

// ============================================
// MINIFICADOR (BÁSICO)
// ============================================

function minifyJs(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{};:,])\s*/g, '$1')
        .trim();
}

function minifyCss(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/\n\s*/g, '\n')
        .trim();
}

// ============================================
// BUILD
// ============================================

function build(options = {}) {
    const { minify = false } = options;
    
    console.log('\n' + '='.repeat(40));
    console.log('🔨 ADUMAWE Build Script');
    console.log('='.repeat(40) + '\n');
    
    // 1. HTML
    log('Compilando HTML...');
    let html = readFile(path.join(ROOT, 'index.html'));
    html = compilePartials(html);
    
    // 2. JS Bundle
    log('Bundleando JS...');
    const jsBundle = bundleJs();
    let jsFilename = 'main.js';
    
    if (jsBundle) {
        const jsContent = minify ? minifyJs(jsBundle) : jsBundle;
        const jsHash = generateHash(jsContent);
        jsFilename = `main.${jsHash}.js`;
        writeFile(path.join(ROOT, 'dist', 'js', jsFilename), jsContent);
        log(`Generado: dist/js/${jsFilename}`, 'success');
    }
    
    // 3. CSS
    log('Copiando CSS...');
    const cssReferences = [];
    
    ['styles.css', 'components.css'].forEach(file => {
        const src = path.join(ROOT, 'css', file);
        if (fs.existsSync(src)) {
            let content = readFile(src);
            if (minify) content = minifyCss(content);
            
            const hash = generateHash(content);
            const hashedFilename = `${file.replace('.css', '')}.${hash}.css`;
            
            writeFile(path.join(ROOT, 'dist', 'css', hashedFilename), content);
            log(`Generado: dist/css/${hashedFilename}`, 'success');
            
            cssReferences.push({ original: file, hashed: hashedFilename });
        }
    });
    
    // 4. Actualizar HTML con referencias con hash
    log('Actualizando HTML con cache-busting...');
    cssReferences.forEach(({ original, hashed }) => {
        html = html.replace(
            new RegExp(`href="css/${original}"`),
            `href="css/${hashed}"`
        );
    });
    html = html.replace(
        /<script src="js\/main\.js"><\/script>/,
        `<script src="js/${jsFilename}"></script>`
    );
    
    writeFile(path.join(ROOT, 'dist', 'index.html'), html);
    log('Generado: dist/index.html', 'success');
    
    console.log('\n' + '='.repeat(40));
    log('🎉 Build completado!' + (minify ? ' (minificado)' : ''), 'success');
    console.log('='.repeat(40) + '\n');
}

// ============================================
// MAIN
// ============================================

const args = process.argv.slice(2);

if (args.includes('--watch')) {
    // Watch mode - requiere chokidar
    const watchMode = async () => {
        let chokidar;
        try {
            chokidar = require('chokidar');
        } catch (e) {
            console.log('\n❌ chokidar no está instalado.');
            console.log('   Ejecuta: npm install chokidar');
            console.log('   O usa: npx chokidar ...\n');
            process.exit(1);
        }
        
        console.log('\n' + '='.repeat(40));
        console.log('👀 ADUMAWE - Watch Mode');
        console.log('='.repeat(40));
        console.log('Esperando cambios...\n');
        
        // Build inicial
        build({ minify: false });
        
        const watcher = chokidar.watch([
            'partials/*.html',
            'css/*.css',
            'js/modules/*.js',
            'index.html',
            '!dist/**'
        ], {
            cwd: ROOT,
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 100
            }
        });
        
        let debounceTimer;
        const debounce = (callback) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(callback, 300);
        };
        
        watcher.on('all', (event, filePath) => {
            debounce(() => {
                console.log(`\n📝 ${event}: ${filePath}`);
                try {
                    build({ minify: false });
                } catch (e) {
                    log(`Error: ${e.message}`, 'error');
                }
            });
        });
        
        // Ctrl+C para salir
        process.on('SIGINT', () => {
            console.log('\n\n👋 Watch mode terminado.');
            watcher.close();
            process.exit(0);
        });
    };
    
    watchMode();
} else {
    build({ minify: args.includes('--min') });
}