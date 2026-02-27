document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const message = [
            'Заявка на вступление в команду дизайнеров',
            '',
            `Имя: ${data.name}`,
            `Telegram: ${data.telegram}`,
            `Портфолио: ${data.portfolio}`,
            `Опыт: ${data.experience}`,
            `Готовность к тестовому: ${data.test_task ? 'Да' : 'Нет'}`
        ].join('\n');

        const encodedMessage = encodeURIComponent(message);
        const phone = '79186360011';
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    });
});
