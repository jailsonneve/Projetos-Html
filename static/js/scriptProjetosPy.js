const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve";
const repoName = "Projetos-PY";
const folderName = "Projetos";
const levels = ["Basico", "Intermediario", "Avancado"];
const projectList = document.getElementById("project-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const ignoredFolders = ["node_modules", "ClinicaMultidisciplinar", "dist", ".git", ".vscode", "vendor", "__MACOSX", "controller", "model", "routers", "static", "scripts", "styles"];

let allProjects = [];

function salvarCacheProjetos(projetos) {
  const dados = { projetos: projetos, timestamp: Date.now() };
  localStorage.setItem("cacheProjetosPy", JSON.stringify(dados));
}

function carregarCacheProjetos() {
  const cache = localStorage.getItem("cacheProjetosPy");
  if (!cache) return null;
  const dados = JSON.parse(cache);
  const agora = Date.now();
  const tempoLimite = 60 * 60 * 1000;
  if (agora - dados.timestamp < tempoLimite) {
    return dados.projetos;
  } else {
    localStorage.removeItem("cacheProjetosPy");
    return null;
  }
}

async function fetchProjectsByLevel(level) {
  const path = `${folderName}/${level}`;
  const baseURL = `${API_PROXY_URL}?path=repos/${username}/${repoName}/contents/${path}`;
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error(`Erro ao buscar projetos do nível ${level}. Status: ${response.status}`);
    const projects = await response.json();
    return projects.map(p => ({ ...p, _nivel: level }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchAllProjects() {
  const projetosDoCache = carregarCacheProjetos();
  if (projetosDoCache) {
    allProjects = projetosDoCache;
    return renderProjects(allProjects);
  }

  try {
    const promises = levels.map(fetchProjectsByLevel);
    const nested = await Promise.all(promises);
    allProjects = nested.flat();
    salvarCacheProjetos(allProjects);
    renderProjects(allProjects);
  } catch (e) {
    console.error("Erro ao carregar todos os projetos:", e);
  }
}

async function renderProjects(projects) {
  projectList.innerHTML = "";
  const githubRawBase = `https://raw.githubusercontent.com/${username}/${repoName}/main`;

  for (const project of projects) {
    if (project.type === "dir" && !ignoredFolders.includes(project.name)) {
      const appPath = `${folderName}/${project._nivel}/${project.name}/app.py`;
      const rawUrl = `${githubRawBase}/${appPath}`;
      const executarLink = `executarComInput.html?raw=${encodeURIComponent(rawUrl)}`;
      const githubLink = `https://github.com/${username}/${repoName}/tree/main/${folderName}/${project._nivel}/${project.name}`;

      const projectDiv = document.createElement("div");
      projectDiv.className = "project";
      projectDiv.innerHTML = `
        <div>
          <h5>${project.name}</h5>
          <p>Nível: ${project._nivel}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-primary btn-sm me-2" onclick="window.open('${githubLink}', '_blank')">Ver no GitHub</button>
            <button class="btn btn-outline-success btn-sm" onclick="window.open('${executarLink}', '_blank')">Executar Código</button>
          </div>
        </div>`;
      projectList.appendChild(projectDiv);
    }
  }
}

searchForm.addEventListener("input", function (event) {
  event.preventDefault();
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".project").forEach((project) => {
    const name = project.querySelector("h5").textContent.toLowerCase();
    const match = name.includes(query);
    project.style.display = match ? "" : "none";
  });
});

document.getElementById("category-filter").addEventListener("change", function () {
  const selected = this.value;
  const filtered = !selected ? allProjects : allProjects.filter(p => p._nivel === selected);
  renderProjects(filtered);
});

fetchAllProjects();