document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const form = document.getElementById('applyForm');
    const formSuccess = document.getElementById('formSuccess');

    /* ─── Navbar scroll ─── */
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 60);
        lastScroll = scrollY;
    }, { passive: true });

    /* ─── Mobile menu ─── */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ─── Smooth scroll for anchor links ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ─── Intersection Observer for animations ─── */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const siblings = el.parentElement.querySelectorAll('[data-animate]');
                let delay = 0;
                siblings.forEach((sib, i) => {
                    if (sib === el) delay = i * 100;
                });
                setTimeout(() => el.classList.add('visible'), delay);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    /* ─── Counter animation ─── */
    const counterEl = document.querySelector('[data-target]');
    if (counterEl) {
        const target = parseInt(counterEl.dataset.target);
        let counted = false;

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                let current = 0;
                const step = () => {
                    current++;
                    counterEl.textContent = current;
                    if (current < target) requestAnimationFrame(step);
                };
                step();
            }
        }, { threshold: 0.5 });

        counterObserver.observe(counterEl);
    }

    /* ─── Form validation & submission ─── */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fields = [
            { el: form.querySelector('#name'), valid: form.querySelector('#name').value.trim() },
            { el: form.querySelector('#telegram'), valid: form.querySelector('#telegram').value.trim() },
            { el: form.querySelector('#portfolio'), valid: form.querySelector('#portfolio').value.trim() },
            { el: form.querySelector('#experience'), valid: form.querySelector('#experience').value },
            { el: form.querySelector('#testReady'), valid: form.querySelector('#testReady').checked }
        ];

        let isValid = true;

        fields.forEach(({ el, valid }) => {
            if (el.type === 'checkbox') return;
            el.classList.toggle('error', !valid);
            if (!valid) isValid = false;
        });

        if (!fields[4].valid) {
            const checkmark = form.querySelector('.checkmark');
            checkmark.style.borderColor = '#f43f5e';
            setTimeout(() => checkmark.style.borderColor = '', 2000);
            isValid = false;
        }

        if (!isValid) {
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            formSuccess.classList.add('active');
            btn.textContent = 'Отправить заявку';
            btn.disabled = false;
        }, 1200);
    });

    /* ─── Remove error state on input ─── */
    form.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('input', () => el.classList.remove('error'));
    });
});
