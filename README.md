## BookStore Manager CLI

## 📋 Sobre o projeto
O  Bookstore Manager CLI é uma aplicação de iterface linha de comando(CLI) desenvolvida em **Node.js** com **TypeScript** que permite basicamente gerenciar uma livraria: 
gerenciar cadastro, empréstimos e devoluções de livros e organiza alguns relatórios em banco de dados durante a execução do programa. <br/><br/>
O projeto é uma atividade avaliativa desenvolvida no curso do SCTEC/SENAI/LAB365 - Desenvolvedor(a) BackEnd NodeJS que visa 
colocar em prática conceitos importantes de programação em NodeJS como: Planejamento do projeto, organização em camadas, boas práticas de
desenvolvimento: tipagem de dados com TypeScript, validações de dados, tratamento de erros, programação assíncrona e programação orientada a objetos. <br/><br/>
Outro ponto importante aprendido dentro do curso e colocado em prática no projeto foi o conceito de **Banco de Dados Relacional** com **PostgreSQL**
que abordam os seguintes conceitos:  Modelagem de bancos de dados relacionais utilizando PostgreSQL, diagrama de modelo conceitual de banco de dados através de entidade, relacionamento e cardinalidade. Realizar CRUD de informações: Autores, livros, clientes, empréstimo de livros e gerar relatórios a partir dos dados coletados. Outros conceitos importantes estudados foram: **Índice, Transactions e relacionamento entre tabelas.**
___
## ✅ Objetivo
O objetivo deste projeto é aplicar os conceitos estudados durante o módulo 
Fundamentos para Back-end: JavaScript, TypeScript e PostgreSQL e Desenvolver 
uma aplicação CLI capaz de:
- Realizar login do funcionário da livraria e manter ele conectado durante o funcionamento do sistema
- Gerenciar autores, livros e clientes
- Realizar empréstimo e registrar devoluções de livros
- Aplicar regras de negócio durante as operações do sistema
- Persistir informações em um banco de dados PostgreSQL
- Realizar consultas relacionais utilizando SQL
- Gerar relatórios a partir dos dados armazenados
- Organizar o código em camadas, promovendo modularização e reutilização
___
## 🔧 Ferramentas utilizadas
- JavaScript, TypeScript e NodeJS
- Pacotes (NPM): TSX, Eslint, Prettier, PG, Dotenv, Bcrypt
- PostgreSQL
- Git e GitHub
___
## ⚠️ Pré-requisitos
Antes de executar o projeto, é necessário ter instalado:
- [Git](https://git-scm.com/install/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [NodeJS](https://nodejs.org/pt-br/download)
- NPM (Vem instalado juntamente com o NodeJS)

___
## ⬇️ Como instalar e executar
Clone o repositório:

```bash
git clone git@github.com:FelipeMendes8/Bookstore-manager-cli.git
```

Acesse a pasta do projeto:
```bash
cd bookstore-manager-cli
```
Instale as dependências:
```bash
npm install
```

___
## 🎲​ Configuração do Banco de Dados (PostgreSQL)
O Sistema usa o banco de dados PostgreSQL para tratar os dados armazenados.
Antes de executar o projeto, é necessário criar um banco de dados vazio.

Exemplo:

```sql
CREATE DATABASE bookstore;
```

Depois de criar o banco, é necessário criar as tabelas e por último fazer a inserção de dados prévios. Para isso, execute os scripts SQL
deixados no projeto dentro da pasta chamada: Database. Entre os scripts tem o comando para criar o banco de dados vazio, script para criar as tabelas e script para inserção de dados. 

A ordem recomendada de execução é:


```bash
database/
├── create_tables.sql
├── add_indexes.sql
└── seed.sql
```

Depois de executar os scripts SQL, o banco de dados está pronto para ser usado pela aplicação.

___
## ⚙️​ Configuração do arquivo ```.env```

Os dados necessários para a conexão com o banco de dados ficam disponíveis dentro do arquivo **.env**. Para exemplo existe o arquivo: **.env.example** para ser usado como base, portanto, é preciso alterar os dados de conexão de acordo com o ambiente do projeto.
Exemplo:

```typescript
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
DB_USER user
DB_PASSWORD=user_pass
```
___
## ▶️​​​ Executando a aplicação
Após instalar as dependências e configurar o banco de dados, execute:

```bash
npm run dev
```
___
## 📊​​ Modelo conceitual 
Abaixo segue o diagrama de modelo lógico do banco de dados exibindo as entidades, relacionamentos e a cardinalidade entre tabelas.

<img width="2000" height="893" alt="boockstore-manager" src="https://github.com/user-attachments/assets/2fed0920-eb1c-438a-adc3-f5e6a8de033a" />

___
## 📁 Estrutura do projeto

```bash
bookstore-manager-cli/

├── src
│   ├── controllers
│   │   ├── autorController.ts
│   │   ├── clienteController.ts
│   │   ├── emprestimoController.ts
│   │   ├── livroController.ts
│   │   ├── loginController.ts
│   │   └── relatorioController.ts
│   │
│   ├── database
│   │   ├── ddl
│   │   	└── create_tables.sql
│   │  	├── dml
│   │   	└── add_indexes.sql
│   │   ├── seed
│   │   	└── seed.sql
│   │   └── connection.ts
│   │
│   ├── menus
│   │   ├── menu_autor.ts
│   │   ├── menu_cliente.ts
│   │   ├── menu_emprestimos.ts
│   │   ├── menu_livro.ts
│   │   ├──menu_principal.ts
│   │   ├── menu_relatorio.ts
│   │   └── menu_login.ts
│   │
│   ├── models
│   │   ├── autor.ts
│   │   ├── cliente.ts
│   │  	├── emprestimo.ts
│   │   ├── funcionario.ts
│   │   └── livro.ts
│   │
│   ├── repositories
│   │   ├── autorRepository.ts
│   │   ├── clienteRepository.ts
│   │   ├── emprestimoRepository.ts
│   │   ├── livroRepository.ts
│   │   ├── loginRepository.ts
│   │   └── relatorioRepository.ts
│   │
│   ├── services
│   │   ├── autorService.ts
│   │   ├── clienteService.ts
│   │   ├── emprestimoService.ts
│   │   ├── livroService.ts
│   │   ├── loginService.ts
│   │   └── relatorioService.ts
│   │
│   ├── utils
│   │   ├── session.ts
│   │   ├── validarEmail.ts
│   │   └── validarNome.ts
│   │
│   └── main.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
└── README.md
```
___
## ▶️ Funcionalidades

- Login do funcionário da livraria;
- Exibir menu e mensagens no terminal;
- O sistema valida e trata os dados de entrada e saida;
- Autores, livros e clientes: 
	Cadastrar, listar, consultar por identificador, atualizar dados e remover;

- Realizar empréstimo de livro e registro de devoluções;
- Consultar relatórios, por exemplo: Clientes com empréstimos ativos;

___
## 📊 Branches utilizadas:

- main -> Projeto em produção
- develop -> Projeto em desenvolvimento
- feat/feature -> Nova funcionalidade no projeto
- fix/correção -> Para corrigir ou melhorar uma funcionalidade
- docs/readme -> Documentação do projeto