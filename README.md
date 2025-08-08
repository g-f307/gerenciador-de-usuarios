# Gerenciamento de Usuários - Aplicação Full-Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

Uma aplicação web full-stack para realizar operações CRUD (Create, Read, Update, Delete) em uma lista de usuários. O projeto foi totalmente containerizado com Docker, permitindo que o frontend e o backend rodem de forma isolada e coesa com um único comando.

---

## ✨ FUNCIONALIDADES PRINCIPAIS

* **API REST com Python e FastAPI**: Backend robusto e rápido para gerenciar os dados dos usuários.
* **Interface Reativa com React**: Frontend moderno construído com React e Vite para uma experiência de usuário fluida.
* **Operações CRUD Completas**:
    * **Create**: Adicionar novos usuários através de um formulário.
    * **Read**: Listar todos os usuários cadastrados em uma tabela.
    * **Update**: Editar informações de um usuário existente em um modal.
    * **Delete**: Remover usuários da lista.
* **Persistência de Dados**: Utilização do SQLite para um armazenamento de dados leve e persistente através de volumes Docker.
* **Ambiente Containerizado**: Com Docker e Docker Compose, a aplicação inteira (backend, frontend e banco de dados) é configurada e executada com um único comando, garantindo consistência entre diferentes ambientes.
* **Design Responsivo**: A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

---

## 🚀 TECNOLOGIAS UTILIZADAS

<div align="center">

| Categoria | Tecnologia | Descrição |
|---|---|---|
| **Frontend** | React (com Vite) | Biblioteca para construção de interfaces e build rápido. |
| | Axios | Cliente HTTP para comunicação com a API. |
| **Backend** | Python 3.9 | Linguagem de programação principal do backend. |
| | FastAPI | Framework web de alta performance para a criação da API REST. |
| | Uvicorn | Servidor ASGI para rodar a aplicação FastAPI. |
| | SQLAlchemy | ORM para interação com o banco de dados. |
| | Pydantic | Biblioteca para validação de dados. |
| **Banco de Dados** | SQLite | Banco de dados relacional leve, baseado em arquivo. |
| **Infraestrutura** | Docker & Docker Compose | Containerização e orquestração dos serviços da aplicação. |

</div>

---

## 📂 ESTRUTURA DO PROJETO

```
redmax-challenge/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Modal.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── data/
│   └── db/
│       └── database.db
└── docker-compose.yml
```

---

## 🔌 ENDPOINTS DA API BACKEND

A API base roda em `http://localhost:3001`.

### Recurso: Usuários (`/api/usuarios`)

| Método | Endpoint | Protegido? | Descrição |
|---|---|---|---|
| `GET` | `/` | Não | Retorna a lista de todos os usuários. |
| `POST` | `/` | Não | Cria um novo usuário. |
| `PUT` | `/{usuario_id}` | Não | Atualiza um usuário existente pelo seu ID. |
| `DELETE` | `/{usuario_id}` | Não | Deleta um usuário pelo seu ID. |

A documentação interativa completa da API (gerada automaticamente pelo FastAPI) está disponível em **[http://localhost:3001/docs](http://localhost:3001/docs)** após iniciar a aplicação.

---

## 🛠 COMO RODAR O PROJETO LOCALMENTE

Graças ao Docker, o processo de configuração é extremamente simples.

### Pré-requisitos

* **Docker**
* **Docker Compose**

*(Não é necessário ter Node.js ou Python instalados na sua máquina host!)*

### 1. Clonar o Repositório (Exemplo)

```bash
git clone https://github.com/g-f307/gerenciador-de-usuarios.git
cd gerenciador-de-usuarios
```

### 2. Iniciar a Aplicação

Abra um terminal na pasta raiz do projeto e execute o seguinte comando:

```bash
# Se o seu usuário não estiver no grupo docker, use sudo
sudo docker-compose up --build
```

Este comando irá:
1.  Construir as imagens Docker para o frontend e o backend.
2.  Iniciar os dois contêineres.
3.  Criar a rede para que eles se comuniquem.
4.  Mapear as portas e os volumes necessários.

### 3. Acessar a Aplicação

Após a conclusão do comando, a aplicação estará disponível nos seguintes endereços:

* **Aplicação Frontend**: [http://localhost:3000](http://localhost:3000)
* **Documentação da API Backend**: [http://localhost:3001/docs](http://localhost:3001/docs)

---

## 🖼 SCREENSHOTS

<p align="center">
  <img width="1175" height="900" alt="Captura de tela de 2025-08-08 18-22-44" src="https://github.com/user-attachments/assets/e9394e8b-8f3b-4f38-b40b-7fbcc9247c57" />
  <i>Aplicação em funcionamento</i>
</p>
