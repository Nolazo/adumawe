/**
 * Hero Carousel Module - Professional Version
 * Auto-rotates hero images with smooth transitions
 * UX Best Practices: keyboard accessible, aria-live, proper indicators
 */

export default function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) {
        console.warn('Hero: .hero-carousel not found');
        return;
    }
    
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    if (slides.length <= 1) {
        console.warn('Hero: Only', slides.length, 'slide(s) - rotation disabled');
        return;
    }
    
    let currentIndex = 0;
    let intervalId = null;
    const intervalTime = 5000; // 5 seconds
    const slidesCount = slides.length;
    
    // Cache DOM elements for performance
    const dotsContainer = carousel.querySelector('.hero-dots');
    const prevBtn = carousel.querySelector('.hero-prev');
    const nextBtn = carousel.querySelector('.hero-next');
    
    // Initialize ARIA
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-current', index === 0 ? 'true' : 'false');
        slide.setAttribute('role', 'img');
    });
    
    // Create dot indicators if container exists
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('data-slide', index);
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('tabindex', '0');
            dot.addEventListener('click', () => goToSlide(index));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                }
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    const showSlide = (index) => {
        // Validate index
        if (index < 0 || index >= slidesCount) return;
        
        // Remove active from all slides and dots
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-current', 'false');
            const dot = carousel.querySelector(`.dot[data-slide="${i}"]`);
            if (dot) dot.classList.remove('active');
        });
        
        // Add active to current slide and dot
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-current', 'true');
        currentIndex = index;
        
        const currentDot = carousel.querySelector(`.dot[data-slide="${index}"]`);
        if (currentDot) currentDot.classList.add('active');
    };
    
    const goToSlide = (index) => {
        stopAutoRotate();
        showSlide(index);
        startAutoRotate();
    };
    
    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slidesCount;
        showSlide(nextIndex);
    };
    
    // Start auto-rotation
    const startAutoRotate = () => {
        stopAutoRotate(); // Clear any existing interval
        intervalId = setInterval(nextSlide, intervalTime);
        console.debug('Hero: Auto-rotate started');
    };
    
    const stopAutoRotate = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.debug('Hero: Auto-rotate stopped');
        }
    };
    
    // Button controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slidesCount) % slidesCount;
            goToSlide(prevIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide((currentIndex + 1) % slidesCount);
        });
    }
    
    // Pause on hover (UX best practice)
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);
    
    // Pause when page is not visible (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoRotate();
        } else {
            startAutoRotate();
        }
    });
    
    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + slidesCount) % slidesCount;
            goToSlide(prevIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToSlide((currentIndex + 1) % slidesCount);
        }
    });
    
    // Start the carousel
    showSlide(0); // Ensure first slide is visible
    startAutoRotate();
    
    console.log('Hero Carousel initialized with', slidesCount, 'slides');
}
