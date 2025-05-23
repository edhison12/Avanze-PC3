document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        
        if (!name || !email || !message) {
            formMessage.textContent = 'Por favor, rellena todos los campos obligatorios.';
            formMessage.className = 'form-message error';
            return;
        }

        
        formMessage.textContent = 'Enviando mensaje...';
        formMessage.className = 'form-message'; 

        setTimeout(() => {
            
            formMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
            formMessage.className = 'form-message success';
            contactForm.reset(); 
        }, 1500);
    });
});