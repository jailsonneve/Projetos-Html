let transacoes = [
    { id: 1, descricao: "Salário", valor: 3500.00, tipo: "Receita", data: "2025-11-01" },
    { id: 2, descricao: "Aluguel", valor: 1200.00, tipo: "Despesa", data: "2025-11-05" },
    { id: 3, descricao: "IPTU", valor: 800.00, tipo: "Despesa", data: "2025-11-10" },
    { id: 4, descricao: "IPVA", valor: 350.00, tipo: "Despesa", data: "2025-11-10" }
];

function renderizarTabela() {
    const tbody = document.querySelector('#tabela-transacoes tbody');
    tbody.innerHTML = '';

    // --- SIMULAÇÃO DA CHAMADA DA API (Método: GET) ---
    /*
    fetch('https://api.exemplo.com/transacoes', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            transacoes = data; // Atualiza o array com dados da API
        })
        .catch(error => console.error('Erro na chamada da API:', error));
    */
    // --- FIM DA SIMULAÇÃO ---

    Swal.fire({
        title: 'Carregando transações...',
        text: 'Aguarde enquanto buscamos os dados mais recentes.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading()
    });

    if (transacoes.length === 0) {
        Swal.close();
        Swal.fire({
            title: "Nenhuma transação encontrada",
            text: "Não foi possível carregar nenhuma transação.",
            icon: "warning",
            confirmButtonText: "Ok"
        });
        return;
    }

    transacoes.forEach(transacao => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transacao.id}</td>
            <td>${transacao.descricao}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>
                <span class="badge bg-${transacao.tipo === 'Receita' ? 'success' : 'danger'}">
                    ${transacao.tipo}
                </span>
            </td>
            <td>${transacao.data}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editarTransacao(${transacao.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="deletarTransacao(${transacao.id})">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    Swal.close();
}

function adicionarTransacao(event) {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const data = document.getElementById('data').value;
    
    if (!descricao || !valor || !tipo || !data) {
        Swal.fire("Campos obrigatórios!", "Preencha todos os campos antes de salvar.", "warning");
        return;
    }

    if (id) {
        const index = transacoes.findIndex(t => t.id == id);
        if (index !== -1) {
            transacoes[index] = { id: parseInt(id), descricao, valor, tipo, data };
            
            // --- SIMULAÇÃO DA CHAMADA DA API (Método: PUT/PATCH) ---
            /*
            fetch(`https://api.exemplo.com/transacoes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descricao, valor, tipo, data })
            })
            .then(response => response.json())
            .then(data => console.log('Atualizado com sucesso:', data))
            .catch(error => console.error('Erro na chamada da API:', error));
            */
            // --- FIM DA SIMULAÇÃO ---
        }

        Swal.fire({
            title: "Transação Atualizada",
            text: "Os dados foram atualizados com sucesso!",
            icon: "success",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    } else {
        // --- CREATE ---
        const novoId = transacoes.length > 0 ? Math.max(...transacoes.map(t => t.id)) + 1 : 1;
        transacoes.push({ id: novoId, descricao, valor, tipo, data });

        Swal.fire({
            title: "Transação Adicionada",
            text: "Transação adicionada à lista com sucesso!",
            icon: "success",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        
        // --- SIMULAÇÃO DA CHAMADA DA API (Método: POST) ---
        /*
        fetch('https://api.exemplo.com/transacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao, valor, tipo, data })
        })
        .then(response => response.json())
        .then(data => console.log('Criado com sucesso:', data))
        .catch(error => console.error('Erro na chamada da API:', error));
        */
        // --- FIM DA SIMULAÇÃO ---
    }
    
    document.getElementById('form-transacao').reset();
    renderizarTabela();
}

function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id == id);
    if (transacao) {
        document.getElementById('id').value = transacao.id;
        document.getElementById('descricao').value = transacao.descricao;
        document.getElementById('valor').value = transacao.valor;
        document.getElementById('tipo').value = transacao.tipo;
        document.getElementById('data').value = transacao.data;
    }
}

async function deletarTransacao(id) {
    const result = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        transacoes = transacoes.filter(t => t.id != id);
        
        // --- SIMULAÇÃO DA CHAMADA DA API (Método: DELETE) ---
        /*
        fetch(`https://api.exemplo.com/transacoes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) console.log('Removido com sucesso');
        })
        .catch(error => console.error('Erro na chamada da API:', error));
        */
        // --- FIM DA SIMULAÇÃO ---
        
        renderizarTabela();
        
        Swal.fire({
            title: 'Excluído!',
            text: 'A transação foi removida.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
}

function cancelarEdicao() {
    document.getElementById('form-transacao').reset();
}

document.getElementById('form-transacao').addEventListener('submit', adicionarTransacao);
document.getElementById('cancelar').addEventListener('click', cancelarEdicao);

renderizarTabela();