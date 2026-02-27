// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                telegram: document.getElementById('telegram').value,
                portfolio: document.getElementById('portfolio').value,
                experience: document.getElementById('experience').value,
                testTask: document.getElementById('testTask').checked
            };
            
            // Validate form
            if (!formData.testTask) {
                alert('Пожалуйста, подтвердите готовность выполнить тестовое задание');
                return;
            }
            
            // Create message for sending
            const message = `
Новая заявка от дизайнера:

Имя: ${formData.name}
Telegram: ${formData.telegram}

Портфолио:
${formData.portfolio}

Опыт работы:
${formData.experience}

Готов выполнить тестовое задание: Да
            `.trim();
            
            // Create WhatsApp link with pre-filled message
            const phoneNumber = '79186360011';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Show confirmation and open WhatsApp
            if (confirm('Ваша заявка будет отправлена через WhatsApp. Продолжить?')) {
                window.open(whatsappUrl, '_blank');
                
                // Show success message
                showSuccessMessage();
                
                // Reset form after a delay
                setTimeout(() => {
                    form.reset();
                }, 2000);
            }
        });
    }
    
    // Smooth scroll for anchor links
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Success message function
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #10b981;
        color: white;
        padding: 2rem 3rem;
        border-radius: 12px;
        font-size: 1.25rem;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = '✓ Спасибо! Ваша заявка отправлена';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 2000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);
