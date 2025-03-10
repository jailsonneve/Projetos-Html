const username = "jailsonneve"; // Seu username no GitHub
const repoName = "Projetos-Html"; // Nome do repositório
const folderName = "Projetos"; // Nome da pasta principal

async function fetchProjects() {
    const baseURL = `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}`;
    try {
        const response = await fetch(baseURL); // Requisição sem autenticação
        if (!response.ok) throw new Error("Erro ao buscar dados do repositório.");
        const projects = await response.json();

        const projectList = document.getElementById("project-list");
        projectList.innerHTML = "";

        for (const project of projects) {
            if (project.type === "dir") {
                const projectURL = project.url; // URL para explorar a pasta
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
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

async function fetchHTMLFile(projectURL) {
    try {
        const response = await fetch(projectURL); // Requisição sem autenticação
        if (!response.ok) throw new Error("Erro ao buscar arquivos do projeto.");
        const files = await response.json();

        for (const file of files) {
            if (file.type === "file" && file.name.endsWith(".html")) {
                return file.path; // Retorna o caminho completo do arquivo HTML
            } else if (file.type === "dir") {
                // Busca recursiva em subdiretórios
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
    event.preventDefault(); // Evita o comportamento padrão do formulário
    const searchQuery = document.getElementById("search-input").value.toLowerCase();

    const projects = document.querySelectorAll(".project");
    let found = false;

    projects.forEach((project) => {
        const projectName = project.querySelector("h5").textContent.toLowerCase();
        if (projectName.includes(searchQuery)) {
            project.style.display = "block"; // Mostra projetos correspondentes
            found = true;
        } else {
            project.style.display = "none"; // Esconde projetos não correspondentes
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