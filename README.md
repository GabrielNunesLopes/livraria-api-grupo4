# API de Gestão da Livraria — Grupo 4

Projeto da UC de Programação Back-End — Curso Técnico em Desenvolvimento de Sistemas  
Escola SENAI "Santo Paschoal Crepaldi" — Turma 1-2026-SESI_DEV_OC_1

## Integrantes

- Vitor Hugo dos Santos Campos
- Guilherme de Souza Barbosa
- Isadora Costa Campanari
- Gabriel Nunes Lopes

## Atividade 06 — Esqueleto MVC da Livraria

Objetivo: montar o esqueleto MVC da API da Livraria com servidor Express, organização em camadas e consolidação dos models do projeto.

### Divisão de responsabilidades

| Integrante | Responsabilidade |
|---|---|
| Vitor Hugo dos Santos Campos | Configuração do servidor Express e execução inicial da API |
| Guilherme de Souza Barbosa | Criação das camadas `routes`, `controllers` e `services` para Livro |
| Isadora Costa Campanari | Consolidação do model `Livro.js` em `src/models/` |
| Gabriel Nunes Lopes | Consolidação do model `Categoria.js`, extras da atividade e documentação no README |

> Esta tabela registra a divisão de responsabilidades definida pelo grupo para a atividade.

## Estrutura MVC

```text
src/
├── index.js
├── routes/
│   ├── livroRoutes.js
│   └── categoriaRoutes.js
├── controllers/
│   ├── livroController.js
│   └── categoriaController.js
├── services/
│   ├── livroService.js
│   └── categoriaService.js
└── models/
    ├── Livro.js
    ├── Categoria.js
    ├── Pessoa.js
    ├── Cliente.js
    └── Funcionario.js
```

### Função de cada camada

- **Routes:** recebem as requisições HTTP e representam os endpoints da API.
- **Controllers:** decidem o que deve ser feito com cada requisição.
- **Services:** concentram a lógica de negócio da aplicação.
- **Models:** representam as entidades e seus dados.

## Extras realizados

### A. Esqueleto de Categoria

Também foi replicado o padrão MVC para Categoria com os arquivos:

- `src/routes/categoriaRoutes.js`
- `src/controllers/categoriaController.js`
- `src/services/categoriaService.js`

### B. Rota `/sobre`

Além da rota principal, o servidor possui:

```text
GET /sobre
```

Resposta esperada:

```text
Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1
```

### C. Discussão sobre Funcionario

Se a API também precisasse gerenciar funcionários, seguindo o mesmo padrão MVC seriam criados:

- `src/routes/funcionarioRoutes.js`
- `src/controllers/funcionarioController.js`
- `src/services/funcionarioService.js`

## Como executar

```bash
npm install
npm run dev
```

Depois, acesse:

- `http://localhost:3000` — mensagem `API da Livraria no ar!`
- `http://localhost:3000/sobre` — informações do trabalho

## Tecnologias

- Node.js
- npm
- Express
- Nodemon
