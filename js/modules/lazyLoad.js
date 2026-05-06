/**
 * LazyLoad Module
 * Uses native lazy loading with IntersectionObserver fallback
 */

export function initLazyLoad() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
        // Add loading="lazy" to all images that don't have it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for older browsers
        const images = document.querySelectorAll('img[data-src]');
        if (!images.length) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    console.log('LazyLoad initialized');
}

export default initLazyLoad;