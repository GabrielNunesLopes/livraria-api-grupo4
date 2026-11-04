# Guia do Aluno — Quando o Problema É o Banco

**UC:** Programação Back-End | **Bloco 4 — Aula 30**  
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que muda hoje

O Livro está inteiro no banco. Mas quando o **banco** recusa alguma coisa, a API responde sempre:

```json
{ "erro": "Erro interno no servidor" }
```

com status **500**. E nem sempre a culpa é de quem programou.

Hoje a API aprende a ler o erro do banco e escolher o status certo.

---

## 1. Três erros para provocar

Nos dois primeiros, mandem o `POST` pelo Postman com **Body → raw → JSON**. Em cada um, anotem o status e a mensagem que voltaram.

**Título grande demais.** A coluna `titulo` aceita até 150 letras. Este tem 182. `POST /livros` com:

```json
{
  "titulo": "A Saga Interminavel do Livro Que Nunca Acabava de Ter Titulo A Saga Interminavel do Livro Que Nunca Acabava de Ter Titulo A Saga Interminavel do Livro Que Nunca Acabava de Ter Titulo",
  "autor": "J.R.R. Tolkien",
  "preco": 39.9,
  "estoque": 8
}
```

**Preço grande demais.** `POST /livros` com:

```json
{ "titulo": "O Livro Mais Caro", "autor": "Ninguem", "preco": 123456789012, "estoque": 1 }
```

**Banco desligado (simulado).** No `.env`, troquem `DB_PORT=3306` por `DB_PORT=3399` e digitem `rs` no terminal do nodemon. Agora `GET /livros`.

> Depois, **voltem para `DB_PORT=3306`** e `rs` de novo.

Nos três, a resposta é a mesma: **500**, "Erro interno no servidor".

---

## 2. O código do erro

No `src/middlewares/tratarErros.js`, a primeira linha hoje é:

```js
console.log("ERRO:", err.message);
```

Troquem por esta, que mostra também o **código**:

```js
console.log("ERRO:", err.code, err.message);
```

Provoquem os erros de novo e leiam o terminal:

| Erro | Código no terminal | Quer dizer |
|---|---|---|
| Título grande demais | `ER_DATA_TOO_LONG` | Dado longo demais |
| Preço grande demais | `ER_WARN_DATA_OUT_OF_RANGE` | Fora do limite |
| Banco desligado | `ECONNREFUSED` | Conexão recusada: ninguém atendeu |

> Se aparecer `ERRO: undefined ...`, o erro **não veio do banco**.

---

## 3. Quem errou?

| Status | Quem | Quando |
|---|---|---|
| **400** | O cliente | Mandou um valor que não cabe no banco |
| **500** | O programador | Erro no código ou no SQL |
| **503** | Ninguém | O banco está **fora do ar**: tente mais tarde |

> **503 não é "eu errei". É "agora não dá, volta daqui a pouco".**

---

## 4. O `tratarErros` novo

Troquem o `src/middlewares/tratarErros.js` inteiro por:

```js
function tratarErros(err, req, res, next) {
  console.log("ERRO:", err.code, err.message);

  if (err.code === "ECONNREFUSED") {
    res.status(503).json({ erro: "Banco de dados indisponivel" });
    return;
  }

  if (err.code === "ER_DATA_TOO_LONG" || err.code === "ER_WARN_DATA_OUT_OF_RANGE") {
    res.status(400).json({ erro: "Algum valor e grande demais para o banco" });
    return;
  }

  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;
```

O mesmo molde do controller: `if`, responde, `return`. Se nenhum `if` pegar, sobra o **500**.

> `||` quer dizer **"ou"**: os dois códigos de "grande demais" dão a mesma resposta.

**Testar:**

| Erro | Esperado |
|---|---|
| Título grande demais | **400** |
| Preço grande demais | **400** |
| Porta errada no `.env` | **503** |

---

## 5. A coleção testa os erros

Na coleção da Atividade 15:

1. Na coleção, **...** → **Add folder**. Nome: **Erros do banco**.
2. Na pasta, **...** → **Add request**. Nome: **Titulo grande demais**.
3. Método **POST**, URL `{{baseUrl}}/livros`.
4. **Body → raw → JSON**: colem o corpo do título grande demais (seção 1).
5. Em **Scripts → Post-response**, colem:

```js
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});
```

6. **Ctrl + S** e **Send**. O teste aparece verde em **Test Results**.
7. Repitam os passos 2 a 6 para a requisição **Preco grande demais**, com o corpo do preço grande demais.

Rodem **só a pasta** no Runner (**...** da pasta → **Run folder**): 2 de 2.

Exportem: na coleção, **...** → **Export** → **Collection v2.1**. Salvem **por cima** do arquivo `postman/livraria.postman_collection.json` do repositório.

> O 503 não entra na coleção: para testar, o banco precisaria estar desligado, e o resto da coleção pararia de funcionar. Ele fica como teste manual.

---

## 6. Rodar a coleção que está no repositório

Quem não criou as requisições pega a coleção pelo `git pull`:

1. No Postman, **Import** → escolham o arquivo `postman/livraria.postman_collection.json`.
2. Se o Postman perguntar se substitui a coleção que já existe: **Replace**.
3. Rodem o `livraria.sql` de novo e reiniciem a API.
4. Na coleção, **...** → **Run collection** → **Run**.

As pastas antigas continuam passando, e a pasta Erros do banco passa também.

---

## 7. JSON mal escrito

Um JSON com vírgula sobrando no fim (`{ "titulo": "X", }`) não é JSON. Quem recusa é o `express.json()`, antes de chegar no controller. Hoje isso cai no 500, mas a culpa é do **cliente**.

No `tratarErros.js`, **antes** do último `res.status(500)`, acrescentem:

```js
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ erro: "O JSON enviado esta mal escrito" });
    return;
  }
```

> Aqui é `err.type`, e não `err.code`: o erro não veio do banco.

---

## Erros comuns

| Sintoma | Causa | Solução |
|---|---|---|
| Título longo ainda dá 500 | O código no `if` está diferente | Copiem do terminal: `ER_DATA_TOO_LONG` |
| Porta errada dá 500, não 503 | Mudaram a senha ou o host, não a porta | Só o `DB_PORT` |
| Mudei o `.env` e nada mudou | O nodemon não viu | `rs` + Enter |
| Toda requisição de livro dá 503 | Esqueceram a porta errada | `DB_PORT=3306` e `rs` |
| O teste dá 400 com "O titulo e obrigatorio" | Faltou campo no corpo | O corpo precisa dos 4 campos |
| Título longo dá 201 | O MySQL deste notebook corta o texto em vez de recusar | Sigam com o preço gigante, que dá erro mesmo assim |
| `{{baseUrl}}` em vermelho | A variável da coleção não existe neste Postman | Importem a coleção do repositório (seção 6) |
| JSON mal escrito ainda dá 500 | O `if` novo ficou depois do `res.status(500)` | Ele vai **antes** |

---

## Cola rápida

| Código do erro | Status |
|---|---|
| `ECONNREFUSED` | 503 |
| `ER_DATA_TOO_LONG` | 400 |
| `ER_WARN_DATA_OUT_OF_RANGE` | 400 |
| `err.type` = `entity.parse.failed` (JSON mal escrito) | 400 |
| qualquer outro | 500 |

```text
4xx → o CLIENTE errou        400 dados errados   404 não existe
5xx → o SERVIDOR não conseguiu   500 bug   503 banco fora do ar
```