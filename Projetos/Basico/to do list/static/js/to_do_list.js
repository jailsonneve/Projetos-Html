document.addEventListener("DOMContentLoaded", () => {
    // Seletores dos elementos do HTML
    const entradaTarefa = document.getElementById("entradaTarefa");
    const entradaPrioridade = document.getElementById("entradaPrioridade");
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const listaTarefas = document.getElementById("listaTarefas");

    // Lista de tarefas armazenadas
    const tarefas = [];

    // Função para renderizar as tarefas na tela
    const renderizarTarefas = () => {
        listaTarefas.innerHTML = ""; // Limpa a lista
        tarefas.forEach((tarefa, indice) => {
            const li = document.createElement("li");
            li.className = `list-group-item ${obterClassePrioridade(tarefa.prioridade)}`;
            li.innerHTML = `
                <span>${tarefa.nome} (${capitalizarTexto(tarefa.prioridade)})</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2 botao-editar" data-indice="${indice}">Editar</button>
                    <button class="btn btn-sm btn-danger botao-remover" data-indice="${indice}">Remover</button>
                </div>
            `;
            listaTarefas.appendChild(li);
        });

        // Adiciona os eventos de clique após renderizar a lista
        document.querySelectorAll(".botao-editar").forEach((botao) => {
            botao.addEventListener("click", () => editarTarefa(botao.dataset.indice));
        });
        document.querySelectorAll(".botao-remover").forEach((botao) => {
            botao.addEventListener("click", () => removerTarefa(botao.dataset.indice));
        });
    };

    // Função para determinar a classe CSS com base na prioridade
    const obterClassePrioridade = (prioridade) => {
        if (prioridade === "alta") return "prioridade-alta";
        if (prioridade === "media") return "prioridade-media";
        return "prioridade-baixa";
    };

    // Função para capitalizar o texto
    const capitalizarTexto = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

    // Função para editar uma tarefa
    const editarTarefa = (indice) => {
        const tarefaAtual = tarefas[indice];
        const novoNome = prompt("Edite o nome da tarefa:", tarefaAtual.nome);

        if (novoNome !== null && novoNome.trim() !== "") {
            const novaPrioridade = prompt(
                "Edite a prioridade (alta, media, baixa):",
                tarefaAtual.prioridade
            );

            if (["alta", "media", "baixa"].includes(novaPrioridade)) {
                tarefaAtual.nome = novoNome.trim();
                tarefaAtual.prioridade = novaPrioridade;
                renderizarTarefas();
            } else {
                alert("Prioridade inválida. Tente novamente.");
            }
        } else {
            alert("O nome da tarefa não pode ser vazio.");
        }
    };

    // Função para remover uma tarefa
    const removerTarefa = (indice) => {
        tarefas.splice(indice, 1);
        renderizarTarefas();
    };

    // Função para adicionar uma nova tarefa
    botaoAdicionar.addEventListener("click", () => {
        const nomeTarefa = entradaTarefa.value.trim();
        const prioridade = entradaPrioridade.value;

        if (nomeTarefa) {
            tarefas.push({ nome: nomeTarefa, prioridade });
            entradaTarefa.value = ""; // Limpa o campo de entrada
            renderizarTarefas();
        } else {
            alert("Por favor, digite uma tarefa!");
        }
    });

    // Funções para ordenar as tarefas
    document.getElementById("ordenarAlfabetico").addEventListener("click", () => {
        tarefas.sort((a, b) => a.nome.localeCompare(b.nome));
        renderizarTarefas();
    });

    document.getElementById("ordenarPrioridadeAlta").addEventListener("click", () => {
        tarefas.sort((a, b) => valorPrioridade(b.prioridade) - valorPrioridade(a.prioridade));
        renderizarTarefas();
    });

    document.getElementById("ordenarPrioridadeBaixa").addEventListener("click", () => {
        tarefas.sort((a, b) => valorPrioridade(a.prioridade) - valorPrioridade(b.prioridade));
        renderizarTarefas();
    });

    // Função para obter o valor numérico da prioridade
    const valorPrioridade = (prioridade) => {
        if (prioridade === "alta") return 3;
        if (prioridade === "media") return 2;
        return 1;
    };
    
    // Adicionar evento ao botão de remover todas as tarefas
    document.getElementById("botaoRemoverTodas").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja remover todas as tarefas?")) {
            tarefas.length = 0; // Limpa o array de tarefas
            renderizarTarefas(); // Re-renderiza a lista vazia
        }
    });
});
