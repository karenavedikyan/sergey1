// Configuration
const CONTACT_PHONE = '79186360011';

// Smooth scroll to form
function scrollToForm() {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation styles
    const elements = document.querySelectorAll('.requirements-block, .about-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial check
    window.dispatchEvent(new Event('scroll'));
    
    // Form handling
    const form = document.getElementById('applicationForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            telegram: document.getElementById('telegram').value.trim(),
            portfolio: document.getElementById('portfolio').value.trim(),
            experience: document.getElementById('experience').value.trim(),
            testTask: document.getElementById('testTask').checked
        };
        
        // Validate form
        if (!formData.name || !formData.telegram || !formData.portfolio || !formData.experience || !formData.testTask) {
            showMessage('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message and redirect to WhatsApp
        console.log('Form submitted:', formData);
        
        // Create WhatsApp message
        const message = `Заявка на участие в команде дизайнеров:\n\nИмя: ${formData.name}\nTelegram: ${formData.telegram}\nПортфолио: ${formData.portfolio}\nОпыт работы: ${formData.experience}\nГотов выполнить тестовое задание: Да`;
        
        const whatsappUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
        
        // Show success message
        showMessage('Спасибо! Сейчас вы будете перенаправлены в WhatsApp для отправки заявки.', 'success');
        
        // Reset form
        form.reset();
        
        // Redirect to WhatsApp after 2 seconds
        setTimeout(function() {
            window.open(whatsappUrl, '_blank');
        }, 2000);
    });
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
    
    // Add scroll animation effects
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.requirements-block, .about-content');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
});
