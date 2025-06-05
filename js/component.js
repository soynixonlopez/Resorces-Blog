// Componente Header reutilizable
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold fs-3" href="index.html">
          <i class="bi bi-lightning-charge-fill me-2"></i>EXPO TECH RESOURCES
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item"><a class="nav-link active" href="index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="#recursos-rapidos">Recursos</a></li>
          </ul>
          <div class="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
            <div class="btn-group" role="group" aria-label="Selector de idioma">
              <button id="langEs" class="btn btn-outline-light active">ES</button>
              <button id="langEn" class="btn btn-outline-light">EN</button>
            </div>
            <button id="darkModeToggle" class="btn btn-outline-light" title="Modo Oscuro">
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
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8 text-start">
            <p class="mb-0">
              Desarrollado por <span class="text-warning">soynixonlopez con </span> <i class="bi bi-heart-fill text-danger"></i> para estudiantes del Centro Superate Fundación Alberto Motta.
            </p>
          </div>
          <div class="col-md-4 text-end">
            <div class="social-links">
              <a href="https://github.com/soynixonlopez" target="_blank" class="text-white me-3">
                <i class="bi bi-github fs-4"></i>
              </a>
              <a href="https://www.linkedin.com/in/nixonlopez/" target="_blank" class="text-white">
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