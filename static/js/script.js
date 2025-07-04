const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve";
const repoName = "Projetos-Html";
const folderName = "Projetos";
const levels = ["Basico", "Intermediario", "Avancado"];
const projectList = document.getElementById("project-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const ignoredFolders = ["node_modules", "dist", ".git", ".vscode", "vendor", "__MACOSX", "controller", "model", "routers", "static", "scripts", "styles"];

let allProjects = [];

// ----- Cache -----
function salvarCacheProjetos(projetos) {
    const dados = {
        projetos: projetos,
        timestamp: Date.now()
    };
    localStorage.setItem('cacheProjetos', JSON.stringify(dados));
}

function carregarCacheProjetos() {
    const cache = localStorage.getItem('cacheProjetos');
    if (!cache) return null;

    const dados = JSON.parse(cache);
    const agora = Date.now();
    const tempoLimite = 60 * 60 * 1000; // 1 hora

    if (agora - dados.timestamp < tempoLimite) {
        return dados.projetos;
    } else {
        localStorage.removeItem('cacheProjetos');
        return null;
    }
}

function limparCache() {
    localStorage.removeItem('cacheProjetos');
    Swal.fire({
        title: 'Cache limpo!',
        text: 'Os dados serão buscados novamente da próxima vez.',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

// ----- Buscar projetos por nível -----
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
        Swal.fire({
            title: `Erro ao carregar projetos`,
            text: `Não foi possível carregar os projetos do nível "${level}".\n\nDetalhes: ${e.message}`,
            icon: "error",
            confirmButtonText: "OK"
        });
        return [];
    }
}

// ----- Buscar todos os projetos -----
async function fetchAllProjects() {
    const projetosDoCache = carregarCacheProjetos();
    if (projetosDoCache) {
        allProjects = projetosDoCache;
        Swal.fire({
            title: 'Projetos carregados do cache',
            text: 'Evitei novas requisições ao GitHub.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        return renderProjects(allProjects);
    }

    Swal.fire({
        title: 'Carregando projetos do GitHub...',
        text: 'Aguarde enquanto buscamos os dados mais recentes.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const promises = levels.map(fetchProjectsByLevel);
        const nested = await Promise.all(promises);
        allProjects = nested.flat();

        salvarCacheProjetos(allProjects);
        Swal.close();

        if (allProjects.length == 0) {
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

// ----- Renderizar projetos -----
async function renderProjects(projects) {
    projectList.innerHTML = "";

    const excecoesHTML = {
        // Projetos/Avancado/Tomcat-docker/webapps/my-web-app
        "Tomcat-docker": "webapps/my-web-app/index.html",
        // Projetos/Avancado/Projeto-Loja-Skins/site/view/templates
        "Projeto-Loja-Skins": "site/view/templates/index.html"
    };

    for (const project of projects) {
        if (project.type === "dir" && !ignoredFolders.includes(project.name)) {
            let htmlPath;

            if (excecoesHTML[project.name]) {
                htmlPath = `${folderName}/${project._nivel}/${project.name}/${excecoesHTML[project.name]}`;
            } else {
                htmlPath = `${folderName}/${project._nivel}/${project.name}/index.html`;
            }

            const githubIoLink = `https://${username}.github.io/${repoName}/${htmlPath}`;
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

// ----- Alertas e filtros -----
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

// ----- Inicialização -----
fetchAllProjects();