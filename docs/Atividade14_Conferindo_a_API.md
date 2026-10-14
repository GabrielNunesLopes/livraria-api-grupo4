# Atividade 14 — Conferindo a API

**UC:** Programação Back-End | Bloco 3 — Aula de 02/10/2026
**Grupo 4** — Repositório: livraria-api-grupo4

## Divisão de trabalho

| Quem | Responsável por |
|---|---|
| Vitor Hugo dos Santos Campos | Parte 1 |
| Guilherme de Souza Barbosa | Parte 2 — rodar no Postman |
| Isadora Costa Campanari | Parte 2 — anotar os resultados |
| Gabriel Nunes Lopes | Parte 3 |

## Parte 1 — Qual é o parâmetro?

| Requisição | Route | Query | Body |
|---|:---:|:---:|:---:|
| GET /livros/3 | X | | |
| GET /livros?autor=tolkien | | X | |
| POST /livros com { "titulo": "Duna" } | | | X |
| DELETE /livros/2 | X | | |

## Parte 2 — Conferindo os 5 métodos

| # | Requisição | Corpo | Esperado | Obtido |
|---|---|---|:---:|:---:|
| 1 | GET /livros | — | 200 | 200 |
| 2 | GET /livros/0 | — | 200 | 200 |
| 3 | GET /livros/99 | — | 404 | 404 |
| 4 | POST /livros | { "titulo": "O Hobbit", "autor": "J.R.R. Tolkien", "preco": 39.9, "estoque": 8 } | 201 | 201 |
| 5 | PATCH /livros/0 | { "preco": 50 } | 200 | 200 |
| 6 | DELETE /livros/0 | — | 204 | 204 |

### O mistério do DELETE

| # | Requisição | Aposta do grupo | Obtido |
|---|---|---|---|
| 7 | GET /livros/0 | 404 (livro não encontrado) | 200 — veio o "Eloquent JavaScript" |

**Por que veio esse resultado?** Porque o DELETE remove o livro do array e os outros livros "andam" uma posição para trás, então o "Eloquent JavaScript" passou a ocupar o índice 0.

## Parte 3 — Filtro por título

Código colado em `listarLivros` no `livroService.js`, abaixo do filtro de autor:

```js
if (filtros.titulo) {
  resultado = resultado.filter((livro) =>
    livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
  );
}
```

| Requisição | O que deve aparecer | Resultado |
|---|---|---|
| GET /livros?titulo=code | Só livros com "code" no título | "Clean Code" ✅ |
| GET /livros?titulo=xyz | [] (lista vazia) | [] ✅ |

## Se sobrar tempo — filtro precoMin

Copiamos o filtro `precoMax` e trocamos `<=` por `>=`:

```js
if (filtros.precoMin !== undefined) {
  resultado = resultado.filter(
    (livro) => livro.preco >= Number(filtros.precoMin)
  );
}
```

Teste: `GET /livros?precoMin=50` → mostra só o "Clean Code" (89.90) ✅

## Checklist de entrega

- [x] Parte 1 marcada
- [x] Tabela da Parte 2 preenchida
- [x] Mistério do DELETE respondido
- [x] Filtro por titulo funcionando
- [x] git push feito
