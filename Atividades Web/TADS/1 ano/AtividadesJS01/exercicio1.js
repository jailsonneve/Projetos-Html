function mudarTexto() {
    const nome = document.getElementById("inNome").value;
    let pMessage = document.getElementById("message");
    document.getElementById("inNome").value = "";
    pMessage.innerText = `Olá ${nome}`;
}

function mudarEstilo() {
    const pMessage = document.getElementById("message");
    pMessage.style.color = "blue";
    pMessage.style.fontSize = "32px";
}