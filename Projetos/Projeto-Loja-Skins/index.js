const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function criarEstrutura() {
  // Exemplo de criação de um usuário
  const usuarioRef = await db.collection("usuarios").add({
    email: "exemplo@email.com",
    telefone: "11999999999",
    redeSocial: "@exemplo",
    senha: "senhaSegura123",
    sobreMim: "Sou um usuário exemplo",
    tipoUser: 1,
    img: "url/imagem.jpg",
    endereco: "Rua Exemplo, 123",
    ultLogin: new Date()
  });

  // Produto
  const produtoRef = await db.collection("produtos").add({
    nomeProduto: "Sabonete Natural",
    fornecedor: "Fornecedor X",
    numVendas: 0,
    estoque: 100,
    descricao: "Sabonete artesanal com lavanda",
    preco: 25.50,
    img: "url/imagemProduto.jpg",
    idCategoria: "cat123"
  });

  // Categoria
  await db.collection("categorias").doc("cat123").set({
    categoria: "Higiene Pessoal",
    idProduto: produtoRef.id
  });

  // Comentário
  await db.collection("comentarios").add({
    texto: "Ótimo produto!",
    idUsuario: usuarioRef.id,
    idProduto: produtoRef.id
  });

  // Avaliação
  await db.collection("avaliacoes").add({
    estrelas: 5,
    idUsuario: usuarioRef.id,
    idProduto: produtoRef.id
  });

  // Carrinho
  const carrinhoRef = await db.collection("carrinhos").add({
    idUsuarios: usuarioRef.id,
  });

  // Item no Carrinho
  await db.collection("itens").add({
    idProduto: produtoRef.id,
    quantidadeProdutos: 2,
    idItens: carrinhoRef.id
  });

  // Pedido
  const pedidoRef = await db.collection("pedidos").add({
    idUsuario: usuarioRef.id,
    idProdutos: produtoRef.id,
    dataPedido: new Date(),
    total: 51.00,
    status: "Em andamento"
  });

  // PedidoItens
  await db.collection("pedidosItens").add({
    idProdutos: produtoRef.id,
    idPedidosItens: pedidoRef.id,
    quantidadeItens: 2,
    precoUnitario: 25.50
  });

  // Agendamento
  await db.collection("agendamentos").add({
    idUsuario: usuarioRef.id,
    dataAgendamento: new Date("2025-04-20"),
    servico: "Consultoria de Skincare"
  });

  console.log("Banco de dados Firestore inicializado com dados de exemplo.");
}

criarEstrutura().catch(console.error);