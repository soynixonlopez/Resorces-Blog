// Función para cambiar el idioma
function setLanguage(lang) {
    // Actualizar botones de idioma
    document.getElementById('langEs').classList.toggle('active', lang === 'es');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    
    // Actualizar el título de la página
    document.title = translations[lang].title;
    
    // Actualizar todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Guardar preferencia de idioma
    localStorage.setItem('language', lang);
}

// Función para cambiar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Actualizar icono y texto del botón
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    const text = darkModeToggle.querySelector('span');
    const lang = localStorage.getItem('language') || 'es';
    
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = translations[lang].darkMode === 'Modo Oscuro' ? 'Modo Claro' : 'Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = translations[lang].darkMode;
    }
}

// Función para copiar comandos
function copyCommand(button) {
    const code = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Configurar modo oscuro
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        const text = darkModeToggle.querySelector('span');
        text.textContent = translations[localStorage.getItem('language') || 'es'].darkMode === 'Modo Oscuro' ? 'Modo Claro' : 'Light Mode';
    }
    
    // Configurar idioma
    const savedLanguage = localStorage.getItem('language') || 'es';
    setLanguage(savedLanguage);
    
    // Event listeners
    document.getElementById('langEs').addEventListener('click', () => setLanguage('es'));
    document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
});
