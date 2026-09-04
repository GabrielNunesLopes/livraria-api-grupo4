# Entrega Consolidada do Bloco 2 — Design

## Objetivo

Adequar o repositório `livraria-api-grupo4` ao checklist da Atividade 09 de 04/09/2026, mantendo o escopo estritamente dentro de UML, esqueleto MVC, Clean Code, ambiente Express e documentação.

## Escopo

### 1. UML e models

- Manter `Pedido` e `ItemPedido` somente no diagrama, sem criar classes em `src/models/`.
- Conferir se `Livro`, `Categoria`, `Pessoa`, `Cliente` e `Funcionario` têm estrutura coerente com o diagrama existente.
- Preservar `module.exports` em todos os models.
- Não adicionar banco de dados.

### 2. Esqueleto MVC

- Manter as camadas `routes`, `controllers`, `services` e `models`.
- Tornar Livro a referência funcional do fluxo MVC.
- Manter Categoria seguindo o mesmo padrão de referência.
- Integrar as rotas ao Express em `src/index.js`.
- Manter `/` e `/sobre` funcionando.
- Não criar CRUD persistente; os endpoints podem trabalhar com dados em memória apenas para demonstrar corretamente o fluxo Route -> Controller -> Service.

### 3. Clean Code

- Extrair números mágicos para constantes nomeadas, incluindo o percentual de bônus de funcionário.
- Remover comentários de lacuna/exercício que não fazem mais sentido em código final.
- Quebrar lógica maior em métodos pequenos quando aplicável.
- Melhorar nomes e consistência de aspas/formatação sem alterar a responsabilidade das classes.

### 4. README

Atualizar o `README.md` para incluir:

- imagem/link do diagrama final em `docs/diagrama-Classes.png`;
- estrutura atualizada de pastas do MVC;
- descrição objetiva da refatoração de Clean Code aplicada em 02/09;
- instruções de execução com `npm install` e `npm run dev`;
- endpoints de referência disponíveis.

### 5. Ambiente Express

- `npm run dev` deve iniciar `src/index.js` com nodemon.
- A aplicação deve responder em `http://localhost:3000`.
- Não usar `server.js` como ponto de entrada; o arquivo vazio pode ser removido para evitar ambiguidade.

## Fora de escopo

- Banco de dados.
- Autenticação.
- CRUD completo/persistente.
- Implementação de `Pedido` ou `ItemPedido`.
- Funcionalidades que não apareçam no checklist da Atividade 09.

## Critérios de aceite

1. Estrutura MVC presente e conectada ao Express.
2. `Livro` e `Categoria` com route/controller/service funcionais como referência.
3. Todos os models exportados com `module.exports`.
4. Clean Code aplicado de forma visível no código.
5. README atualizado com diagrama, estrutura MVC e frase da refatoração.
6. `npm run dev` inicia a aplicação sem erro e os endpoints básicos respondem.
7. Nenhuma implementação de `Pedido`/`ItemPedido` em `src/models/`.
