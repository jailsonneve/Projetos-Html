import { getItens, adicionarCarrinho, avaliarItem, calcularEstrelas, entrarComGoogle, fazerCadastro, fazerLogin } from "../model/modelIndex.js";
export function gerarItens() {
    const container = document.getElementById("itensContainer");
    container.innerHTML = "";

    const itensOrdenados = [...getItens()].sort((a, b) => b.numVendas - a.numVendas);

    const grupoTamanho = 3;
    const totalSlides = Math.ceil(itensOrdenados.length / grupoTamanho);

    for (let i = 0; i < totalSlides; i++) {
        const grupo = itensOrdenados.slice(i * grupoTamanho, (i + 1) * grupoTamanho);

        const slideAtivo = i === 0 ? "active" : "";

        const slideHTML = `
            <div class="carousel-item ${slideAtivo}">
                <div class="row">
                    ${grupo.map(item => `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 text-center shadow-sm">
                                <img src="${item.imagem}" class="card-img-top" alt="${item.nome}">
                                <div class="card-body">
                                    <h5 class="card-title texto">${item.nome}</h5>
                                    <p class="conteudo card-text text-muted">${item.descricao}</p>
                                    <p class="text-success fw-semibold fs-5">R$ ${item.preco.toFixed(2)} <span class="text-warning fw-semibold fs-5">${calcularEstrelas(item)}</span></p>
                                    <div class="comentarios">
                                        ${mostrarUltimosComentarios(item)}
                                    </div>
                                    <button id="btnAvaliar" class="btn btn-warning"><i class="bi bi-star-fill"></i> Avaliar</button>
                                    <button id="btnAddCarrinnho" class="btn btn-primary ms-1"><i class="bi bi-cart-plus"></i> Adicionar ao Carrinho</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML += slideHTML;
        document.querySelectorAll("#btnAvaliar").forEach((button, index) => { 
            button.addEventListener("click", () => {
                avaliarItem(itensOrdenados[index].id);
            });
        });
        document.querySelectorAll("#btnAddCarrinnho").forEach((button, index) =>{
            button.addEventListener("click", () =>{
                adicionarCarrinho(itensOrdenados[index].id);
            });
        });
    }
}         
function mostrarUltimosComentarios(item) {
    const ultimosComentarios = item.comentarios.slice(-5);

    if (ultimosComentarios.length === 0) {
        return "Nenhum comentário ainda.";
    }

    return ultimosComentarios.map((avaliacao) => {
        let estrelasHTML = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= avaliacao.nota) {
                estrelasHTML += '★';
            } else {
                estrelasHTML += '☆';
            }
        }

        return `<p class="text-black">User: ${avaliacao.comentario} (${estrelasHTML})</p>`;
    }).join('');
}

const select = document.getElementById("dynamic-select");
const sizeMeasure = document.getElementById("size-measure");

export function updateSelectWidth() {
    const selectedOption = select.options[select.selectedIndex].text;
    sizeMeasure.textContent = selectedOption;

    select.style.width = `${sizeMeasure.offsetWidth + 46}px`;
}

select.addEventListener("change", updateSelectWidth);
updateSelectWidth();