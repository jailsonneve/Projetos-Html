export function buscarCep(cep, inputRua, inputBairro, inputCidade, inputEstado) {
    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }
            inputRua.value = data.logradouro || '';
            inputBairro.value = data.bairro || '';
            inputCidade.value = data.localidade || '';
            inputEstado.value = data.uf || '';
        })
        .catch(error => console.error('Erro ao buscar o CEP:', error));
}