let tarefas = [];
let filtroAtual = 'todas';

// Carregar do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  const dadosSalvos = localStorage.getItem("tarefasToDoList");
  if (dadosSalvos) {
    tarefas = JSON.parse(dadosSalvos);
  }
  atualizarLista();
});

function salvarNoLocalStorage() {
  localStorage.setItem("tarefasToDoList", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const entrada = document.getElementById("entradaTarefa");
  const texto = entrada.value.trim();

  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  tarefas.push({
    texto: texto,
    concluida: false
  });

  entrada.value = "";
  salvarNoLocalStorage();
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  tarefas
    .filter(tarefa => {
      if (filtroAtual === 'todas') return true;
      if (filtroAtual === 'pendentes') return !tarefa.concluida;
      if (filtroAtual === 'concluidas') return tarefa.concluida;
    })
    .forEach((tarefa, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center fade-in";

      const divEsquerda = document.createElement("div");
      divEsquerda.className = "d-flex align-items-center";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
      checkbox.checked = tarefa.concluida;
      checkbox.addEventListener("change", () => {
        tarefa.concluida = checkbox.checked;
        salvarNoLocalStorage();
        atualizarLista();
      });

      const span = document.createElement("span");
      span.textContent = tarefa.texto;
      if (tarefa.concluida) span.classList.add("concluida");

      divEsquerda.appendChild(checkbox);
      divEsquerda.appendChild(span);

      const divBotoes = document.createElement("div");

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.className = "btn btn-warning btn-sm me-2";
      btnEditar.onclick = () => editarTarefa(index);

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.className = "btn btn-danger btn-sm";
      btnRemover.onclick = () => removerTarefa(index, li);

      divBotoes.appendChild(btnEditar);
      divBotoes.appendChild(btnRemover);

      li.appendChild(divEsquerda);
      li.appendChild(divBotoes);

      lista.appendChild(li);
    });

  document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filtros .btn[onclick*="${filtroAtual}"]`)?.classList.add('active');
}

function editarTarefa(index) {
  const novoTexto = prompt("Edite a tarefa:", tarefas[index].texto);
  if (novoTexto && novoTexto.trim() !== "") {
    tarefas[index].texto = novoTexto.trim();
    salvarNoLocalStorage();
    atualizarLista();
  }
}

function removerTarefa(index, elemento) {
  elemento.classList.add("fade-out");
  setTimeout(() => {
    tarefas.splice(index, 1);
    salvarNoLocalStorage();
    atualizarLista();
  }, 300);
}

function limparConcluidas() {
  tarefas = tarefas.filter(tarefa => !tarefa.concluida);
  salvarNoLocalStorage();
  atualizarLista();
}
