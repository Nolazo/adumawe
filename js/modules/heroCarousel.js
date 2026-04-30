/**
 * HeroCarousel Module
 * Carrusel automático de imágenes en el Hero
 */

export function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    const nextSlide = () => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    };
    
    // Cambiar cada 5 segundos
    setInterval(nextSlide, 5000);
}

export default initHeroCarousel;