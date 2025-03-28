const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve"; // Seu username no GitHub
const repoName = "Projetos-Html"; // Nome do repositório
const folderName = "Projetos"; // Nome da pasta principal

async function fetchProjects() {
    const baseURL = `https://github-api-proxy-six.vercel.app/api/github?path=repos/jailsonneve/Projetos-Html/contents/Projetos`;

    try {
        const response = await fetch(baseURL);
        if (!response.ok) throw new Error("Erro ao buscar dados do repositório.");
        const projects = await response.json();
        console.log("Projetos:", projects); // Depuração

        globalThis.projects = projects; // Armazena globalmente os projetos para a pesquisa
        renderProjects(projects);

    } catch (error) {
        console.error("Erro:", error);
        Swal.fire({
            title: "Erro ao carregar projetos",
            text: "Ocorreu um problema ao buscar os projetos do GitHub. Tente novamente mais tarde.",
            icon: "error",
            confirmButtonText: "Ok"
        });
    }
}

function renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    projects.forEach(async (project) => {
        if (project.type === "dir") {
            const projectURL = project.url;
            const htmlFilePath = await fetchHTMLFile(projectURL);

            if (htmlFilePath) {
                const githubIoLink = `https://${username}.github.io/${repoName}/${htmlFilePath}`;
                const githubLink = `https://github.com/${username}/${repoName}/blob/main/${folderName}/${project.name}`;

                const projectDiv = document.createElement("div");
                projectDiv.className = "project d-flex align-items-center justify-content-between";
                projectDiv.innerHTML = `
                    <div>
                        <h5>${project.name}</h5>
                        <p>Projeto hospedado no GitHub e GitHub Pages.</p>
                    </div>
                    <div>
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="showAlert('Github', '${project.name}', '${githubLink}')">Ver no GitHub</button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="showAlert('Github Pages', '${project.name}', '${githubIoLink}')">Abrir no GitHub.io</button>
                    </div>
                `;
                projectList.appendChild(projectDiv);
            }
        }
    });

    console.log("Projetos carregados:", document.querySelectorAll(".project").length); // Depuração
}

async function fetchHTMLFile(projectURL) {
    try {
        const response = await fetch(projectURL);
        if (!response.ok) throw new Error("Erro ao buscar arquivos do projeto.");
        const files = await response.json();

        for (const file of files) {
            if (file.type === "file" && file.name.endsWith(".html")) {
                return file.path;
            } else if (file.type === "dir") {
                const htmlFile = await fetchHTMLFile(file.url);
                if (htmlFile) return htmlFile;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar arquivo HTML:", error);
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

document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Evento de pesquisa acionado!"); // Depuração

    const searchQuery = document.getElementById("search-input").value.toLowerCase();
    console.log("Pesquisa:", searchQuery); // Depuração

    let found = false;

    document.querySelectorAll(".project").forEach((project) => {
        const projectName = project.querySelector("h5").textContent.toLowerCase();
        if (projectName.includes(searchQuery)) {
            project.style.display = ""; // Mostra os projetos correspondentes
            found = true;
            console.log("Projeto encontrado:", projectName); // Depuração
        } else {
            project.style.display = "none"; // Esconde os que não correspondem
        }
    });

    if (!found) {
        Swal.fire({
            title: "Nenhum projeto encontrado",
            text: `Não foi possível encontrar um projeto relacionado a "${searchQuery}".`,
            icon: "warning",
            confirmButtonText: "Ok"
        });
    }
});

fetchProjects();