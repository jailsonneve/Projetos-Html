document.addEventListener("DOMContentLoaded", () => {

  // ===== LISTAGEM DE REPOS =====
  const repoList = document.getElementById("repo-list");
  const siteList = document.getElementById("site-list");

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

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h5><i class="bi bi-folder-fill"></i> ${repo.name}</h5>
      <p>${repo.description}</p>
      <a href="${repo.url}" class="btn btn-outline-success btn-sm" target="_blank">
        <i class="bi bi-box-arrow-up-right"></i> Acessar Repositório
      </a>
    `;
    repoList.appendChild(card);
  });

  sitesProjects.forEach(site => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <h5><i class="bi bi-diagram-3"></i> ${site.name}</h5>
      <p>${site.description}</p>
      <a href="${site.url}" class="btn btn-outline-success btn-sm" target="_blank">
        <i class="bi bi-box-arrow-up-right"></i> Acessar Site
      </a>
    `;
    siteList.appendChild(card);
  });

  // ===== MODO CLARO / ESCURO =====
  const toggleBtn = document.getElementById("themeToggle");
  const toggleBtnMobile = document.getElementById("themeToggleMobile");
  const textoDireitos = document.querySelector("small");
  const btnGithub = document.getElementById("btnGithub");
  const navbar = document.querySelector(".navbar");
  const textosBold = document.querySelectorAll("#textoBold");

  if (!toggleBtn) {
    console.error("Botão themeToggle não encontrado");
    return;
  }

  // Função para atualizar tema
  const updateTheme = (lightModeAtivo) => {
    document.body.classList.toggle("light-mode", lightModeAtivo);

    toggleBtn.classList.toggle("btn-outline-dark", lightModeAtivo);
    toggleBtn.classList.toggle("btn-outline-light", !lightModeAtivo);

    if (toggleBtnMobile) {
      toggleBtnMobile.classList.toggle("btn-outline-dark", lightModeAtivo);
      toggleBtnMobile.classList.toggle("btn-outline-light", !lightModeAtivo);
    }

    textoDireitos.classList.toggle("text-white", !lightModeAtivo);
    textoDireitos.classList.toggle("text-dark", lightModeAtivo);

    btnGithub.classList.toggle("btn-outline-light", !lightModeAtivo);
    btnGithub.classList.toggle("btn-outline-dark", lightModeAtivo);

    navbar.classList.toggle("navbar-light", lightModeAtivo);
    navbar.classList.toggle("bg-light", lightModeAtivo);

    navbar.classList.toggle("navbar-dark", !lightModeAtivo);
    navbar.classList.toggle("bg-dark", !lightModeAtivo);

    textosBold.forEach(el => {
      el.classList.toggle("fw-bold-light", lightModeAtivo);
      el.classList.toggle("fw-bold", !lightModeAtivo);
    });

    const icon = lightModeAtivo ? `<i class="bi bi-moon-fill"></i>` : `<i class="bi bi-brightness-high-fill"></i>`;
    toggleBtn.innerHTML = icon;
    if (toggleBtnMobile) {
      toggleBtnMobile.innerHTML = icon + ' Alterar Tema';
    }

    localStorage.setItem("theme", lightModeAtivo ? "light" : "dark");
  };

  // Tema inicial
  const savedTheme = localStorage.getItem("theme") || "dark";
  const isLight = savedTheme === "light";

  document.body.classList.toggle("light-mode", isLight);
  toggleBtn.classList.add("btn");
  toggleBtn.classList.toggle("btn-outline-dark", isLight);
  toggleBtn.classList.toggle("btn-outline-light", !isLight);

  if (toggleBtnMobile) {
    toggleBtnMobile.classList.add("btn");
    toggleBtnMobile.classList.toggle("btn-outline-dark", isLight);
    toggleBtnMobile.classList.toggle("btn-outline-light", !isLight);
  }

  textoDireitos.classList.toggle("text-white", !isLight);
  textoDireitos.classList.toggle("text-dark", isLight);

  textosBold.forEach(el => {
    el.classList.toggle("fw-bold-light", isLight);
    el.classList.toggle("fw-bold", !isLight);
  });

  btnGithub.classList.add(
    "btn",
    "btn-lg",
    "px-4",
    "mt-3",
    "animate-fade-in",
    "delay-6"
  );

  btnGithub.classList.toggle("btn-outline-light", !isLight);
  btnGithub.classList.toggle("btn-outline-dark", isLight);

  navbar.classList.toggle("navbar-light", isLight);
  navbar.classList.toggle("bg-light", isLight);

  navbar.classList.toggle("navbar-dark", !isLight);
  navbar.classList.toggle("bg-dark", !isLight);

  toggleBtn.innerHTML = isLight
    ? `<i class="bi bi-moon-fill"></i>`
    : `<i class="bi bi-brightness-high-fill"></i>`;

  if (toggleBtnMobile) {
    toggleBtnMobile.innerHTML = isLight
      ? `<i class="bi bi-moon-fill"></i> Alterar Tema`
      : `<i class="bi bi-brightness-high-fill"></i> Alterar Tema`;
  }

  // Clique desktop
  toggleBtn.addEventListener("click", () => {
    const lightModeAtivo = document.body.classList.contains("light-mode") ? false : true;
    updateTheme(lightModeAtivo);
  });

  // Clique mobile
  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", () => {
      const lightModeAtivo = document.body.classList.contains("light-mode") ? false : true;
      updateTheme(lightModeAtivo);
    });
  }

});
