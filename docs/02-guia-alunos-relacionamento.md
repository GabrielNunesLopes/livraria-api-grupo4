# 🔗 Guia do Aluno — O Livro e a sua Categoria
**UC:** Programação Back-End | **Bloco 4 — Aula 31**
**Projeto:** API de Gestão da Livraria (SA1)
---
## O que muda hoje
O Livro mora no banco. A Categoria ainda mora no **array**. E os dois não se conhecem:
| Pergunta | A API sabe responder? |
|---|:---:|
| Quais livros existem? | ✅ |
| Quais categorias existem? | ✅ (mas somem quando o servidor reinicia) |
| **Em que categoria está O Hobbit?** | ❌ |
Hoje a Categoria vai para o banco, e cada livro passa a apontar para a sua categoria.
Três ideias novas:
1. **Chave estrangeira:** uma coluna do livro que guarda o `id` de uma categoria.
2. **`JOIN`:** juntar as duas tabelas numa consulta só, para o livro vir com o **nome** da categoria.
3. **O banco protege a ligação:** ele não deixa apontar para uma categoria que não existe, nem apagar uma categoria que tem livros.
---
## 1. O script novo
Troquem o `src/database/livraria.sql` **inteiro** por este:
```sql
-- Script do banco da Livraria
-- Rode este arquivo inteiro no MySQL Workbench (raio ⚡).
-- Ele apaga e recria tudo: pode rodar de novo sempre que quiser começar do zero.
DROP DATABASE IF EXISTS livraria;
CREATE DATABASE livraria;
USE livraria;
-- A tabela categorias vem primeiro: a tabela livros aponta para ela.
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200)
);
CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
INSERT INTO categorias (nome, descricao) VALUES
  ('Ficção', 'Romances, fantasia e ficção científica'),
  ('Tecnologia', 'Programação, engenharia de software e afins');
INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES
  ('Clean Code', 'Robert C. Martin', 89.90, 12, 2),
  ('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20, 2),
  ('O Hobbit', 'J.R.R. Tolkien', 39.90, 8, 1);
SELECT * FROM livros;
```
O que tem de novo:
| Linha | O que quer dizer |
|---|---|
| `CREATE TABLE categorias` | A Categoria ganha a sua tabela, com os mesmos campos do array |
| `categoria_id INT` | Cada livro guarda o `id` da sua categoria |
| `FOREIGN KEY (categoria_id) REFERENCES categorias(id)` | A **chave estrangeira**: o `categoria_id` precisa ser um `id` que existe em `categorias` |
> ⚠️ A tabela `categorias` vem **antes** da `livros`. Se for depois, o MySQL reclama: a tabela `livros` aponta para uma tabela que ainda não existe.
> ℹ️ Se o script de vocês tinha livros a mais, acrescentem no `INSERT INTO livros`, com o `categoria_id` no fim.
Rodem o script inteiro no Workbench (raio ⚡). O `SELECT` do fim mostra os 3 livros, agora com a coluna `categoria_id`.
---
## 2. A chave estrangeira no Workbench
**O `JOIN` junta as duas tabelas.** Rodem:
```sql
SELECT livros.titulo, categorias.nome
FROM livros
JOIN categorias ON livros.categoria_id = categorias.id;
```
→ cada livro com o **nome** da categoria. O `ON` diz **como** as tabelas se ligam: o `categoria_id` do livro é o `id` da categoria.
**O banco não deixa apontar para o nada.** Rodem:
```sql
INSERT INTO livros (titulo, autor, preco, estoque, categoria_id)
VALUES ('Livro Sem Lar', 'Ninguem', 10, 1, 99);
```
→ erro **1452**, `Cannot add or update a child row: a foreign key constraint fails`. Não existe categoria 99.
**O banco não deixa abandonar livros.** Rodem:
```sql
DELETE FROM categorias WHERE id = 1;
```
→ erro **1451**, `Cannot delete or update a parent row: a foreign key constraint fails`. O Hobbit está na categoria 1.
> 💡 **A chave estrangeira é uma promessa: todo `categoria_id` aponta para uma categoria que existe.** O banco cuida dela sozinho.
---
## 3. A Categoria no banco
É o mesmo molde do Livro, da aula 29: SQL com `?`, `await`, `insertId` e `affectedRows`.
### 3.1 — No service
Troquem o `src/services/categoriaService.js` **inteiro** por:
```javascript
// SERVICE: executa a lógica de Categoria.
const { db } = require("../config/db");
async function listarCategorias(filtros) {
  const [linhas] = await db.query("SELECT * FROM categorias");
  let resultado = linhas;
  if (filtros.nome) {
    resultado = resultado.filter((categoria) =>
      categoria.nome.toLowerCase().includes(filtros.nome.toLowerCase()),
    );
  }
  return resultado;
}
async function buscarCategoriaPorId(id) {
  const [linhas] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
  return linhas[0];
}
function validarCategoria(dados, completo) {
  if (!dados) return "Envie os dados da categoria em JSON";
  if (completo && !dados.nome) return "O nome e obrigatorio";
  if (dados.nome !== undefined && (typeof dados.nome !== "string" || dados.nome.length < 3)) {
    return "O nome deve ter pelo menos 3 letras";
  }
  return null;
}
async function criarCategoria(dados) {
  const [resultado] = await db.query(
    "INSERT INTO categorias (nome, descricao) VALUES (?, ?)",
    [dados.nome, dados.descricao],
  );
  return await buscarCategoriaPorId(resultado.insertId);
}
async function atualizarCategoria(id, dados) {
  const [resultado] = await db.query(
    "UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?",
    [dados.nome, dados.descricao, id],
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarCategoriaPorId(id);
}
async function atualizarParcialCategoria(id, dados) {
  const categoria = await buscarCategoriaPorId(id);
  if (!categoria) return null;
  if (dados.nome !== undefined) categoria.nome = dados.nome;
  if (dados.descricao !== undefined) categoria.descricao = dados.descricao;
  return await atualizarCategoria(id, categoria);
}
async function deletarCategoria(id) {
  const [resultado] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}
module.exports = {
  validarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  atualizarParcialCategoria,
  deletarCategoria,
};
```
> 💡 O array `categorias`, o `proximoId` e as duas chamadas `criarCategoria({...})` sumiram. As categorias de exemplo agora moram no `livraria.sql`, igual aos livros.
### 3.2 — No controller
No `src/controllers/categoriaController.js`, as **seis** funções (`listar`, `buscarPorId`, `criar`, `atualizar`, `atualizarParcial` e `deletar`) ganham `async` na frente e `await` antes do `categoriaService...`.
Exemplo, a primeira:
```javascript
async function listar(req, res) {
  const categorias = await categoriaService.listarCategorias(req.query);
  res.status(200).json(categorias);
}
```
> ⚠️ O `validarCategoria` **não** leva `await`: ele não vai ao banco.
**Testar:**
| Requisição | Esperado |
|---|---|
| `GET /categorias` | 200, Ficção e Tecnologia |
| `GET /categorias/99999` | 404 |
| `POST /categorias` com `{ "nome": "Infantil", "descricao": "Livros para criancas" }` | 201, `id` 3 |
| `PATCH /categorias/3` com `{ "descricao": "De 6 a 10 anos" }` | 200 |
| `DELETE /categorias/3` | 204 |
| Reiniciem o servidor e deem `GET /categorias` | As categorias continuam lá |
---
## 4. O Livro com a sua categoria
Tudo no `src/services/livroService.js`.
### 4.1 — O `JOIN` nas duas buscas
No `listarLivros`, troquem a linha do `db.query` por:
```javascript
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id",
  );
```
No `buscarLivroPorId`, a mesma consulta, com o `WHERE` no fim:
```javascript
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.id = ?",
    [id],
  );
```
| Pedaço | O que quer dizer |
|---|---|
| `livros.*` | Todas as colunas do livro |
| `categorias.nome AS categoria` | O nome da categoria, com o apelido `categoria` |
| `LEFT JOIN` | Traz **todos** os livros, até os que não têm categoria |
| `WHERE livros.id = ?` | O `id` **do livro** |
> ⚠️ É `WHERE livros.id`, e não só `WHERE id`. As duas tabelas têm uma coluna `id`, e o MySQL não sabe de qual vocês estão falando.
### 4.2 — O `INSERT` e o `UPDATE` com a categoria
No `criarLivro`, mais uma coluna, mais um `?`, mais um valor:
```javascript
    "INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES (?, ?, ?, ?, ?)",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria_id],
```
No `atualizarLivro`, o mesmo:
```javascript
    "UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ?, categoria_id = ? WHERE id = ?",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria_id ?? null, id],
```
> 💡 **5 colunas, 5 `?`, 5 valores** no `INSERT`. **6 `?`, 6 valores** no `UPDATE`: o último continua sendo o `id`.
### 4.3 — O `PATCH`
No `atualizarParcialLivro`, junto das outras quatro linhas `if`, acrescentem:
```javascript
  if (dados.categoria_id !== undefined) livro.categoria_id = dados.categoria_id;
```
### 4.4 — A validação
No `validarLivro`, antes do `return null;` do fim, acrescentem:
```javascript
  if (
    dados.categoria_id !== undefined &&
    dados.categoria_id !== null &&
    (!Number.isInteger(dados.categoria_id) || dados.categoria_id < 1)
  ) {
    return "O categoria_id deve ser um numero inteiro positivo ou nulo";
  }
```
**Testar:**
| Requisição | Esperado |
|---|---|
| `GET /livros` | 200, cada livro com `"categoria_id"` e `"categoria"` |
| `GET /livros/3` | 200, O Hobbit com `"categoria": "Ficção"` |
| `POST /livros` com A Revolução dos Bichos e `"categoria_id": 1` | 201, com `"categoria": "Ficção"` |
| `POST /livros` sem `categoria_id` | 201, com `"categoria": null` (livro sem categoria) |
| `PATCH /livros/3` com `{ "categoria_id": 2 }` | 200, O Hobbit em Tecnologia |
| `POST /livros` com `"categoria_id": "abc"` | 400 |
> ℹ️ O `PUT` troca **tudo**. Na query do `UPDATE`, use `dados.categoria_id ?? null` para que um campo ausente seja enviado ao MySQL como `NULL` (e não `undefined`). Assim, um `PUT` sem `categoria_id` deixa o livro sem categoria. Para mudar só um campo, é o `PATCH`.
---
## 5. Quando a chave estrangeira recusa
Agora testem pela API o que vocês viram no Workbench:
| Requisição | Hoje | Código no terminal |
|---|:---:|---|
| `POST /livros` com `"categoria_id": 99999` | 500 | `ER_NO_REFERENCED_ROW_2` |
| `DELETE /categorias/1` | 500 | `ER_ROW_IS_REFERENCED_2` |
Os dois não são bug: quem pediu errado foi o **cliente**. No `src/middlewares/tratarErros.js`, **antes** do último `res.status(500)`, acrescentem:
```javascript
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    res.status(400).json({ erro: "A categoria informada nao existe" });
    return;
  }
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    res.status(409).json({ erro: "A categoria tem livros e nao pode ser apagada" });
    return;
  }
```
| Status | Quer dizer |
|:---:|---|
| **400** | O cliente mandou um dado errado: a categoria 99999 não existe |
| **409** | **Conflito**: o pedido faz sentido, mas bate com o que já está no banco. A categoria só pode ser apagada depois que os livros dela mudarem de categoria |
**Testar:**
| Requisição | Esperado |
|---|---|
| `POST /livros` com `"categoria_id": 99999` | 400 |
| `PATCH /livros/3` com `{ "categoria_id": 99999 }` | 400 |
| `DELETE /categorias/1` | 409 |
| `DELETE` de uma categoria nova, sem livros | 204 |
---
## 6. A coleção testa o relacionamento
Na coleção do grupo, criem a pasta **Relacionamento** com três requisições (o passo a passo é o mesmo da aula 30, guia, seção 5):
| Requisição | Método e URL | Corpo | Teste |
|---|---|---|---|
| **Livro vem com a categoria** | `GET {{baseUrl}}/livros/1` | — | Status 200 e categoria `Tecnologia` |
| **Livro com categoria inexistente** | `POST {{baseUrl}}/livros` | Um livro completo com `"categoria_id": 99999` | Status 400 |
| **Apagar categoria com livros** | `DELETE {{baseUrl}}/categorias/1` | — | Status 409 |
Na primeira, em **Scripts → Post-response**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Veio o nome da categoria", function () {
    pm.expect(pm.response.json().categoria).to.eql("Tecnologia");
});
```
Nas outras duas, só o teste de status, com o número certo (400 e 409).
Rodem a coleção **inteira** duas vezes. Exportem por cima do `postman/livraria.postman_collection.json`.
---
## 💥 Erros comuns
| Sintoma | Causa | Solução |
|---|---|---|
| `Failed to open the referenced table 'categorias'` ao rodar o script | A tabela `livros` veio antes da `categorias` | `categorias` primeiro |
| Tudo dá 500, terminal com `ER_NO_SUCH_TABLE ... categorias` | O código é novo, mas o banco é o antigo | Rodem o script novo |
| `GET /livros/1` dá 500, terminal com `ER_NON_UNIQ_ERROR` | `WHERE id` em vez de `WHERE livros.id` | `WHERE livros.id = ?` |
| `GET /categorias` devolve `{}` | Faltou `await` no controller | `await categoriaService...` |
| O livro foi criado, mas com `"categoria": null` | O `INSERT` ficou sem o `categoria_id` | Seção 4.2: 5 colunas, 5 `?`, 5 valores |
| `Column count doesn't match value count` | 5 colunas e 4 `?` | Contem de novo |
| O livro sem categoria sumiu da lista | `JOIN` no lugar de `LEFT JOIN` | `LEFT JOIN` |
| `POST /livros` dá 400 "A categoria informada nao existe", mas a categoria acabou de ser criada | A Categoria ainda está no array, e o banco não conhece a categoria nova | Seção 3 |
| `DELETE /categorias/1` ainda dá 500 | O código no `if` está diferente do terminal | Copiem do terminal, letra por letra |
---
## 📎 Cola rápida
```sql
-- A chave estrangeira, no CREATE TABLE do lado que aponta
categoria_id INT,
FOREIGN KEY (categoria_id) REFERENCES categorias(id)
-- O JOIN: juntar as tabelas pela ligação
SELECT livros.*, categorias.nome AS categoria
FROM livros
LEFT JOIN categorias ON livros.categoria_id = categorias.id
```
| Código no terminal | Quer dizer | Status |
|---|---|:---:|
| `ER_NO_REFERENCED_ROW_2` | Apontou para uma categoria que não existe | 400 |
| `ER_ROW_IS_REFERENCED_2` | Tentou apagar uma categoria que tem livros | 409 |
| `ER_NON_UNIQ_ERROR` | `id` sem dizer de qual tabela | 500 (bug: corrijam o SQL) |
