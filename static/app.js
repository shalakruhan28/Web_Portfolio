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
