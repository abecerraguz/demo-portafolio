// ── Sidebar toggle en móvil ────────────────────────────────────────────────
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar       = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

    // Cierra el sidebar al hacer click fuera en móvil
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// ── Marca link activo en el sidebar según la URL ───────────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.startsWith(href) && href !== '/admin/') {
        link.classList.add('active');
    }
});

// ── Auto-cierre de alertas flash después de 5 segundos ────────────────────
setTimeout(() => {
    document.querySelectorAll('.alert-dismissible').forEach(alert => {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
        bsAlert.close();
    });
}, 5000);
