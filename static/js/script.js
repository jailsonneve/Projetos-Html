const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve";
const repoName = "Projetos-Html";
const folderName = "Projetos";
const levels = ["Basico", "Intermediario", "Avancado"];
const projectList = document.getElementById("project-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

const ignoredFolders = ["node_modules", "dist", ".git", ".vscode", "vendor", "__MACOSX"];
let allProjects = [];

async function fetchProjectsByLevel(level) {
  const path = `${folderName}/${level}`;
  const baseURL = `${API_PROXY_URL}?path=repos/${username}/${repoName}/contents/${path}`;
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(`Erro ao buscar projetos do nível ${level}. Status: ${response.status}`);
    }
    const projects = await response.json();
    return projects.map(p => ({ ...p, _nivel: level }));
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: `Erro ao carregar projetos`,
      text: `Não foi possível carregar os projetos do nível "${level}".\n\nDetalhes: ${e.message}`,
      icon: "error",
      confirmButtonText: "OK"
    });
    return [];
  }
}

async function fetchHTMLFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Erro ao buscar arquivos no diretório: ${url}`);
      return null;
    }
    const files = await response.json();
    for (const file of files) {
      if (ignoredFolders.includes(file.name)) continue;
      if (file.type === "file" && file.name.endsWith(".html")) {
        return file.path;
      } else if (file.type === "dir") {
        const result = await fetchHTMLFile(file.url);
        if (result) return result;
      }
    }
  } catch (e) {
    console.warn("Erro ao buscar arquivo HTML", e);
    Swal.fire({
      title: "Erro ao carregar arquivos",
      text: "Não foi possível encontrar um arquivo HTML válido neste diretório.",
      icon: "error",
      confirmButtonText: "Entendi"
    });
  }
  return null;
}

async function fetchAllProjects() {
  Swal.fire({
    title: 'Carregando projetos...',
    text: 'Aguarde enquanto buscamos os dados do GitHub.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const promises = levels.map(fetchProjectsByLevel);
    const nested = await Promise.all(promises);
    allProjects = nested.flat();

    Swal.close();

    if (allProjects.length === 0) {
      Swal.fire({
        title: "Nenhum projeto encontrado",
        text: "Não foi possível carregar nenhum projeto. Verifique sua conexão ou tente novamente mais tarde.",
        icon: "warning",
        confirmButtonText: "Ok"
      });
    }

    renderProjects(allProjects);
  } catch (e) {
    Swal.close();
    console.error("Erro ao carregar todos os projetos:", e);
    Swal.fire({
      title: "Erro geral",
      text: "Ocorreu um erro inesperado ao carregar os projetos.",
      icon: "error",
      confirmButtonText: "Ok"
    });
  }
}

async function renderProjects(projects) {
  projectList.innerHTML = "";
  for (const project of projects) {
    if (project.type === "dir" && !ignoredFolders.includes(project.name)) {
      const htmlFilePath = await fetchHTMLFile(project.url);
      if (htmlFilePath) {
        const githubIoLink = `https://${username}.github.io/${repoName}/${htmlFilePath}`;
        const githubLink = `https://github.com/${username}/${repoName}/blob/main/${folderName}/${project._nivel}/${project.name}`;

        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.innerHTML = `
          <div>
            <h5>${project.name}</h5>
            <p>Nível: ${project._nivel}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-outline-primary btn-sm me-2" onclick="showAlert('Github', '${project.name}', '${githubLink}')">Ver no GitHub</button>
              <button class="btn btn-outline-secondary btn-sm" onclick="showAlert('Github Pages', '${project.name}', '${githubIoLink}')">Abrir no GitHub.io</button>
            </div>
          </div>`;
        projectList.appendChild(projectDiv);
      }
    }
  }
}

window.showAlert = function (onde, projectName, link) {
  Swal.fire({
    title: `Acessar ${projectName}`,
    text: `Você deseja abrir o projeto "${projectName}" no ${onde}?`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Abrir'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(link, '_blank');
    }
  });
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value.toLowerCase();
  let found = false;
  document.querySelectorAll(".project").forEach((project) => {
    const name = project.querySelector("h5").textContent.toLowerCase();
    const match = name.includes(query);
    project.style.display = match ? "" : "none";
    if (match) found = true;
  });
  if (!found) {
    Swal.fire({
      title: "Nenhum projeto encontrado",
      text: `Nenhum projeto corresponde a "${query}"`,
      icon: "warning",
      confirmButtonText: "Ok"
    });
  }
});

document.getElementById("category-filter").addEventListener("change", function () {
  const selected = this.value;
  if (!selected) {
    renderProjects(allProjects);
  } else {
    const filtered = allProjects.filter(p => p._nivel === selected);
    renderProjects(filtered);
  }
});

fetchAllProjects();