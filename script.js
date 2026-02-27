/**
 * Application Form Handler
 * Sends form data to WhatsApp for processing (no backend required)
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name') || '';
            const telegram = formData.get('telegram') || '';
            const portfolio = formData.get('portfolio') || '';
            const experience = formData.get('experience') || '';
            const testTask = form.querySelector('[name="test_task"]').checked ? 'Да' : 'Нет';
            
            const message = encodeURIComponent(
                `🔹 Новая заявка на вступление в команду\n\n` +
                `Имя: ${name}\n` +
                `Telegram: ${telegram}\n` +
                `Портфолио: ${portfolio}\n` +
                `Опыт: ${experience}\n` +
                `Готов выполнить тестовое: ${testTask}`
            );
            
            const whatsappUrl = `https://wa.me/79186360011?text=${message}`;
            window.open(whatsappUrl, '_blank');
            
            form.reset();
        });
    }
});
