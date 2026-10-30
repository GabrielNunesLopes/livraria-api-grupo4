# Atividade 19 — Um Livro Só

**UC:** Programação Back-End | **Bloco 4 — Aula 28**  
**Grupo 4** — Repositório: `livraria-api-grupo4`  
**Formato:** Em grupo, acompanhando a demonstração do professor  
**Avaliação:** Formativa — Read funcionando

## Piloto do grupo

**Piloto:** __

## Parte 1 — WHERE no Workbench

| Consulta | Quantas linhas? | Qual livro? |
|---|---:|---|
| `SELECT * FROM livros WHERE id = 3;` | 1 | O Hobbit |
| `SELECT * FROM livros WHERE id = 99;` | 0 | Nenhum livro |

O resultado do `id = 99` **não é um erro**. A consulta retorna uma lista vazia porque não encontrou nenhuma linha.

## Parte 2 — Completem as lacunas

```js
async function buscarLivroPorId(id) {
  const [linhas] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);
  return linhas[0];
}

async function buscarPorId(req, res) {
  const id = req.params.id;
  const livro = await livroService.buscarLivroPorId(id);
}
```

As lacunas são: `?`, `[id]`, `0`, `async` e `await`. O trecho correspondente já está no projeto em `src/services/livroService.js` e `src/controllers/livroController.js`.

### Commit e push

Comandos previstos para o piloto:

```bash
git add .
git commit -m "feat: busca livro por id no banco"
git push
```

Depois, os outros integrantes executam `git pull`. **Commit e push ainda pendentes neste repositório.**

## Parte 3 — Testar

Resultados que o código atual deve produzir, com o MySQL ativo e a tabela carregada com os dados do projeto:

| # | Requisição | Esperado | Identificado no código |
|---:|---|---|---|
| 1 | `GET /livros/3` | `200`, O Hobbit | `200`, busca no banco |
| 2 | `GET /livros/1` | `200`, Clean Code | `200`, busca no banco |
| 3 | `GET /livros/99999` | `404` | `404`, consulta não encontra linha |
| 4 | `GET /livros/abc` | `400` | `400`, middleware rejeita ID não numérico |

### Conferência entre integrantes

| Integrante | `GET /livros/3` deu O Hobbit? |
|---|---|
| Vitor Hugo dos Santos Campos | __ |
| Guilherme de Souza Barbosa | __ |
| Isadora Costa Campanari | __ |
| Gabriel Nunes Lopes | __ |

## Parte 4 — A prova de que vem do banco

Após executar no Workbench:

```sql
UPDATE livros SET preco = 35.00 WHERE id = 3;
```

Sem alterar a API, `GET /livros/3` deve mostrar o preço **35,00**. O `SELECT` da rota lê o valor atualizado diretamente do banco.

Se o `UPDATE` fosse executado sem `WHERE`, o preço de **todos os livros** seria alterado para `35,00`.

## Parte 5 — Todos conectados?

O banco do projeto contém três livros. O código configura a conexão MySQL e consulta a tabela para listar e buscar por ID. A conexão de cada integrante precisa ser marcada conforme a execução em sua máquina.

| Integrante | Conectado ao MySQL? | `GET /livros` com 3 livros? | `GET /livros/3` com O Hobbit? |
|---|---|---|---|
| Vitor Hugo dos Santos Campos | __ | __ | __ |
| Guilherme de Souza Barbosa | __ | __ | __ |
| Isadora Costa Campanari | __ | __ | __ |
| Gabriel Nunes Lopes | __ | __ | __ |

**Quem ainda não chegou em alguma etapa?** __

## Situação da atividade

- [x] Parte 1 — resultados da consulta identificados; Workbench conferido pelo grupo.
- [x] Parte 2 — lacunas preenchidas e código correspondente presente no projeto.
- [x] Parte 3 — resultados previstos conferidos no código.
- [x] Parte 4 — resultado do `UPDATE` e efeito de remover o `WHERE` identificados.
- [ ] Parte 5 — confirmação individual de conexão e respostas.
- [ ] Commit e push do piloto.
