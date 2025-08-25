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
    initLanguageSwitch();
    initCopyFunctionality();
    initScrollAnimations();
    
    // Aplicar traducciones iniciales después de que se carguen los componentes
    setTimeout(() => {
        const savedLang = localStorage.getItem('language') || 'es';
        applyTranslations(savedLang);
    }, 100);
    
    const darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) {
        darkBtn.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            setDarkMode(!isDark);
            
            // Cambiar icono con animación
            const icon = darkBtn.querySelector('i');
            icon.style.transform = 'scale(0)';
            setTimeout(() => {
                icon.className = isDark ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Inicializar switch de idioma
function initLanguageSwitch() {
    const languageToggle = document.getElementById('languageToggle');
    const langEs = document.getElementById('langEs');
    const langEn = document.getElementById('langEn');
    
    if (languageToggle && langEs && langEn) {
        // Cargar idioma guardado
        const savedLang = localStorage.getItem('language') || 'es';
        languageToggle.checked = savedLang === 'en';
        updateLanguageDisplay(savedLang);
        
        languageToggle.addEventListener('change', function() {
            const newLang = this.checked ? 'en' : 'es';
            localStorage.setItem('language', newLang);
            updateLanguageDisplay(newLang);
            
            // Efecto visual
            const slider = document.querySelector('.language-slider');
            slider.style.transform = 'scale(0.95)';
            setTimeout(() => {
                slider.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

function updateLanguageDisplay(lang) {
    const langEs = document.getElementById('langEs');
    const langEn = document.getElementById('langEn');
    
    if (langEs && langEn) {
        langEs.classList.toggle('active', lang === 'es');
        langEn.classList.toggle('active', lang === 'en');
    }
    
    // Aplicar traducciones al contenido
    applyTranslations(lang);
    
    // Actualizar atributo lang del documento
    document.documentElement.lang = lang;
}

// Inicializar funcionalidad de copia
function initCopyFunctionality() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.copy-btn')) {
            const copyBtn = e.target.closest('.copy-btn');
            const commandBox = copyBtn.closest('.command-box');
            const codeElement = commandBox.querySelector('code');
            
            if (codeElement) {
                const textToCopy = codeElement.textContent;
                
                // Usar la API moderna de clipboard si está disponible
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showCopyFeedback(copyBtn);
                        createParticleEffect(copyBtn);
                    }).catch(err => {
                        console.error('Error al copiar: ', err);
                        fallbackCopyTextToClipboard(textToCopy, copyBtn);
                    });
                } else {
                    // Fallback para navegadores más antiguos
                    fallbackCopyTextToClipboard(textToCopy, copyBtn);
                }
            }
        }
    });
}

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.command-card, .flow-card, .error-card, .team-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Función fallback para copiar texto
function fallbackCopyTextToClipboard(text, btn) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(btn);
        createParticleEffect(btn);
    } catch (err) {
        console.error('Error al copiar texto: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual al copiar
function showCopyFeedback(btn) {
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check"></i>';
    btn.classList.add('success');
    
    // Cambiar colores según el tema gaming
    btn.style.background = 'var(--accent-success)';
    btn.style.color = 'var(--bg-primary)';
    btn.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
    
    setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove('success');
        btn.style.background = '';
        btn.style.color = '';
        btn.style.boxShadow = '';
    }, 1500);
}

// Sistema de traducciones
const translations = {
    es: {
        // Hero Section
        'hero-title-1': 'GIT',
        'hero-title-2': 'GAMING GUIDE',
        'hero-subtitle': 'Domina Git como un Pro Gamer 🎮',
        'hero-stat-1': 'Comandos Básicos',
        'hero-stat-2': 'Flujos Principales', 
        'hero-stat-3': 'Errores Resueltos',
        
        // Quick Start Section
        'quick-start-title': 'QUICK START',
        'quick-start-subtitle': 'Los 5 comandos que necesitas para sobrevivir',
        
        // Commands
        'cmd-init-name': 'INICIALIZAR',
        'cmd-init-desc': 'Inicia un nuevo repositorio Git en tu proyecto',
        'cmd-init-tip': 'Solo úsalo una vez por proyecto',
        
        'cmd-add-name': 'PREPARAR',
        'cmd-add-desc': 'Prepara todos los archivos modificados para el commit',
        'cmd-add-tip': 'El punto (.) incluye todos los archivos',
        
        'cmd-commit-name': 'GUARDAR',
        'cmd-commit-desc': 'Guarda los cambios con un mensaje descriptivo',
        'cmd-commit-tip': 'Usa mensajes claros y descriptivos',
        
        'cmd-pull-name': 'ACTUALIZAR',
        'cmd-pull-desc': 'Descarga los últimos cambios del repositorio',
        'cmd-pull-tip': '¡Hazlo ANTES de trabajar!',
        
        'cmd-push-name': 'SUBIR',
        'cmd-push-desc': 'Sube tus cambios al repositorio remoto',
        'cmd-push-tip': '¡Comunícate con tu equipo!',
        
        // Game Flows Section
        'flows-title': 'FLUJOS DE JUEGO',
        'flows-subtitle': 'Combos y estrategias para diferentes situaciones',
        
        'flow-new-title': 'NUEVO PROYECTO',
        'flow-new-badge': 'QUEST',
        
        'flow-daily-title': 'TRABAJO DIARIO',
        'flow-daily-badge': 'DAILY',
        'flow-daily-step': 'Trabaja en tu código',
        
        'flow-error-title': 'ERROR AL PULL',
        'flow-error-badge': 'BOSS',
        'flow-error-step': 'git pull falla',
        
        // Common Errors Section
        'errors-title': 'ERRORES COMUNES',
        'errors-subtitle': 'Boss Battles y cómo derrotarlos',
        
        'error-merge-title': 'MERGE CONFLICT',
        'error-merge-level': 'BOSS LVL 1',
        'error-merge-desc': 'Dos personas modificaron el mismo archivo',
        'error-merge-solution': 'SOLUCIÓN:',
        'error-merge-step1': 'Abre el archivo conflictivo',
        'error-merge-step2': 'Busca las marcas',
        'error-merge-step3': 'Elige qué código mantener',
        'error-merge-step4': 'Elimina las marcas de conflicto',
        'error-merge-step5': 'y',
        
        'error-push-title': 'PUSH REJECTED',
        'error-push-level': 'BOSS LVL 2',
        'error-push-desc': 'Tu código está desactualizado',
        'error-push-solution': 'SOLUCIÓN:',
        'error-push-note': 'Luego resuelve conflictos si aparecen',
        
        'error-force-title': 'FORCE PUSH',
        'error-force-level': 'FINAL BOSS',
        'error-force-desc': 'Sobrescribe historial (¡PELIGROSO!)',
        'error-force-solution': 'COMANDO:',
        'error-force-warning': '¡SOLO úsalo si sabes lo que haces!',
        
        // Team Communication Section
        'team-title': 'COMUNICACIÓN DE EQUIPO',
        'team-rule1-title': 'Comunícate antes de hacer cambios grandes',
        'team-rule1-desc': 'Avisa a tu equipo cuando vayas a modificar archivos importantes',
        'team-rule2-title': 'Haz pull frecuentemente',
        'team-rule2-desc': 'Actualiza tu código varias veces al día para evitar conflictos',
        'team-rule3-title': 'Usa mensajes de commit descriptivos',
        'team-rule3-desc': 'Ayuda a tu equipo a entender qué cambios hiciste',
        
        // Navigation
        'nav-quick-start': 'Quick Start',
        'nav-flows': 'Flujos',
        'nav-errors': 'Errores',
        'nav-team': 'Equipo'
    },
    en: {
        // Hero Section
        'hero-title-1': 'GIT',
        'hero-title-2': 'GAMING GUIDE',
        'hero-subtitle': 'Master Git like a Pro Gamer 🎮',
        'hero-stat-1': 'Basic Commands',
        'hero-stat-2': 'Main Flows',
        'hero-stat-3': 'Errors Solved',
        
        // Quick Start Section
        'quick-start-title': 'QUICK START',
        'quick-start-subtitle': 'The 5 commands you need to survive',
        
        // Commands
        'cmd-init-name': 'INITIALIZE',
        'cmd-init-desc': 'Start a new Git repository in your project',
        'cmd-init-tip': 'Only use it once per project',
        
        'cmd-add-name': 'PREPARE',
        'cmd-add-desc': 'Prepare all modified files for commit',
        'cmd-add-tip': 'The dot (.) includes all files',
        
        'cmd-commit-name': 'SAVE',
        'cmd-commit-desc': 'Save changes with a descriptive message',
        'cmd-commit-tip': 'Use clear and descriptive messages',
        
        'cmd-pull-name': 'UPDATE',
        'cmd-pull-desc': 'Download the latest changes from repository',
        'cmd-pull-tip': 'Do it BEFORE working!',
        
        'cmd-push-name': 'UPLOAD',
        'cmd-push-desc': 'Upload your changes to remote repository',
        'cmd-push-tip': 'Communicate with your team!',
        
        // Game Flows Section
        'flows-title': 'GAME FLOWS',
        'flows-subtitle': 'Combos and strategies for different situations',
        
        'flow-new-title': 'NEW PROJECT',
        'flow-new-badge': 'QUEST',
        
        'flow-daily-title': 'DAILY WORK',
        'flow-daily-badge': 'DAILY',
        'flow-daily-step': 'Work on your code',
        
        'flow-error-title': 'PULL ERROR',
        'flow-error-badge': 'BOSS',
        'flow-error-step': 'git pull fails',
        
        // Common Errors Section
        'errors-title': 'COMMON ERRORS',
        'errors-subtitle': 'Boss Battles and how to defeat them',
        
        'error-merge-title': 'MERGE CONFLICT',
        'error-merge-level': 'BOSS LVL 1',
        'error-merge-desc': 'Two people modified the same file',
        'error-merge-solution': 'SOLUTION:',
        'error-merge-step1': 'Open the conflicted file',
        'error-merge-step2': 'Look for the conflict marks',
        'error-merge-step3': 'Choose which code to keep',
        'error-merge-step4': 'Remove conflict marks',
        'error-merge-step5': 'and',
        
        'error-push-title': 'PUSH REJECTED',
        'error-push-level': 'BOSS LVL 2',
        'error-push-desc': 'Your code is outdated',
        'error-push-solution': 'SOLUTION:',
        'error-push-note': 'Then resolve conflicts if they appear',
        
        'error-force-title': 'FORCE PUSH',
        'error-force-level': 'FINAL BOSS',
        'error-force-desc': 'Overwrites history (DANGEROUS!)',
        'error-force-solution': 'COMMAND:',
        'error-force-warning': 'ONLY use it if you know what you\'re doing!',
        
        // Team Communication Section
        'team-title': 'TEAM COMMUNICATION',
        'team-rule1-title': 'Communicate before making big changes',
        'team-rule1-desc': 'Let your team know when you\'re going to modify important files',
        'team-rule2-title': 'Pull frequently',
        'team-rule2-desc': 'Update your code several times a day to avoid conflicts',
        'team-rule3-title': 'Use descriptive commit messages',
        'team-rule3-desc': 'Help your team understand what changes you made',
        
        // Navigation
        'nav-quick-start': 'Quick Start',
        'nav-flows': 'Flows',
        'nav-errors': 'Errors',
        'nav-team': 'Team'
    }
};

// Función para aplicar traducciones
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Actualizar título de la página
    document.title = lang === 'es' ? 
        'Git Gaming Guide - Comandos Esenciales' : 
        'Git Gaming Guide - Essential Commands';
}

// Efectos de partículas para comandos copiados
function createParticleEffect(element) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--accent-primary)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        
        // Animar partícula
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const duration = 800 + Math.random() * 400;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
} 