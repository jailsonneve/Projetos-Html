document.addEventListener("DOMContentLoaded", () => {

  // ===== DATA =====
  const repos = [
    {
      name: "Projetos HTML 5",
      description: "Coleção de projetos front-end com HTML5, CSS3 e JS, incluindo buscador de filmes, CRUD, e muito mais.",
      url: "https://github.com/jailsonneve/Projetos-Html"
    },
    {
      name: "Estação Meteorológica",
      description: "Projeto de TCC com Arduino para monitoramento climático com sensores, LCD, integração via Serial e Página Web.",
      url: "https://github.com/jailsonneve/Estacao_Meteorologica_Arduino-Projeto_TCC"
    },
    {
      name: "Projetos Java",
      description: "Algoritmos Java organizados por listas e desafios, com base em fluxogramas, MVC e exercícios escolares.",
      url: "https://github.com/jailsonneve/Projetos-Java"
    },
    {
      name: "Projetos Python",
      description: "Repositório com scripts, mini apps e soluções Python: automação, cálculos matemáticos e lógica aplicada.",
      url: "https://github.com/jailsonneve/Projetos-PY"
    }
  ];

  const sitesProjects = [
    {
      name: "Projetos HTML 5",
      description: "Site com diversos projetos de front-end utilizando HTML5, CSS3 e JavaScript.",
      url: "https://jailsonneve.github.io/Projetos-Html/index.html"
    },
    {
      name: "Estação Meteorológica",
      description: "Site do projeto de TCC com Arduino para monitoramento climático.",
      url: "https://jailsonneve.github.io/Estacao_Meteorologica_Arduino-Projeto_TCC/Pagina%20Web%20(Visualizador)/view/templates/listEstacaoTeste.html"
    },
    {
      name: "Projetos Java",
      description: "Site com diversos projetos usando Java, incluindo algoritmos e desafios.",
      url: "https://jailsonneve.github.io/Projetos-Html/templates/projetosJava.html"
    },
    {
      name: "Projetos Python",
      description: "Site com diversos projetos usando Python, incluindo automação e lógica.",
      url: "https://jailsonneve.github.io/Projetos-Html/templates/projetosPython.html"
    }
  ];

  // ===== ELEMENTS =====
  const repoList = document.getElementById("repo-list");
  const siteList = document.getElementById("site-list");
  const toggleBtn = document.getElementById("themeToggle");
  const toggleBtnMobile = document.getElementById("themeToggleMobile");
  const textoDireitos = document.querySelector("small");
  const btnGithub = document.getElementById("btnGithub");
  const navbar = document.querySelector(".navbar");
  const textosBold = document.querySelectorAll("#textoBold");

  // ===== HELPERS =====
  const createCard = (item, iconClass, isSite = false) => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h5><i class="${iconClass}"></i> ${item.name}</h5>
      <p>${item.description}</p>
      <a href="${item.url}" class="btn btn-outline-success btn-sm" target="_blank">
        <i class="bi bi-box-arrow-up-right"></i> ${isSite ? 'Acessar Site' : 'Acessar Repositório'}
      </a>
    `;
    return card;
  };

  // ===== INIT CARDS =====
  const initCards = () => {
    if (repoList) {
      repos.forEach(r => repoList.appendChild(createCard(r, 'bi bi-folder-fill')));
    }
    if (siteList) {
      sitesProjects.forEach(s => siteList.appendChild(createCard(s, 'bi bi-diagram-3', true)));
    }
  };

  // ===== THEME MODULE =====
  const Theme = (function () {
    const defaultTheme = 'dark';

    const setIcon = (el, light) => {
      if (!el) return;
      el.innerHTML = light ? `<i class="bi bi-moon-fill"></i>` : `<i class="bi bi-brightness-high-fill"></i>`;
      if (el === toggleBtnMobile) el.innerHTML += ' Alterar Tema';
    };

    const apply = (lightModeAtivo) => {
      document.body.classList.toggle('light-mode', lightModeAtivo);

      if (toggleBtn) {
        toggleBtn.classList.toggle('btn-outline-dark', lightModeAtivo);
        toggleBtn.classList.toggle('btn-outline-light', !lightModeAtivo);
      }
      if (toggleBtnMobile) {
        toggleBtnMobile.classList.toggle('btn-outline-dark', lightModeAtivo);
        toggleBtnMobile.classList.toggle('btn-outline-light', !lightModeAtivo);
      }

      if (textoDireitos) {
        textoDireitos.classList.toggle('text-white', !lightModeAtivo);
        textoDireitos.classList.toggle('text-dark', lightModeAtivo);
      }

      if (btnGithub) {
        btnGithub.classList.toggle('btn-outline-light', !lightModeAtivo);
        btnGithub.classList.toggle('btn-outline-dark', lightModeAtivo);
      }

      if (navbar) {
        navbar.classList.toggle('navbar-light', lightModeAtivo);
        navbar.classList.toggle('bg-light', lightModeAtivo);
        navbar.classList.toggle('navbar-dark', !lightModeAtivo);
        navbar.classList.toggle('bg-dark', !lightModeAtivo);
      }

      if (textosBold && textosBold.length) {
        textosBold.forEach(el => {
          el.classList.toggle('fw-bold-light', lightModeAtivo);
          el.classList.toggle('fw-bold', !lightModeAtivo);
        });
      }

      setIcon(toggleBtn, lightModeAtivo);
      setIcon(toggleBtnMobile, lightModeAtivo);

      localStorage.setItem('theme', lightModeAtivo ? 'light' : 'dark');
    };

    const toggle = () => {
      const light = !document.body.classList.contains('light-mode');
      apply(light);
    };

    const init = () => {
      const saved = localStorage.getItem('theme') || defaultTheme;
      const isLight = saved === 'light';

      // ensure btn classes exist
      if (toggleBtn) toggleBtn.classList.add('btn');
      if (toggleBtnMobile) toggleBtnMobile.classList.add('btn');

      apply(isLight);

      if (toggleBtn) toggleBtn.addEventListener('click', toggle);
      if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggle);
    };

    return { init, apply, toggle };
  })();

  // ===== START =====
  initCards();
  Theme.init();

  // preserve existing github button classes used previously
  if (btnGithub) {
    btnGithub.classList.add('btn','btn-lg','px-4','mt-3','animate-fade-in','delay-6');
  }

});