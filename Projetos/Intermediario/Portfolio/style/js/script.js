document.addEventListener("DOMContentLoaded", function () {
  const repoList = document.getElementById("repo-list");
  const siteList = document.getElementById("site-list");

  const repos = [
    {
      name: "Projetos-Html",
      description: "Coleção de projetos front-end com HTML5, CSS3 e JS, incluindo buscador de filmes, CRUD, e muito mais.",
      url: "https://github.com/jailsonneve/Projetos-Html"
    },
    {
      name: "Estacao_Meteorologica",
      description: "Projeto de TCC com Arduino para monitoramento climático com sensores, LCD e integração via Serial.",
      url: "https://github.com/jailsonneve/Estacao_Meteorologica_Arduino-Projeto_TCC"
    },
    {
      name: "Projetos-Java",
      description: "Algoritmos Java organizados por listas e desafios, com base em fluxogramas, MVC e exercícios escolares.",
      url: "https://github.com/jailsonneve/Projetos-Java"
    },
    {
      name: "Projetos-PY",
      description: "Repositório com scripts, mini apps e soluções Python: automação, cálculos matemáticos e lógica aplicada.",
      url: "https://github.com/jailsonneve/Projetos-PY"
    }
  ];

  const sitesPojects = [
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
  ]

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

  sitesPojects.forEach(site => {
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
});
