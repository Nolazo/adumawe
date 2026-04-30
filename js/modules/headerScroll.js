/**
 * HeaderScroll Module
 * Efecto visual en header al hacer scroll
 */

export function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

export default initHeaderScroll;