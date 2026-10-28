# Atividade 17 - Entrega do Bloco 3

**UC:** Programação Back-End | **Bloco 3** | **Grupo 4**  
**Projeto:** API de Gestão da Livraria  
**Coleção de testes:** `entrega-bloco3.postman_collection.json`

Este documento registra a conferência da API para a entrega do Bloco 3. A coleção verifica as rotas de livros, categorias e respostas para dados inválidos. A API usa dados em memória; ao reiniciar o servidor, os dados cadastrados nos testes são apagados.

## Como executar os testes

1. Na pasta do projeto, inicie a API com `npm run dev`.
2. No Postman, importe `entrega-bloco3.postman_collection.json`.
3. Confira se `baseUrl` está definido como `http://localhost:3000`.
4. Abra a coleção **Livraria API - Entrega do Bloco 3** e escolha **Run collection**.
5. Execute as requisições na ordem apresentada e confira os status esperados nas tabelas abaixo.

A coleção tem 9 requisições de Livros, 7 de Categorias e 7 de Erros. Como algumas requisições têm mais de uma asserção, o Runner apresenta 27 testes.

## Resultados conferidos

### 1 - Livros

| Requisição | Resultado esperado | Resultado conferido |
|---|:---:|:---:|
| Listar livros | 200 | 200 |
| Cadastrar livro | 201 | 201 |
| Buscar livro cadastrado | 200 | 200 |
| Filtrar pelo título | 200 e pelo menos um resultado | 200 e encontrou o livro |
| Alterar somente o preço (PATCH) | 200 | 200 |
| Substituir os dados (PUT) | 200 | 200 |
| Tentar salvar estoque negativo | 400 | 400 |
| Apagar livro | 204 | 204 |
| Buscar livro apagado | 404 | 404 |

### 2 - Categorias

| Requisição | Resultado esperado | Resultado conferido |
|---|:---:|:---:|
| Listar categorias | 200 | 200 |
| Cadastrar categoria | 201 | 201 |
| Buscar categoria cadastrada | 200 | 200 |
| Alterar somente a descrição (PATCH) | 200 | 200 |
| Substituir os dados (PUT) | 200 | 200 |
| Apagar categoria | 204 | 204 |
| Buscar categoria apagada | 404 | 404 |

### 3 - Erros

| Requisição | Resultado esperado | Resultado informado |
|---|:---:|:---:|
| Livro sem título | 400 | 400 |
| Livro com preço negativo | 400 | 400 |
| Livro com preço em texto | 400 | 400 |
| Livro sem `Content-Type` | 400 | 400 |
| Categoria sem nome | 400 | 400 |
| Categoria com nome curto | 400 | 400 |
| Rota que não existe | 404 e resposta JSON | 404 |

Os seis primeiros casos são entradas inválidas e devem ser recusados com `400 Bad Request`. A rota desconhecida não existe na API e deve responder `404 Not Found`.

## Estrutura conferida no projeto

As rotas seguem a organização MVC já usada pelo projeto:

- `src/routes/` recebe as requisições e encaminha para os controllers.
- `src/controllers/` coordena a resposta e chama os services.
- `src/services/` contém as operações e validações simples dos livros e categorias.
- `src/middlewares/` contém o registro de requisições, a resposta de rota não encontrada e o tratamento de erros.

## Placar da entrega

- Pasta 1 - Livros: 9 requisições conferidas.
- Pasta 2 - Categorias: 7 requisições conferidas.
- Pasta 3 - Erros: 7 requisições conferidas; seis retornaram `400` e a rota inexistente retornou `404`.
- Total esperado no Runner: 27 testes.
- Placar final do Runner do Postman: **preencher após executar a coleção completa**.

## Checklist

- [x] Coleção de entrega executada para conferir as rotas.
- [x] Os sete resultados esperados da pasta Erros foram conferidos.
- [x] Executar o Runner completo com o servidor recém-iniciado e anotar o placar de 27 testes.
- [x] Conferir os arquivos MVC e middlewares no repositório.
- [x] Fazer commit e push da entrega, se ainda não foram feitos.
