const saida = document.getElementById('resultado');
function gerarTabuada() {
    const num = Number(document.getElementById('numero').value);
    saida.innerHTML = '';

    if (!isNaN(num)) {
        document.getElementById('numero').value = "";
        saida.innerHTML += `<h2>Tabuada de ${num}</h2>`;
        for (let i = 1; i <= 10; i++) {
            saida.innerHTML += `${num} x ${i} = ${num * i}<br>`;
        }
        saida.style.display = 'inline-block';
    } else {
        saida.style.display = 'inline-block';
        saida.innerHTML = 'Por favor, insira um número válido.';
    }
}
function limpar() {
    saida.style.display = 'none';
    document.getElementById('resultado').innerHTML = '';
}