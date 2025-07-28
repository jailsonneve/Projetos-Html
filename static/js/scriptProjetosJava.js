const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve";
const repoName = "Projetos-Java";
const folderName = "Projetos";
const levels = ["Basico", "Intermediario", "Avancado"];
const inputJsonPath = "IOExemplos/entradasExemploJava.json";

const projectList = document.getElementById("project-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const ignoredFolders = ["node_modules", ".git", ".vscode", "vendor", "__MACOSX", "static", "scripts", "styles"];

let allProjects = [];

// Função para carregar entradas de exemplo do GitHub
async function carregarExemplosEntrada() {
  const url = `https://raw.githubusercontent.com/${username}/${repoName}/main/${inputJsonPath}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.warn("⚠️ Não foi possível carregar exemplos de entrada:", e);
    return {};
  }
}

// Cache local
function salvarCacheProjetos(projetos) {
  const dados = { projetos: projetos, timestamp: Date.now() };
  localStorage.setItem("cacheProjetosJava", JSON.stringify(dados));
}

function carregarCacheProjetos() {
  const cache = localStorage.getItem("cacheProjetosJava");
  if (!cache) return null;
  const dados = JSON.parse(cache);
  const agora = Date.now();
  const tempoLimite = 60 * 60 * 1000;
  if (agora - dados.timestamp < tempoLimite) {
    return dados.projetos;
  } else {
    localStorage.removeItem("cacheProjetosJava");
    return null;
  }
}

// Buscar projetos por nível
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

// Buscar todos os projetos e renderizar
async function fetchAllProjects() {
  const projetosDoCache = carregarCacheProjetos();
  const exemplosEntrada = await carregarExemplosEntrada();

  if (projetosDoCache) {
    allProjects = projetosDoCache;
    Swal.fire({
      title: 'Projetos carregados do cache',
      text: 'Evitei novas requisições ao GitHub.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    return renderProjects(allProjects, exemplosEntrada);
  }

  try {
    const promises = levels.map(fetchProjectsByLevel);
    const nested = await Promise.all(promises);
    allProjects = nested.flat();
    salvarCacheProjetos(allProjects);
    renderProjects(allProjects, exemplosEntrada);
  } catch (e) {
    console.error("Erro ao carregar todos os projetos:", e);
  }
}

// Renderizar lista de projetos
async function renderProjects(projects, exemplosEntrada = {}) {
  projectList.innerHTML = "";
  const githubRawBase = `https://raw.githubusercontent.com/${username}/${repoName}/main`;

  for (const project of projects) {
    if (project.type === "dir" && !ignoredFolders.includes(project.name)) {
      const javaPath = `${folderName}/${project._nivel}/${project.name}/Main.java`;
      const rawUrl = `${githubRawBase}/${javaPath}`;
      const inputExample = exemplosEntrada[project.name] || "";
      const executarLink = `executarJava.html?raw=${encodeURIComponent(rawUrl)}&input=${encodeURIComponent(inputExample)}`;
      const githubLink = `https://github.com/${username}/${repoName}/tree/main/${folderName}/${project._nivel}/${project.name}`;

      const projectDiv = document.createElement("div");
      projectDiv.className = "project";
      projectDiv.innerHTML = `
        <div>
          <h5>${project.name}</h5>
          <p>Nível: ${project._nivel}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-primary btn-sm me-2" onclick="window.open('${githubLink}', '_blank')"><i class="bi bi-eye"></i> Código Fonte</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.open('${executarLink}', '_blank')"><i class="bi bi-play-circle"></i> Executar Código</button>
          </div>
        </div>`;
      projectList.appendChild(projectDiv);
    }
  }
}

// Filtro por nome
searchForm.addEventListener("input", function (event) {
  event.preventDefault();
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".project").forEach((project) => {
    const name = project.querySelector("h5").textContent.toLowerCase();
    const match = name.includes(query);
    project.style.display = match ? "" : "none";
  });
});

// Filtro por nível
document.getElementById("category-filter").addEventListener("change", function () {
  const selected = this.value;
  const filtered = !selected ? allProjects : allProjects.filter(p => p._nivel === selected);
  carregarExemplosEntrada().then(exemplos => {
    renderProjects(filtered, exemplos);
  });
});

// Inicialização
fetchAllProjects();