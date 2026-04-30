/**
 * LazyLoad Module
 * Carga diferida de imágenes
 */

export function initLazyLoad() {
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

export default initLazyLoad;