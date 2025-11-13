📋 Gerenciador de Tarefas
Bem-vindo ao Gerenciador de Tarefas! Este é um projeto simples de frontend que interage com uma API REST para gerenciar tarefas. Ele permite listar tarefas em uma tabela HTML, utilizando JavaScript para fazer chamadas assíncronas à API.

🚀 Visão Geral
O projeto consiste em dois arquivos principais:

services.js: Contém funções JavaScript para interagir com a API de tarefas.
index.html: Uma página HTML que exibe uma tabela com as tarefas carregadas dinamicamente.
A aplicação assume que há um backend rodando em http://localhost:8080 que fornece endpoints para CRUD (Create, Read, Update, Delete) de tarefas.

📁 Estrutura dos Arquivos
services.js
Este arquivo define funções assíncronas para consumir a API. Ele usa fetch para fazer requisições HTTP.

Funções Principais:
listarTarefas(): Faz uma requisição GET para /tasks e retorna uma lista de tarefas em JSON.
buscarTarefa(id): Faz uma requisição GET para /tasks/{id} e retorna a tarefa específica ou null se não encontrada.
criarTarefa(tarefa): Faz uma requisição POST para /tasks com o corpo JSON da nova tarefa e retorna a tarefa criada.
atualizarTarefa(id, tarefa): Faz uma requisição PUT para /tasks/{id} com o corpo JSON atualizado e retorna a tarefa modificada.
deletarTarefa(id): Faz uma requisição DELETE para /tasks/{id} e retorna true se a exclusão foi bem-sucedida.
Exemplo de uso:

javascript
6 lines
Copy code
Download code
Click to expand
// Listar todas as tarefas
const tarefas = await listarTarefas();
...
index.html
Esta é a página principal que exibe uma tabela de tarefas. Ela inclui:

Um botão para atualizar a lista manualmente.
Uma tabela com colunas: ID, Descrição, Status e Data de Conclusão.
Um script inline que carrega as tarefas ao abrir a página e trata erros.
Funcionamento:
Ao carregar a página, a função carregarTarefas() é chamada automaticamente.
Ela chama listarTarefas() do services.js para obter os dados.
A tabela é populada dinamicamente com os dados das tarefas.
Se não houver tarefas, exibe uma mensagem. Em caso de erro (ex.: backend offline), mostra uma mensagem de erro na tabela.
Estrutura HTML simplificada:

html
32 lines
Copy code
Download code
Click to expand
<!DOCTYPE html>
<html lang="pt-BR">
...
🛠️ Como Usar
Pré-requisitos:

Um navegador web moderno (Chrome, Firefox, etc.).
Um backend API rodando em http://localhost:8080 com endpoints para tarefas (ex.: Spring Boot, Node.js, etc.). Certifique-se de que os endpoints correspondam aos usados no services.js.
Executar:

Abra o arquivo index.html em um navegador.
A lista de tarefas será carregada automaticamente.
Clique em "Atualizar Lista" para recarregar os dados.
Testar a API:

Use ferramentas como Postman ou Insomnia para testar os endpoints diretamente.
Exemplo de tarefa JSON: { "id": 1, "descricao": "Comprar leite", "status": "Pendente", "dataConclusao": "2023-10-01" }.
⚠️ Observações
Erros: Se o backend não estiver rodando, a tabela exibirá uma mensagem de erro. Verifique o console do navegador para detalhes.
Segurança: Este é um exemplo básico. Em produção, considere adicionar autenticação e validações.
Extensões: Você pode expandir adicionando funcionalidades como criar, editar ou deletar tarefas diretamente na página HTML.