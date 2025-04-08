
export function updateSelectWidth(select, sizeMeasure) {
    const selectedOption = select.options[select.selectedIndex].text;
    sizeMeasure.textContent = selectedOption;
    select.style.width = `${sizeMeasure.offsetWidth + 46}px`;
}

document.getElementById("floatingSelect").addEventListener("change", function () {
    const valor = this.value;
    const pagamentos = {
        1: "form-pix",
        2: "form-credito",
        3: "form-debito",
        4: "form-boleto"
    };

    document.querySelectorAll(".formulario-pagamento").forEach(f => f.classList.add("d-none"));

    if (pagamentos[valor]) {
        document.getElementById(pagamentos[valor]).classList.remove("d-none");
    }

    if (valor === "2") {
        const temCartaoSalvo = true; // Simulação
        if (temCartaoSalvo) {
            document.getElementById("cartao-cadastrado").classList.remove("d-none");
            document.getElementById("novo-cartao").classList.add("d-none");
        } else {
            document.getElementById("cartao-cadastrado").classList.add("d-none");
            document.getElementById("novo-cartao").classList.remove("d-none");
        }
    }
});
export function copiarChave(){
    navigator.clipboard.writeText('123.456.789-00').then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Chave copiada!',
            text: 'A chave PIX foi copiada para a área de transferência.'
        });
    })
};
export function addCartao(){
    document.getElementById('novo-cartao').classList.toggle('d-none')
}