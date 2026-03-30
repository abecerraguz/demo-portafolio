// ── Smooth scroll para todos los links de navegación internos ─────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── Marca el link activo del navbar al hacer scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar .nav-link[href^="#"]');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.navbar .nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(s => observer.observe(s));
