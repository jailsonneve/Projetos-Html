function insert(num) {
    let numero = document.getElementById("resp").innerHTML;
    document.getElementById("resp").innerHTML = numero + num;
}

function clean() {
    document.getElementById("resp").innerHTML = "";
}

function back() {
    let resp = document.getElementById("resp").innerHTML;
    document.getElementById("resp").innerHTML = resp.substring(0, resp.length - 1);
}

function calc() {
    let resp = document.getElementById("resp").innerHTML;
    if (resp) {
        try {
            let resultado = eval(resp);
            resultado = arredondar(resultado, 1); // Arredondar para 1 casa decimal
            document.getElementById("resp").innerHTML = resultado;
        } catch (error) {
            document.getElementById("resp").innerHTML = "Erro";
        }
    } else {
        document.getElementById("resp").innerHTML = "0";
    }
}

function arredondar(num, casas) {
    const fator = Math.pow(10, casas);
    const inteiro = Math.floor(num * fator);
    const decimal = Math.floor((num * fator * 10) % 10);
    
    if (decimal === 5) {
        return inteiro / fator; // Arredondar para baixo
    } else {
        return Math.round(num * fator) / fator; // Arredondar normalmente
    }
}



function raiz() {
    let resp = document.getElementById("resp").innerHTML;
    try {
        let resultado = eval(resp);
        document.getElementById("resp").innerHTML = Math.sqrt(resultado);
    } catch (error) {
        document.getElementById("resp").innerHTML = "Erro";
    }
}

function porcentagem() {
    let resp = document.getElementById("resp").innerHTML;
    try {
        let resultado = eval(resp);
        document.getElementById("resp").innerHTML = resultado / 100;
    } catch (error) {
        document.getElementById("resp").innerHTML = "Erro";
    }
}
