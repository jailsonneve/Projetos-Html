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
  // const baseURL = `https://github-api-proxy-six.vercel.app/api/github?path=repos/jailsonneve/Projetos-Html/contents/Projetos`;
  const baseURL = `${API_PROXY_URL}?path=repos/${username}/${repoName}/contents/${path}`;
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error(`Erro ao buscar projetos do nível ${level}`);
    const projects = await response.json();
    return projects.map(p => ({ ...p, _nivel: level }));
  } catch (e) {
    console.warn(e);
    return [];
  }
}

async function fetchAllProjects() {
  const promises = levels.map(fetchProjectsByLevel);
  const nested = await Promise.all(promises);
  allProjects = nested.flat();
  renderProjects(allProjects);
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

async function fetchHTMLFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
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
  }
  return null;
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
