
const db = firebase.firestore();
const produtosContainer = document.getElementById("produtos-container");
const carrinho = [];

const produtos = [
  { id: "skin1", nome: "AK-47 Neon Rider", preco: 120, imagem: "https://www.mercadoeeventos.com.br/wp-content/uploads/2022/10/Embratur-Brasil-ultrapassa-marca-de-1-milhao-de-turistas-estrangeiros-recebidos-pela-primeira-vez-desde-2020.png" },
  { id: "skin2", nome: "AWP Asiimov", preco: 250, imagem: "https://wallpapers.com/images/featured/imagens-muito-legais-40it5k0y58kfe71d.jpg" },
  { id: "skin3", nome: "M4A4 Howl", preco: 300, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojpDWvjn_NkQfNJ1zsO-6rLY5NWsdWdpAMw&s" }
];

function renderProdutos() {
  produtosContainer.innerHTML = "";
  produtos.forEach(prod => {
    console.log(prod)
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img src="${prod.imagem}" class="card-img-top" alt="${prod.nome}" height="200">
        <div class="card-body text-center">
          <h5 class="card-title">${prod.nome}</h5>
          <p class="card-text">R$ ${prod.preco},00</p>
          <button class="btn btn-success mb-2" onclick="addCarrinho('${prod.id}')">
            <i class="bi bi-cart-plus"></i> Comprar
          </button>
          <button class="btn btn-warning" onclick="avaliar('${prod.id}')">
            <i class="bi bi-star"></i> Avaliar
          </button>
        </div>
      </div>
    `;
    produtosContainer.appendChild(card);
  });
}

function avaliar(id) {
  window.location.href = `agendamento.html?produto=${id}`;
}

renderProdutos();

let usuarioAtual = null;

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    usuarioAtual = user;
    carregarCarrinho();
  }
});

function carregarCarrinho() {
  db.collection("carrinhos").doc(usuarioAtual.uid).get()
    .then(doc => {
      if (doc.exists) {
        carrinho = doc.data().itens || [];
        atualizarCarrinhoNaTela();
      }
    });
}  

function salvarCarrinho() {
  db.collection("carrinhos").doc(usuarioAtual.uid).set({
    itens: carrinho,
    atualizadoEm: new Date()
  });
}

function addCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  salvarCarrinho();
  Swal.fire("Adicionado!", `${produto.nome} foi adicionado ao carrinho.`, "success");
  atualizarCarrinhoNaTela();
}

function atualizarCarrinhoNaTela() {
  document.getElementById("cart-count").innerText = `Carrinho (${carrinho.length})`;
}
