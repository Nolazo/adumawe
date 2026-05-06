/**
 * Courses Slider Module
 * Handles scroll-based navigation and dot indicators
 */

export default function initCoursesSlider() {
    const slider = document.getElementById('courses-slider');
    if (!slider) return;

    // Make functions available globally for onclick attributes
    window.scrollCourses = function(direction) {
        const scrollAmount = slider.offsetWidth * 0.75;
        slider.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
        updateDots();
    };

    // Update dots based on scroll position
    function updateDots() {
        const scrollPos = slider.scrollLeft;
        const slideWidth = slider.offsetWidth * 0.75;
        const activeIndex = Math.round(scrollPos / slideWidth);

        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Initialize dots on load
    updateDots();

    // Update dots on scroll
    slider.addEventListener('scroll', updateDots);

    // Click handlers for dots
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            const slideWidth = slider.offsetWidth * 0.75;
            slider.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
            updateDots();
        });
    });

    console.log('Courses Slider initialized');
}
