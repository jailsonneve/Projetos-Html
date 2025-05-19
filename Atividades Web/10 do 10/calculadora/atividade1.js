// Função para inserir um número ou operador na tela da calculadora
function insert(num) {
    // Adiciona o número ou operador ao conteúdo atual da tela
    let numero = document.getElementById("resp").innerHTML;
    document.getElementById("resp").innerHTML = numero + num;
}

// Função para limpar a tela da calculadora
function clean() {
    // Remove todo o conteúdo da tela
    document.getElementById("resp").innerHTML = "";
}

// Função para apagar o último caractere da tela
function back() {
    // Remove o último caractere do conteúdo atual da tela
    let resp = document.getElementById("resp").innerHTML;
    document.getElementById("resp").innerHTML = resp.substring(0, resp.length - 1);
}

// Função para calcular a expressão matemática na tela
function calc() {
    // Avalia a expressão matemática e exibe o resultado arredondado
    let resp = document.getElementById("resp").innerHTML;
    if (resp) {
        try {
            let resultado = eval(resp);
            resultado = arredondar(resultado, 2); // Arredonda para 2 casa decimal
            document.getElementById("resp").innerHTML = resultado;
        } catch (error) {
            document.getElementById("resp").innerHTML = "Erro";
        }
    } else {
        document.getElementById("resp").innerHTML = "0";
    }
}

// Função para arredondar um número para um número específico de casas decimais
function arredondar(num, casas) {
    // Arredonda o número para o número de casas decimais especificado
    const fator = Math.pow(10, casas);
    const inteiro = Math.floor(num * fator);
    const decimal = Math.floor((num * fator * 10) % 10);
    
    // Se o dígito após o que queremos arredondar for 5, a função simplesmente retorna inteiro / fator, que é o valor arredondado para baixo (sem considerar o arredondamento para cima).
    // Se não for 5, a função utiliza Math.round para arredondar corretamente e retorna o resultado dividido pelo fator para reposicionar a vírgula decimal.

    if (decimal === 5) {
        return inteiro / fator;
    } else {
        return Math.round(num * fator) / fator; 
    }
}

// Função para calcular a raiz quadrada da expressão na tela
function raiz() {
    // Avalia a expressão e exibe a raiz quadrada do resultado
    let resp = document.getElementById("resp").innerHTML;
    try {
        let resultado = eval(resp);
        document.getElementById("resp").innerHTML = Math.sqrt(resultado);
    } catch (error) {
        document.getElementById("resp").innerHTML = "Erro";
    }
}

// Função para calcular a porcentagem da expressão na tela
function porcentagem() {
    // Avalia a expressão e exibe o resultado como porcentagem
    let resp = document.getElementById("resp").innerHTML;
    try {
        let resultado = eval(resp);
        document.getElementById("resp").innerHTML = resultado / 100;
    } catch (error) {
        document.getElementById("resp").innerHTML = "Erro";
    }
}