const username = "jailsonneve"; // Seu username no GitHub
const repoName = "Projetos-Html"; // Nome do repositório
const folderName = "Projetos"; // Nome da pasta principal
const token = "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"; // Token de autenticação

async function fetchProjects() {
    const baseURL = `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}`;
    try {
    const response = await fetch(baseURL, {
        headers: {
        'Authorization': `Token ${token}"` // Cabeçalho de autenticação
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do repositório.");
    const projects = await response.json();

    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    for (const project of projects) {
        if (project.type === "dir") {
        const projectURL = `${baseURL}/${project.name}`;
        const htmlFile = await fetchHTMLFile(projectURL);

        if (htmlFile) {
            const githubLink = `https://github.com/${username}/${repoName}/tree/main/${folderName}/${project.name}`;
            const githubIoLink = `https://${username}.github.io/${repoName}/${folderName}/${project.name}/${htmlFile}`;

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
    const response = await fetch(projectURL, {
        headers: {
        'Authorization': `token ${token}` // Cabeçalho de autenticação
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar arquivos do projeto.");
    const files = await response.json();
    const htmlFile = files.find(file => file.name.endsWith(".html"));
    return htmlFile ? htmlFile.name : null;
    } catch (error) {
    console.error("Erro ao buscar arquivo HTML:", error);
    return null;
    }
}

window.showAlert = function(onde, projectName, link) {
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

fetchProjects();
