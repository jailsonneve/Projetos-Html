<h1 align="center"> Gerenciador de Tarefas - Lista de Tarefas </h1>

Um gerenciador de tarefas interativo que permite adicionar, priorizar, ordenar e gerenciar suas tarefas. Desenvolvido com **HTML**, **CSS**, **JavaScript**, **Bootstrap** e integrado ao **Firebase Firestore** para armazenamento de dados.

## 🧐 Funcionalidades

- Adicionar tarefas com prioridades (Alta, Média, Baixa).
- Ordenar tarefas por ordem alfabética ou prioridade.
- Marcar tarefas como concluídas.
- Editar ou remover tarefas.
- Banco de dados utilizando Firebase Firestore.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** e **CSS3** para estrutura e estilização.
- **Bootstrap 5** para design responsivo e componentes pré-prontos.
- **JavaScript** para lógica de manipulação de tarefas e integração com Firebase.
- **Firebase Firestore** como banco de dados para armazenamento das tarefas.
- **SweetAlert2** para exibição de diálogos elegantes.

---

## 📂 Estrutura do Projeto

```
project/
│
├── static/
│   ├── css/
│   │   └── to_do_list.css
│   ├── js/
│   │   └── to_do_list.js
│
├── index.html
└── README.md
```

---

## 🔗 Conexão com o Firebase

Para conectar o projeto ao Firebase Firestore, as seguintes configurações estão implementadas no arquivo `to_do_list.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCrZgHlPVX59zM68ENmAyXogc3JmoTU5rE",
  authDomain: "tentando-eed5d.firebaseapp.com",
  projectId: "tentando-eed5d",
  storageBucket: "tentando-eed5d.appspot.com",
  messagingSenderId: "103578231381",
  appId: "1:103578231381:web:485a8e94f53e8087e92adc",
  measurementId: "G-V3BFLM3V3X",
};
```

**Nota:** Essas credenciais são utilizadas para fins de demonstração. Certifique-se de configurar as permissões no console do Firebase e de proteger suas chaves em ambientes de produção.

---

## ⚡ Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/jailsonneve/Projetos-Html.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd "Projetos/to do listV2"
   ```

3. Abra o arquivo `to_do_list.html` usando um servidor, exemplo um localhost de python ou com a extensão live server do vscode.

---

## 📬 Contato

Desenvolvido por [Arthur Henrique Dai | JailsonNeve](mailto:daiarthur053@gmail.com). Entre em contato pelo [GitHub](https://github.com/jailsonneve).
