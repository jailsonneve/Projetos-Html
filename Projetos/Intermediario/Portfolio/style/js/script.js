document.addEventListener("DOMContentLoaded", function () {
  const repoList = document.getElementById("repo-list");

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
});
