/**
 * FormHandler Module
 * Manejo del formulario de contacto
 */

export function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email) {
            alert('Por favor completa los campos requeridos.');
            return;
        }
        
        console.log('Form data:', data);
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        form.reset();
    });
}

export default initFormHandler;