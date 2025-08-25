// Componente Header reutilizable
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="navbar navbar-expand-lg shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold fs-3" href="#" onclick="window.scrollTo(0,0); return false;">
          <i class="bi bi-terminal-fill me-2"></i>GIT GAMING GUIDE
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><a class="nav-link" href="#quick-start" data-translate="nav-quick-start">Quick Start</a></li>
            <li class="nav-item"><a class="nav-link" href="#game-flows" data-translate="nav-flows">Flujos</a></li>
            <li class="nav-item"><a class="nav-link" href="#common-errors" data-translate="nav-errors">Errores</a></li>
            <li class="nav-item"><a class="nav-link" href="#team-communication" data-translate="nav-team">Equipo</a></li>
          </ul>
          <div class="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
            <div class="language-switch">
              <input type="checkbox" id="languageToggle">
              <label class="language-slider" for="languageToggle">
                <span class="lang-text" id="langEs">ES</span>
                <span class="lang-text" id="langEn">EN</span>
              </label>
            </div>
            <button id="darkModeToggle" class="btn dark-mode-toggle" title="Modo Oscuro">
              <i class="bi bi-moon-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
    `;
  }
}
customElements.define('header-component', HeaderComponent);

// Componente Footer reutilizable
class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="py-4 mt-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8 text-start">
            <p class="mb-0" style="font-family: var(--font-gaming); color: var(--text-secondary);">
              Desarrollado por <span style="color: var(--accent-primary); text-shadow: var(--glow-primary);">soynixonlopez</span> con <i class="bi bi-heart-fill" style="color: var(--accent-danger);"></i> para estudiantes del Centro Superate Fundación Alberto Motta.
            </p>
          </div>
          <div class="col-md-4 text-end">
            <div class="social-links">
              <a href="https://github.com/soynixonlopez" target="_blank" style="color: var(--text-primary); transition: all 0.3s ease;" class="me-3" onmouseover="this.style.color='var(--accent-primary)'; this.style.textShadow='var(--glow-primary)'" onmouseout="this.style.color='var(--text-primary)'; this.style.textShadow='none'">
                <i class="bi bi-github fs-4"></i>
              </a>
              <a href="https://www.linkedin.com/in/nixonlopez/" target="_blank" style="color: var(--text-primary); transition: all 0.3s ease;" onmouseover="this.style.color='var(--accent-primary)'; this.style.textShadow='var(--glow-primary)'" onmouseout="this.style.color='var(--text-primary)'; this.style.textShadow='none'">
                <i class="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}
customElements.define('footer-component', FooterComponent); 