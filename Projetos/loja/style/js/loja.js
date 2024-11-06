let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');
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
    cartTotalValue.innerText = total.toFixed(2);
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
        cartItemsDiv.innerHTML=""
        cartBtn.innerText = `Carrinho (${cart.length})`;
        canceloutModal.show();
    } else {
        alert("Adicione algo no Carrinho para Cancelar!! ")
    }
})