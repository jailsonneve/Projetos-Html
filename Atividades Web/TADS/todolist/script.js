
  // Vetor de Tarefas
  let tarefas = [];
  // Filtro inicial da página
  let filtroAtual = 'todas';

  // Função para armazenar o JSON no localStorage
  function salvarTarefas() {
    // setItem usado para setar o JSON em uma "partição" chamada 'tarefas'
    // JSON.stringify é usado para transformar a tarefa em string JSON
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // Função para carregar o JSON do localStorage para uma constante, logo após atuliza a lista de tarefas
  function carregarTarefas() {
    const armazenadas = localStorage.getItem('tarefas');
    if (armazenadas) tarefas = JSON.parse(armazenadas);
    atualizarLista();
  }

  // Função para adicionar uma tarefa na lista, 
  function adicionarTarefa() {
    // Pega o elemento com o id 'entradaTarefa' no caso o input e atribui a constante
    const entrada = document.getElementById('entradaTarefa');
    // Pega o valor na entrada e retira os espaços no inicio e fim
    const texto = entrada.value.trim();
    // Retorna null se não tiver texto
    if (!texto) return;
    // Armazena a tarefa dentro de um vetor
    tarefas.push({ texto, concluida: false });
    // Salva no localStorage, Atuliza a lista de tarefa, Limpa o input e Deixa o cursor pronto pra digitar no input
    salvarTarefas();
    atualizarLista();
    entrada.value = '';
    entrada.focus();
  }

  // Renderiza as tarefas 
  function exibirTarefa(tarefa, indice) {
    // Cria o li, adicionando as classes do bootstrap para responsividade e elegancia; seta um atributo chamado 'data-id' onde vai ficar armazenado o indice da tarefa
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center fade-in';
    li.setAttribute('data-id', indice);
    if (tarefa.concluida) {
      li.classList.add('concluida2');
    }

    // Cria um span para armazenar o nome/descrição da tarefa, define que quando o cursor passar por cima vai altera-lo para 'pointer' e caso a tarefa estiver concluida é adicionado a classe 'concluida'
    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    span.style.cursor = 'pointer';
    if (tarefa.concluida) span.classList.add('concluida');

    // Quando o span for clicado ele inverte o boolean da tarefa, ou seja, se antes estava concluida agora está pendente, se antes estava pendente agora está concluida 
    span.onclick = () => {
      tarefas[indice].concluida = !tarefas[indice].concluida;
      // Salva e Atuliza a lista de tarefas
      salvarTarefas();
      atualizarLista();
    };

    // Quando houver um doubleClick no span é possivel editar a tarefa, definindo outro nome a ela
    span.ondblclick = () => {
      const input = document.createElement('input');
      input.className = 'editando';
      input.value = tarefa.texto;

      // Retira o foco do input, atribui o novo texto em uma constante removendo os espaços no inicio e fim
      input.onblur = () => {
        const novoTexto = input.value.trim();
        // Verifica se o valor é válido, reescreve a tarefa antiga, salva e atuliza a lista
        if (novoTexto !== '') {
          tarefas[indice].texto = novoTexto;
          salvarTarefas();
          atualizarLista();
        }
      };

      // Quando clicado o enter o input perde o foco
      input.onkeypress = (e) => {
        if (e.key === 'Enter') input.blur();
      };

      // Substitui o elemento filho por outro, nesse caso substitui o nome 
      li.replaceChild(input, span);
      // O mouse vai para o input ganhando foco
      input.focus();
    };

    // Botão para remover as tarefas
    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'btn btn-danger btn-sm';
    botaoRemover.textContent = 'Remover';
    // Função para remover a tarefa, passando a animação de saida, espera um tempo e retira do vetor pegando pelo indice; salve e atualiza a lista
    botaoRemover.onclick = () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        tarefas.splice(indice, 1);
        salvarTarefas();
        atualizarLista();
      }, 300);
    };

    // Adiciona o span onde vai o nome/descrição da atividade e o botao remover tarefa como filho do li
    li.appendChild(span);
    li.appendChild(botaoRemover);
    // Adiciona o li como filho da lista de tarefas
    document.getElementById('listaTarefas').appendChild(li);
  }

  // Atuliza a lista de tarefas
  function atualizarLista() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filtros .btn[onclick*="${filtroAtual}"]`).classList.add('active');

    tarefas.forEach((tarefa, indice) => {
      const mostrar =
        filtroAtual === 'todas' ||
        (filtroAtual === 'pendentes' && !tarefa.concluida) ||
        (filtroAtual === 'concluidas' && tarefa.concluida);
      if (mostrar) exibirTarefa(tarefa, indice);
    });

    // Reativar drag and drop após renderização
    Sortable.create(lista, {
      animation: 150,
      onEnd: function (evt) {
        const [moved] = tarefas.splice(evt.oldIndex, 1);
        tarefas.splice(evt.newIndex, 0, moved);
        salvarTarefas();
        atualizarLista();
      }
    });
  }

  // Função para limpar as concluidas, usa um filter para pegar apenas os itens que nao está concluidos
  function limparConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    salvarTarefas();
    atualizarLista();
  }

  // Quando o enter é pressionado ele adiciona a tarefa a lista
  document.getElementById('entradaTarefa').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') adicionarTarefa();
  });

  // Quando a pagina é recarregada carrega as tarefas do localStorage
  window.onload = carregarTarefas;