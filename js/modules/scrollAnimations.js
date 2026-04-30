/**
 * ScrollAnimations Module
 * Animaciones al hacer scroll (Intersection Observer)
 */

export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll(
        '.stat-item, .mv-card, .team-card, .course-card, .quality-item'
    );
    
    elements.forEach(el => observer.observe(el));
}

export default initScrollAnimations;