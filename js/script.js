// Modo oscuro con transición suave y preferencia guardada
function setDarkMode(enabled) {
    const body = document.body;
    const html = document.documentElement;
    if (enabled) {
        body.classList.add('dark-mode');
        html.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'on');
    } else {
        body.classList.remove('dark-mode');
        html.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'off');
    }
}

// Transición suave para body, html y elementos principales
function addTransition() {
    document.body.style.transition = 'background-color 0.5s, color 0.5s';
    document.documentElement.style.transition = 'background-color 0.5s, color 0.5s';
    const main = document.querySelector('main');
    if (main) main.style.transition = 'background-color 0.5s, color 0.5s';
    const header = document.querySelector('header');
    if (header) header.style.transition = 'background-color 0.5s, color 0.5s';
    const footer = document.querySelector('footer');
    if (footer) footer.style.transition = 'background-color 0.5s, color 0.5s';
}

// Inicializar modo oscuro según preferencia guardada
function initDarkMode() {
    addTransition();
    const saved = localStorage.getItem('darkMode');
    if (saved === 'on') {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    const darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) {
        darkBtn.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            setDarkMode(!isDark);
        });
    }
}); 