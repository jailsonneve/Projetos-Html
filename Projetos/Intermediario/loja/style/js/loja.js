let carrinho = [];
let pegouCEP = false;
const botaoCarrinho = document.getElementById('cart-btn');
const itensCarrinhoDiv = document.getElementById('cart-items');
const totalCarrinhoValor = document.getElementById('cart-total-value');
const modalFinalizarCompra = new bootstrap.Modal(document.getElementById('checkout-modal'));
const modalCancelarCompra = new bootstrap.Modal(document.getElementById('cancel-modal'));

// Função para atualizar o carrinho
function atualizarCarrinho() {
    botaoCarrinho.innerText = `Carrinho (${carrinho.length})`;
    itensCarrinhoDiv.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('cart-item');
        itemCarrinho.innerHTML = `${item.produto} - R$ ${item.preco}`;
        itensCarrinhoDiv.appendChild(itemCarrinho);
        total += item.preco;
    });

    totalCarrinhoValor.innerText = (total.toFixed(2) + "").replace('.', ',');
}

// Função para adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(botao => {
    botao.addEventListener('click', (evento) => {
        const produto = evento.target.getAttribute('data-product');
        const preco = parseFloat(evento.target.getAttribute('data-price'));

        carrinho.push({ produto, preco });

        atualizarCarrinho();
    });
});

// Função para finalizar a compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    const cep = document.getElementById('cepUser').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (carrinho.length > 0 && pegouCEP == true) {
        modalFinalizarCompra.show();   
    }else if (cep == '' || pegouCEP == false) {	
        alert("Cadastre seu Endereço!! ");
    } else {
        alert("Adicione algo no Carrinho para Comprar!! ");
    }
});

// Função para cancelar a compra
document.getElementById('cancel-btn').addEventListener('click', () => {
    if (carrinho.length > 0) {
        carrinho = [];
        itensCarrinhoDiv.innerHTML = "Por enquanto vazio &#128532;, adicione algo, poxa &#129402;";
        totalCarrinhoValor.innerText = "0,00";

        botaoCarrinho.innerText = `Carrinho (${carrinho.length})`;
        modalCancelarCompra.show();
    } else {
        alert("Adicione algo no Carrinho para Cancelar!! ");
    }
});

const modalCEP = new bootstrap.Modal(document.getElementById('cep-modal'));

// Função para buscar dados do CEP na API ViaCEP
function buscarDadosCEP() {
    const cep = document.getElementById('cepUser').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) { 
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => {
                if (!resposta.ok) throw new Error('Erro ao buscar o CEP.');
                return resposta.json();
            })
            .then(dados => {
                if (dados.erro) {
                    document.getElementById('cep-info').innerHTML = "<p>CEP não encontrado.</p>";
                } else {
                    document.getElementById('cep-info').innerHTML = `
                        <p><strong>CEP:</strong> ${dados.cep}</p>
                        <p><strong>Rua:</strong> ${dados.logradouro}</p>
                        <p><strong>Bairro:</strong> ${dados.bairro}</p>
                        <p><strong>Cidade:</strong> ${dados.localidade}</p>
                        <p><strong>Estado:</strong> ${dados.uf}</p>
                    `;
                }
                modalCEP.show(); 
            })
            .catch(erro => {
                document.getElementById('cep-info').innerHTML = "<p>Erro ao buscar o CEP.</p>";
                modalCEP.show();
            });
    } else {
        alert("Digite um CEP válido com 8 dígitos.");
    }
}

// Evento para capturar o submit do formulário e buscar o CEP
document.querySelector('form').addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscarDadosCEP();
});

document.getElementById('btnConfirmar').addEventListener('click', (evento) =>{
    evento.preventDefault();
    pegouCEP = true; 
})