// Configuração do host da API
const API_HOST = 'http://192.168.248.250:8080';

// Listar todas as tarefas
async function listarTarefas() {
    const response = await fetch(`${API_HOST}/tasks`);
    const tarefas = await response.json();
    return tarefas;
}

// Buscar tarefa por ID
async function buscarTarefa(id) {
    const response = await fetch(`${API_HOST}/tasks/${id}`);
    if (response.ok) {
        const tarefa = await response.json();
        return tarefa;
    }
    return null;
}

// Criar nova tarefa
async function criarTarefa(tarefa) {
    const response = await fetch(`${API_HOST}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });
    const novaTarefa = await response.json();
    return novaTarefa;
}

// Atualizar tarefa
async function atualizarTarefa(id, tarefa) {
    const response = await fetch(`${API_HOST}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });
    const tarefaAtualizada = await response.json();
    return tarefaAtualizada;
}

// Deletar tarefa
async function deletarTarefa(id) {
    const response = await fetch(`${API_HOST}/tasks/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}
