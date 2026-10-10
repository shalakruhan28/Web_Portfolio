const root = document.documentElement;
const body = document.body;
const toggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';

const prefersDark = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
const storedTheme = localStorage.getItem(THEME_KEY);

const setTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    body.dataset.theme = theme;

    if (toggle) {
        const sun = toggle.querySelector('.sun');
        const moon = toggle.querySelector('.moon');
        if (sun && moon) {
            sun.classList.toggle('hidden', isDark);
            moon.classList.toggle('hidden', !isDark);
            sun.style.display = isDark ? 'none' : 'inline-flex';
            moon.style.display = isDark ? 'inline-flex' : 'none';
            sun.setAttribute('aria-hidden', String(isDark));
            moon.setAttribute('aria-hidden', String(!isDark));
        }
        toggle.dataset.theme = theme;
        toggle.setAttribute('aria-pressed', String(isDark));
    }
};

const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
setTheme(initialTheme);

if (toggle) {
    toggle.addEventListener('click', () => {
        const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
    });
}

const targets = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    targets.forEach((el) => observer.observe(el));
} else {
    targets.forEach((el) => el.classList.add('is-visible'));
}

const counterCards = document.querySelectorAll('.stat-card[data-counter]');
counterCards.forEach((card, index) => {
    const target = parseInt(card.dataset.counter, 10);
    if (Number.isNaN(target)) {
        return;
    }
    const suffix = card.dataset.suffix || '';
    const output = card.querySelector('h3');
    if (!output) {
        return;
    }
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const startDelay = 200 * index;
    const animate = () => {
        current = Math.min(target, current + step);
        output.textContent = `${current}${suffix}`;
        if (current < target) {
            requestAnimationFrame(animate);
        }
    };
    setTimeout(() => requestAnimationFrame(animate), startDelay);
});

const resumeModal = document.getElementById('resumeModal');
const resumeForm = document.getElementById('resumeForm');
const closeResumeModal = document.getElementById('closeResumeModal');
const resumeFormError = document.getElementById('resumeFormError');
const resumeUrl = 'https://drive.google.com/file/d/1Ju6mpId0g5zu3QalIbel9VJa_q7DGzmg/view';
const resumeWebAppUrl = 'https://script.google.com/macros/s/AKfycbz6c4V9Z6u3aBhtMoyoXlZOhAf09PsxcMxnOuKspWDT9KYLsPNEjX0mj_qDeHOMOkOq/exec';

const closeResumeDialog = () => {
    if (resumeModal) {
        resumeModal.classList.add('hidden');
        resumeModal.classList.remove('flex');
    }
};

document.querySelectorAll('.resume-download').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        if (resumeModal) {
            resumeModal.classList.remove('hidden');
            resumeModal.classList.add('flex');
            document.getElementById('resumeName')?.focus();
        }
    });
});

closeResumeModal?.addEventListener('click', closeResumeDialog);
resumeModal?.addEventListener('click', (event) => {
    if (event.target === resumeModal) {
        closeResumeDialog();
    }
});

resumeForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = resumeForm.querySelector('button[type="submit"]');
    const formData = new FormData(resumeForm);
    resumeFormError?.classList.add('hidden');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Saving...';
    }

    try {
        await fetch(resumeWebAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        });
        window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        resumeForm.reset();
        closeResumeDialog();
    } catch (error) {
        if (resumeFormError) {
            resumeFormError.textContent = 'We could not record your details. Please try again.';
            resumeFormError.classList.remove('hidden');
        }
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Continue to resume';
        }
    }
});
