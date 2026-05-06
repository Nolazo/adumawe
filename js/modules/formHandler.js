/**
 * FormHandler Module - EmailJS Version
 * Sends form data directly to your email via EmailJS
 */

import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.warn('FormHandler: contactForm not found');
        return;
    }
    
    // Initialize EmailJS
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('FormHandler: EmailJS initialized');
    } catch (e) {
        console.error('FormHandler: EmailJS init failed', e);
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email) {
            alert('Por favor completa los campos requeridos.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Send via EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                console.log('FormHandler: Email sent successfully', data);
                alert('¡Gracias por contactarnos! Hemos recibido tu solicitud.');
                form.reset();
            })
            .catch((error) => {
                console.error('FormHandler: EmailJS error', error);
                alert('Hubo un error al enviar. Por favor intenta nuevamente.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

export default initFormHandler;
