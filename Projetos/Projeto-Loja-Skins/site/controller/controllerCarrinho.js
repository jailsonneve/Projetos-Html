import { updateSelectWidth } from "../view/viewCarrinho.js";
const select = document.getElementById("dynamic-select");
const sizeMeasure = document.getElementById("size-measure");
select.addEventListener("change", updateSelectW);
function updateSelectW() {
  updateSelectWidth(select, sizeMeasure);
}
function verCarrinho() {
  if (carrinho.length === 0) {
    Swal.fire("Carrinho vazio", "Nenhum item adicionado ainda.", "info");
    return;
  }

  let html = "<ul style='text-align:left;'>";
  let total = 0;

  carrinho.forEach(item => {
    html += `<li><strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2)}</li>`;
    total += item.preco;
  });

  html += "</ul>";

  Swal.fire({
    title: "Itens no Carrinho",
    html: html + `<hr><strong>Total: R$ ${total.toFixed(2)}</strong>`,
    confirmButtonText: "Fechar"
  });
}
updateSelectW();