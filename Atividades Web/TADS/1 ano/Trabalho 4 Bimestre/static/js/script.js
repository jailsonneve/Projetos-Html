// Função principal para buscar o CEP na API ViaCEP
function buscarCEP() {
    // Obtém o valor do campo CEP, removendo espaços e hífens
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    // Verifica se o CEP tem exatamente 8 dígitos
    if (cep.length !== 8) {
        alert('CEP inválido. Digite um CEP com 8 dígitos.');
        return;
    }
    
    // Pequeno delay para uma experiência mais suave (opcional)
    setTimeout(() => {
        // Monta a URL da API ViaCEP
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        
        // Faz a requisição usando fetch (API moderna do navegador)
        fetch(url)
            .then(response => {
                // Verifica se a resposta foi bem-sucedida (status 200)
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
                // Converte a resposta para JSON
                return response.json();
            })
            .then(data => {
                // Verifica se a API retornou erro (ex.: CEP não encontrado)
                if (data.erro) {
                    alert('CEP não encontrado.');
                    return;
                }
                
                // Preenche os campos do formulário com os dados retornados
                document.getElementById('rua').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('localidade').value = data.localidade || '';
                document.getElementById('uf').value = data.uf || '';
                document.getElementById('complemento').value = data.complemento || '';
                document.getElementById('ddd').value = data.ddd || '';

                // Se complemento estiver vazio, habilita o campo e mostra modal (mais bonito que alert)
                if (!document.getElementById('complemento').value) {
                    document.getElementById('complemento').disabled = false;
                    const modal = new bootstrap.Modal(document.getElementById('complementoModal'));
                    modal.show();
                }
            })
            .catch(error => {
                // Trata erros (ex.: rede, API indisponível)
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP. Tente novamente.');
            });
    }, 500); // Delay de 500ms
}

// Adiciona um event listener ao campo CEP para chamar buscarCEP quando o usuário sai do campo (onblur)
document.getElementById('cep').addEventListener('blur', buscarCEP);

// Opcional: Previne o envio do formulário para demonstração (pode ser removido se quiser enviar dados)
document.getElementById('enderecoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulário enviado! (Dados não processados neste exemplo)');
});