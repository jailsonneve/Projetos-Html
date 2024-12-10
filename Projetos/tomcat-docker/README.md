# Tomcat Docker Setup

Este repositório contém uma configuração simples de Tomcat usando Docker. Siga os passos abaixo para configurar e rodar a aplicação web em um ambiente Docker.

## Requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados no seu sistema. Caso ainda não tenha instalado, você pode baixar e instalar os seguintes programas:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Passos para rodar o projeto

### 1. Após o Clone o repositório

Após baixar o repositório entre na pasta:

```bash
cd Trab4B/tomcat-docker/
```

### 2. Suba os containers Docker

Com o repositório clonado e dentro do diretório tomcat-docker/, execute o seguinte comando para iniciar os containers em segundo plano:

```bash
docker compose up -d
```

Este comando irá:

Baixar as imagens necessárias.
Criar e iniciar os containers do Tomcat.
Configurar a aplicação para ser acessada localmente.

### 3. Acesse a aplicação no navegador

Após o comando docker compose up -d ser executado com sucesso, você pode acessar a aplicação no seu navegador, utilizando o seguinte link:
http://localhost:8080/my-web-app/

### 4. Parar os containers

Quando terminar de trabalhar com a aplicação, você pode parar os containers utilizando o seguinte comando:

```bash
docker compose down
```

Este comando irá:

Parar os containers.
Remover as redes e volumes associados ao projeto.

### Problemas comuns

Erro ao acessar o link no navegador: Certifique-se de que o Docker está rodando corretamente e que o Tomcat foi iniciado sem erros.
Porta já em uso: Caso a porta 8080 já esteja em uso, você pode alterar a porta no arquivo docker-compose.yml.
