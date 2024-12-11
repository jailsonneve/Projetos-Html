// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrZgHlPVX59zM68ENmAyXogc3JmoTU5rE",
  authDomain: "tentando-eed5d.firebaseapp.com",
  projectId: "tentando-eed5d",
  storageBucket: "tentando-eed5d.appspot.com",
  messagingSenderId: "103578231381",
  appId: "1:103578231381:web:485a8e94f53e8087e92adc",
  measurementId: "G-V3BFLM3V3X",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  // Seletores e variáveis
  const entradaTarefa = document.getElementById("entradaTarefa");
  const entradaPrioridade = document.getElementById("entradaPrioridade");
  const botaoAdicionar = document.getElementById("botaoAdicionar");
  const botaoRemoverTodasConcluidas = document.getElementById("botaoRemoverConcluidas");
  const botaoRemoverTodas = document.getElementById("botaoRemoverTodas");
  const listaTarefas = document.getElementById("listaTarefas");
  const tarefas = [];

  const colecaoTarefas = collection(db, "tarefas");

  // Carregar tarefas do Firestore
  const carregarTarefas = async () => {
    const snapshot = await getDocs(colecaoTarefas);
    tarefas.length = 0;
    snapshot.forEach((doc) => {
      tarefas.push({ id: doc.id, ...doc.data() });
    });
    renderizarTarefas();
  };

  // Função para renderizar tarefas
  const renderizarTarefas = () => {
    listaTarefas.innerHTML = "";
    tarefas.forEach((tarefa, indice) => {
      const li = document.createElement("li");
      li.className = `list-group-item ${obterClassePrioridade(
        tarefa.prioridade
      )} ${tarefa.concluida ? "concluida" : ""}`;
      li.innerHTML = `
        <span>${tarefa.nome} (${capitalizarTexto(tarefa.prioridade)})</span>
        <div>
          <button class="btn btn-sm btn-warning me-2 botao-editar" data-id="${tarefa.id
        }" ${tarefa.concluida ? "disabled" : ""}>Editar</button>
          <button class="btn btn-sm btn-primary me-2 botao-concluir" data-id="${tarefa.id
        }" ${tarefa.concluida ? "disabled" : ""}>Concluir</button>
          <button class="btn btn-sm btn-danger botao-remover" data-id="${tarefa.id
        }" ${tarefa.concluida ? "disabled" : ""}>Remover</button>
        </div>
      `;
      listaTarefas.appendChild(li);
    });

    // Adicionar eventos aos botões
    document.querySelectorAll(".botao-editar").forEach((botao) => {
      botao.addEventListener("click", () => editarTarefa(botao.dataset.id));
    });
    document.querySelectorAll(".botao-concluir").forEach((botao) => {
      botao.addEventListener("click", () => concluirTarefa(botao.dataset.id));
    });
    document.querySelectorAll(".botao-remover").forEach((botao) => {
      botao.addEventListener("click", () => removerTarefa(botao.dataset.id));
    });
  };

  const obterClassePrioridade = (prioridade) => {
    if (prioridade === "alta") return "prioridade-alta";
    if (prioridade === "media") return "prioridade-media";
    return "prioridade-baixa";
  };

  const capitalizarTexto = (texto) => {
    if (!texto || typeof texto !== "string") return ""; // Verificação de texto válido
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  const editarTarefa = async (id) => {
    const tarefaAtual = tarefas.find((tarefa) => tarefa.id === id);
    const { value: formValues } = await Swal.fire({
      title: "Edite a tarefa",
      html: `
        <input id="swal-input-nome" class="swal2-input" placeholder="Nome" value="${tarefaAtual.nome
        }">
        <select id="swal-input-prioridade" class="swal2-input mt-4">
          <option value="alta" ${tarefaAtual.prioridade === "alta" ? "selected" : ""
        }>Alta</option>
          <option value="media" ${tarefaAtual.prioridade === "media" ? "selected" : ""
        }>Média</option>
          <option value="baixa" ${tarefaAtual.prioridade === "baixa" ? "selected" : ""
        }>Baixa</option>
        </select>
      `,
      preConfirm: () => {
        const nome = document.getElementById("swal-input-nome").value.trim();
        const prioridade = document.getElementById(
          "swal-input-prioridade"
        ).value;

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
    });

    if (formValues) {
      await updateDoc(doc(db, "tarefas", id), {
        nome: formValues.nome,
        prioridade: formValues.prioridade,
      });
      Swal.fire("Alterada", "A tarefa foi alterada com sucesso.", "success");
      carregarTarefas();
    }
  };

  const removerTarefa = async (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você realmente deseja remover esta tarefa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "tarefas", id));
        Swal.fire("Removida!", "A tarefa foi removida.", "success");
        carregarTarefas();
      }
    });
  };

  const concluirTarefa = async (id) => {
    const tarefaAtual = tarefas.find((tarefa) => tarefa.id === id);
    await updateDoc(doc(db, "tarefas", id), { concluida: true });
    Swal.fire("Concluída!", "A tarefa foi marcada como concluída.", "success");
    carregarTarefas();
  };

  botaoAdicionar.addEventListener("click", async () => {
    const nomeTarefa = entradaTarefa.value.trim();
    const prioridade = entradaPrioridade.value || "baixa"; // Valor padrão para evitar 'undefined'

    if (nomeTarefa) {
      await addDoc(colecaoTarefas, {
        nome: nomeTarefa,
        prioridade,
        concluida: false,
      });
      entradaTarefa.value = "";
      Swal.fire("Adicionada!", "Sua tarefa foi adicionada com sucesso.", "success");
      carregarTarefas();
    } else {
      Swal.fire("Erro", "Por favor, digite uma tarefa.", "error");
    }
  });

  botaoRemoverTodasConcluidas.addEventListener("click", async () => {
    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida);
    if (tarefasConcluidas.length <= 0) {
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          for (const tarefa of tarefasConcluidas) {
            await deleteDoc(doc(db, "tarefas", tarefa.id));
          }
          Swal.fire("Todas Removidas!", "Todas as tarefas concluidas foram removidas.", "success");
          carregarTarefas();
        }
      });
    }
  });

  botaoRemoverTodas.addEventListener("click", async () => {
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          for (const tarefa of tarefas) {
            await deleteDoc(doc(db, "tarefas", tarefa.id));
          }
          Swal.fire("Todas Removidas!", "Todas as tarefas foram removidas!", "success");
          carregarTarefas();
        }
      });
    }
  })

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

  const valorPrioridade = (prioridade) => {
    if (prioridade === "alta") return 3;
    if (prioridade === "media") return 2;
    return 1;
  };

  // Inicializar carregamento das tarefas
  carregarTarefas();
});
