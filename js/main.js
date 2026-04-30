/**
 * ADUMAWE Landing Page - Main Entry Point
 * Inicializa todos los módulos
 */

import initSmoothScroll from './modules/smoothScroll.js';
import initHeaderScroll from './modules/headerScroll.js';
import initMobileMenu from './modules/mobileMenu.js';
import initFormHandler from './modules/formHandler.js';
import initScrollAnimations from './modules/scrollAnimations.js';
import initLazyLoad from './modules/lazyLoad.js';
import initHeroCarousel from './modules/heroCarousel.js';
import initBackToTop from './modules/backToTop.js';

/**
 * Initialize All Modules
 */
function init() {
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initFormHandler();
    initScrollAnimations();
    initLazyLoad();
    initHeroCarousel();
    initBackToTop();
    
    console.log('Adumawe Landing Page initialized');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}