const API_PROXY_URL = "https://github-api-proxy-six.vercel.app/api/github";
const username = "jailsonneve";
const repoName = "Jogos";
const folderName = "Jogos Presentes";
const languages = ["Java", "JavaScript", "Python"];
const jogosList = document.getElementById("jogos-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const ignoredFolders = ["node_modules", "dist", ".git", ".vscode", "vendor", "__MACOSX"];

let allJogos = [];

// ----- Cache -----
function salvarCacheJogos(jogos) {
    const dados = { jogos, timestamp: Date.now() };
    localStorage.setItem('cacheJogos', JSON.stringify(dados));
}

function carregarCacheJogos() {
    const cache = localStorage.getItem('cacheJogos');
    if (!cache) return null;

    const dados = JSON.parse(cache);
    const agora = Date.now();
    const tempoLimite = 60 * 60 * 1000; // 1h

    return (agora - dados.timestamp < tempoLimite) ? dados.jogos : null;
}

// ----- Buscar jogos por nível -----
async function fetchJogosByLevel(level) {
    const path = `${folderName}/${level}`;
    const baseURL = `${API_PROXY_URL}?path=repos/${username}/${repoName}/contents/${path}`;
    try {
        const response = await fetch(baseURL);
        if (!response.ok) throw new Error(`Erro ao buscar jogos do nível ${level}. Status: ${response.status}`);
        const jogos = await response.json();
        return jogos.map(j => ({ ...j, _nivel: level }));
    } catch (e) {
        console.error(e);
        Swal.fire("Erro ao carregar jogos", e.message, "error");
        return [];
    }
}

// ----- Buscar todos os jogos -----
async function fetchAllJogos() {
    const jogosDoCache = carregarCacheJogos();
    if (jogosDoCache) {
        allJogos = jogosDoCache;
        return renderJogos(allJogos);
    }

    try {
        Swal.fire({ title: "Carregando jogos...", didOpen: () => Swal.showLoading() });

        const promises = languages.map(fetchJogosByLevel);
        const nested = await Promise.all(promises);
        allJogos = nested.flat();

        salvarCacheJogos(allJogos);
        Swal.close();

        renderJogos(allJogos);
    } catch (e) {
        Swal.close();
        Swal.fire("Erro geral", e.message, "error");
    }
}

// ----- Renderizar jogos -----
function renderJogos(jogos) {
    jogosList.innerHTML = "";

    for (const jogo of jogos) {
        if (jogo.type === "dir" && !ignoredFolders.includes(jogo.name)) {
            const htmlPath = `${folderName}/${jogo._nivel}/${jogo.name}/index.html`;
            const githubIoLink = `https://${username}.github.io/${repoName}/${htmlPath}`;
            const githubLink = `https://github.com/${username}/${repoName}/tree/main/${folderName}/${jogo._nivel}/${jogo.name}`;

            const jogoDiv = document.createElement("div");
            jogoDiv.className = "jogo";
            jogoDiv.innerHTML = `
                <div>
                    <h5>${jogo.name}</h5>
                    <p>Linguagem: ${jogo._nivel}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="window.open('${githubLink}', '_blank')"><i class="bi bi-eye"></i> Código Fonte</button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="window.open('${githubIoLink}', '_blank')"><i class="bi bi-box-arrow-up-right"></i> Jogar</button>
                    </div>
                </div>`;
            jogosList.appendChild(jogoDiv);
        }
    }
}

// ----- Filtro por busca -----
searchForm.addEventListener("input", function (event) {
    event.preventDefault();
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".jogo").forEach((jogo) => {
        const name = jogo.querySelector("h5").textContent.toLowerCase();
        jogo.style.display = name.includes(query) ? "" : "none";
    });
});

// ----- Filtro por categoria -----
document.getElementById("category-filter").addEventListener("change", function () {
    const selected = this.value;
    if (!selected) {
        renderJogos(allJogos);
    } else {
        renderJogos(allJogos.filter(j => j._nivel === selected));
    }
});

// ----- Inicialização -----
fetchAllJogos();
