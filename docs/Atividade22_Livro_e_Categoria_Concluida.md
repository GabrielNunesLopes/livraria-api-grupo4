# Atividade 22 — O Livro e a sua Categoria

**UC:** Programação Back-End | Bloco 4  
**Grupo:** 4 — Livraria API

## Resultado da implementação

O livro passou a trazer os dados da categoria relacionada. A API lista e busca livros com `categoria_id` e o nome da categoria; o filtro aceita o nome ou parte do nome, sem diferenciar maiúsculas de minúsculas. Livro sem categoria continua permitido e retorna `categoria: null`.

As rotas validam a categoria informada ao criar ou alterar um livro. Uma categoria inexistente retorna **400**. A exclusão de categoria que ainda tem livros retorna **409**. Os erros de chave estrangeira do MySQL são convertidos nesses status e mensagens da API.

## Requisições de relacionamento

Na coleção `postman/livraria.postman_collection.json`, a pasta **Relacionamento** contém:

| Requisição | Resultado esperado | Resultado verificado |
|---|---|---|
| `GET /livros/1` | 200 e categoria `Tecnologia` | Passou |
| `POST /livros` com `categoria_id: 99999` | 400 | Passou |
| `DELETE /categorias/1` com livros relacionados | 409 | Passou |
| `GET /livros?categoria=tec` | 200 | Passou |

## Carga inicial

O script `src/database/livraria.sql` cria três categorias e oito livros. Os dois primeiros registros de categoria e os três primeiros livros foram mantidos na ordem inicial; os oito livros têm categoria. O script termina com uma consulta que mostra os livros e suas categorias.

## Como importar no Insomnia

Importe `postman/Relacionamento - Insomnia.postman_collection.json` pelo menu **Import** do Insomnia. Configure a variável `baseUrl` para a URL local da API, normalmente `http://localhost:3000`, e envie as requisições da pasta **Relacionamento**.

## Conferência

A coleção Postman completa foi executada duas vezes contra a API ligada a um banco MySQL temporário criado pelo script do projeto: **41 de 41 asserções em cada execução (82/82 no total)**. O banco temporário foi removido ao final. A captura visual do Runner não faz parte deste documento.
