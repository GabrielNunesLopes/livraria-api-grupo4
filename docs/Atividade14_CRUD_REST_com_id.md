# Atividade 14 — CRUD REST com ID

**Projeto:** API de Livraria — Grupo 4  
**Base local:** `http://localhost:3000`

Este guia registra as respostas da atividade e como conferir o CRUD de livros e categorias. Os dados ficam em memória: ao reiniciar o servidor, as categorias e os livros voltam aos dados iniciais.

## Parte 1 — URLs REST

| URL | REST? | Forma recomendada |
|---|:---:|---|
| `GET /categorias` | Sim | — |
| `GET /listarCategorias` | Não | `GET /categorias` |
| `POST /categorias/nova` | Não | `POST /categorias` |
| `PATCH /livros/5` | Sim | — |
| `GET /categoria/2` | Não | `GET /categorias/2` |
| `DELETE /livros/remover/4` | Não | `DELETE /livros/4` |

## Rotas disponíveis

| Método | Caminho | Resultado |
|---|---|---|
| `GET` | `/livros` | Lista livros; aceita filtros `autor`, `titulo`, `precoMin` e `precoMax` |
| `GET` | `/livros/:id` | Busca um livro pelo ID |
| `POST` | `/livros` | Cria um livro e responde `201` |
| `PUT` | `/livros/:id` | Substitui os dados do livro |
| `PATCH` | `/livros/:id` | Atualiza somente os campos enviados |
| `DELETE` | `/livros/:id` | Exclui o livro e responde `204` |
| `GET` | `/categorias` | Lista categorias; aceita o filtro `nome` |
| `GET` | `/categorias/:id` | Busca uma categoria pelo ID |
| `POST` | `/categorias` | Cria uma categoria e responde `201` |
| `PUT` | `/categorias/:id` | Substitui nome e descrição |
| `PATCH` | `/categorias/:id` | Atualiza somente os campos enviados |
| `DELETE` | `/categorias/:id` | Exclui a categoria e responde `204` |

Uma busca por ID inexistente responde `404` com uma mensagem de erro em JSON. IDs são números e não mudam quando outro registro é excluído.

## Parte 2 — Conferir livros

Inicie o servidor em um terminal:

```bash
npm run dev
```

Envie as requisições a seguir pelo Postman, usando `http://localhost:3000` como base. Para `POST`, `PUT` e `PATCH`, escolha `Body` → `raw` → `JSON`.

| # | Requisição | JSON enviado | Esperado |
|---:|---|---|---|
| 1 | `GET /livros` | — | `200`; cada livro contém `id` |
| 2 | `GET /livros/1` | — | `200`; retorna o livro de ID 1 |
| 3 | `GET /livros/99` | — | `404` |
| 4 | `PATCH /livros/2` | `{"preco":50}` | `200`; altera o preço sem apagar os outros campos |

Exemplo de criação: `POST /livros` com `{"titulo":"O Hobbit","autor":"J.R.R. Tolkien","preco":39.9,"estoque":8}` responde `201` com o novo livro e seu ID.

### Por que o ID não volta a 1?

O contador de IDs só aumenta. Apagar o livro de ID 1 não renumera os demais e não libera esse ID. Ao criar outro livro, ele recebe o próximo ID da sequência, mesmo depois de uma exclusão.

Para reproduzir a sequência do mistério, reinicie o servidor antes de começar. Então:

| Requisição | Esperado |
|---|---|
| `DELETE /livros/1` | `204` |
| `GET /livros/1` | `404` |
| `GET /livros/2` | `200`, continua com ID 2 |
| `POST /livros` com o JSON de O Hobbit | `201`, O Hobbit recebe ID 3 |

O Hobbit recebe ID 3 porque o ID 1 foi removido, mas o contador não volta atrás.

## Parte 4 — Conferir categorias

Execute as requisições em sequência na mesma inicialização do servidor:

| # | Requisição | JSON enviado | Esperado |
|---:|---|---|---|
| 1 | `GET /categorias` | — | `200`; categorias com IDs 1 e 2 |
| 2 | `GET /categorias/2` | — | `200`; categoria Tecnologia |
| 3 | `GET /categorias/99` | — | `404` |
| 4 | `POST /categorias` | `{"nome":"Infantil","descricao":"Livros para criancas"}` | `201`; categoria com ID 3 |
| 5 | `PATCH /categorias/3` | `{"descricao":"De 6 a 10 anos"}` | `200`; descrição atualizada e nome preservado |
| 6 | `PUT /categorias/3` | `{"nome":"Infantojuvenil","descricao":"Criancas e adolescentes"}` | `200`; nome e descrição substituídos |
| 7 | `DELETE /categorias/1` | — | `204`; sem corpo de resposta |
| 8 | `GET /categorias/1` | — | `404` |

### Filtro opcional

O filtro ignora maiúsculas e minúsculas e procura o texto em qualquer parte do nome:

- `GET /categorias?nome=fic` → categoria Ficção.
- `GET /categorias?nome=xyz` → lista vazia (`[]`).

## Códigos HTTP

- `200 OK`: busca, listagem ou atualização concluída.
- `201 Created`: recurso criado.
- `204 No Content`: recurso excluído.
- `404 Not Found`: ID não encontrado.
