document.addEventListener("DOMContentLoaded", () => {
    // Seletores e variáveis
    const entradaTarefa = document.getElementById("entradaTarefa");
    const entradaPrioridade = document.getElementById("entradaPrioridade");
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const botaoRemoverTodasConcluidas = document.getElementById("botaoRemoverConcluidas");
    const listaTarefas = document.getElementById("listaTarefas");
    const tarefas = [];

    // Função para renderizar tarefas
    const renderizarTarefas = () => {
        listaTarefas.innerHTML = "";
        tarefas.forEach((tarefa, indice) => {
            const li = document.createElement("li");
            li.className = `list-group-item ${obterClassePrioridade(tarefa.prioridade)} ${tarefa.concluida ? 'concluida' : ''}`;
            li.innerHTML = `
                <span>${tarefa.nome} (${capitalizarTexto(tarefa.prioridade)})</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2 botao-editar" data-indice="${indice}" ${tarefa.concluida ? 'disabled' : ''}>Editar</button>
                    <button class="btn btn-sm btn-primary me-2 botao-concluir" data-indice="${indice}" ${tarefa.concluida ? 'disabled' : ''}>Concluir</button>
                    <button class="btn btn-sm btn-danger botao-remover" data-indice="${indice}" ${tarefa.concluida ? 'disabled' : ''}>Remover</button>
                </div>
            `;
            listaTarefas.appendChild(li);
        });

        // Adicionando eventos aos botões
        document.querySelectorAll(".botao-editar").forEach((botao) => {
            botao.addEventListener("click", () => editarTarefa(botao.dataset.indice));
        });
        document.querySelectorAll(".botao-concluir").forEach((botao) =>{
            botao.addEventListener("click", () => concluirTarefa(botao.dataset.indice));
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
                <select id="swal-input-prioridade" class="swal2-input mt-4">
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

    const concluirTarefa = (indice) => {
        // Marca a tarefa como concluída
        tarefas[indice].concluida = true;
        renderizarTarefas();
        Swal.fire("Concluída!", "A tarefa foi marcada como concluída.", "success");
    };

    botaoAdicionar.addEventListener("click", () => {
        const nomeTarefa = entradaTarefa.value.trim();
        const prioridade = entradaPrioridade.value;

        if (nomeTarefa) {
            tarefas.push({ nome: nomeTarefa, prioridade, concluida: false });
            entradaTarefa.value = "";
            renderizarTarefas();
            Swal.fire("Adicionada!", "Sua tarefa foi adicionada.", "success");
        } else {
            Swal.fire("Erro", "Por favor, digite uma tarefa.", "error");
        }
    });

    document.getElementById("botaoRemoverTodas").addEventListener("click", () => {
        if (tarefas.length <= 0) {
            // Se não houver tarefas concluídas, exibe o alerta
            Swal.fire("Nenhuma tarefa", "Não há tarefas para remover.", "error");
        } else {
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
        }
    });

    // Função para remover as tarefas concluídas
    botaoRemoverTodasConcluidas.addEventListener("click", () => {
        // Verifique se há alguma tarefa concluída
        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida);

        if (tarefasConcluidas.length > 0) {
            // Se houver tarefas concluídas, remova-as
            const tarefasNaoConcluidas = tarefas.filter(tarefa => !tarefa.concluida);
            tarefas.length = 0; // Limpa todas as tarefas
            tarefas.push(...tarefasNaoConcluidas); // Adiciona de volta as tarefas não concluídas
            renderizarTarefas();
            Swal.fire("Tarefas Concluídas Removidas", "Todas as tarefas concluídas foram removidas.", "success");
        } else {
            // Se não houver tarefas concluídas, exibe o alerta
            Swal.fire("Nenhuma tarefa concluída", "Não há tarefas concluídas para remover.", "error");
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
});
