document.addEventListener("DOMContentLoaded", () => {
    // Seletores e variáveis
    const entradaTarefa = document.getElementById("entradaTarefa");
    const entradaPrioridade = document.getElementById("entradaPrioridade");
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const listaTarefas = document.getElementById("listaTarefas");
    const tarefas = [];

    // Função para renderizar tarefas
    const renderizarTarefas = () => {
        listaTarefas.innerHTML = "";
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

        // Adicionando eventos aos botões
        document.querySelectorAll(".botao-editar").forEach((botao) => {
            botao.addEventListener("click", () => editarTarefa(botao.dataset.indice));
        });
        document.querySelectorAll(".botao-remover").forEach((botao) => {
            botao.addEventListener("click", () => removerTarefa(botao.dataset.indice));
        });
    };

    const obterClassePrioridade = (prioridade) => {
        if (prioridade === "alta") return "prioridade-alta";
        if (prioridade === "media") return "prioridade-media";
        return "prioridade-baixa";
    };

    const capitalizarTexto = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

    const editarTarefa = (indice) => {
        const tarefaAtual = tarefas[indice];
        Swal.fire({
            title: "Edite a tarefa",
            html: `
                <input id="swal-input-nome" class="swal2-input" placeholder="Nome" value="${tarefaAtual.nome}">
                <select id="swal-input-prioridade" class="swal2-input">
                    <option value="alta" ${tarefaAtual.prioridade === "alta" ? "selected" : ""}>Alta</option>
                    <option value="media" ${tarefaAtual.prioridade === "media" ? "selected" : ""}>Média</option>
                    <option value="baixa" ${tarefaAtual.prioridade === "baixa" ? "selected" : ""}>Baixa</option>
                </select>
            `,
            preConfirm: () => {
                const nome = document.getElementById("swal-input-nome").value.trim();
                const prioridade = document.getElementById("swal-input-prioridade").value;

                if (!nome) {
                    Swal.showValidationMessage("O nome da tarefa não pode ser vazio.");
                    return false;
                }

                if (!["alta", "media", "baixa"].includes(prioridade)) {
                    Swal.showValidationMessage("Prioridade inválida.");
                    return false;
                }

                return { nome, prioridade };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                tarefaAtual.nome = result.value.nome;
                tarefaAtual.prioridade = result.value.prioridade;
                renderizarTarefas();
            }
        });
    };

    const removerTarefa = (indice) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você realmente deseja remover esta tarefa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, remover",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                tarefas.splice(indice, 1);
                renderizarTarefas();
                Swal.fire("Removida!", "A tarefa foi removida.", "success");
            }
        });
    };

    botaoAdicionar.addEventListener("click", () => {
        const nomeTarefa = entradaTarefa.value.trim();
        const prioridade = entradaPrioridade.value;

        if (nomeTarefa) {
            tarefas.push({ nome: nomeTarefa, prioridade });
            entradaTarefa.value = "";
            renderizarTarefas();
            Swal.fire("Adicionada!", "Sua tarefa foi adicionada.", "success");
        } else {
            Swal.fire("Erro", "Por favor, digite uma tarefa.", "error");
        }
    });

    document.getElementById("botaoRemoverTodas").addEventListener("click", () => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você realmente deseja remover todas as tarefas?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, remover todas",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                tarefas.length = 0;
                renderizarTarefas();
                Swal.fire("Todas Removidas!", "Todas as tarefas foram removidas.", "success");
            }
        });
    });
});