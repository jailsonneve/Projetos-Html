let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');
// const cartFrete = document.getElementById('cart-items');
const checkoutModal = new bootstrap.Modal(document.getElementById('checkout-modal'));
const canceloutModal = new bootstrap.Modal(document.getElementById('cancel-modal'));

// Função para atualizar o carrinho
function updateCart() {
    // Atualiza o número de itens no carrinho
    cartBtn.innerText = `Carrinho (${cart.length})`;

    // Atualiza os itens no carrinho
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `${item.product} - R$ ${item.price}`;
        cartItemsDiv.appendChild(cartItem);
        total += item.price;
    });

    // Atualiza o total do carrinho
    cartTotalValue.innerText = (total.toFixed(2)+"").replace('.', ',');
}

// Função para adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));

        // Adiciona o produto ao carrinho
        cart.push({ product, price });

        // Atualiza o carrinho na interface
        updateCart();
    });
});

// Função para finalizar a compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        checkoutModal.show();   
    } else {
        alert("Adicione algo no Carrinho para Comprar!! ")
    }
});
document.getElementById('cancel-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        cart = [];
        cartItemsDiv.innerHTML="Por enquanto vazio, adicione algo poxa!!!"
        cartTotalValue.innerText = "0,00";

        cartBtn.innerText = `Carrinho (${cart.length})`;
        canceloutModal.show();
    } else {
        alert("Adicione algo no Carrinho para Cancelar!! ")
    }
})
// Modal para exibir os dados do CEP
const cepModal = new bootstrap.Modal(document.getElementById('cep-modal'));

// Função para buscar dados do CEP na API ViaCEP
function fetchCEPData() {
    const cep = document.getElementById('cepUser').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) { // Verifica se o CEP possui 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar o CEP.');
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    document.getElementById('cep-info').innerHTML = "<p>CEP não encontrado.</p>";
                } else {
                    // Exibe os dados no modal
                    document.getElementById('cep-info').innerHTML = `
                        <p><strong>CEP:</strong> ${data.cep}</p>
                        <p><strong>Rua:</strong> ${data.logradouro}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>Estado:</strong> ${data.uf}</p>
                    `;
                }
                cepModal.show(); // Exibe o modal
            })
            .catch(error => {
                document.getElementById('cep-info').innerHTML = "<p>Erro ao buscar o CEP.</p>";
                cepModal.show();
            });
    } else {
        alert("Digite um CEP válido com 8 dígitos.");
    }
}

// Evento para capturar o submit do formulário e buscar o CEP
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    fetchCEPData(); // Chama a função para buscar os dados do CEP
});
