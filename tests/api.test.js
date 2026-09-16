const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");

test("API inicia e atende as rotas cadastradas", async (t) => {
  const app = require("../src/index");
  const server = app.listen(0, "127.0.0.1");
  t.after(
    () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  );
  await once(server, "listening");
  const base = `http://127.0.0.1:${server.address().port}`;

  for (const [route, expected] of [
    ["/", "API da Livraria no ar!"],
    ["/sobre", "Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1"],
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), expected);
  }

  const livros = await fetch(base + "/livros");
  assert.equal(livros.status, 200);
  assert.equal((await livros.json()).length, 2);
  const livro = await fetch(base + "/livros/0");
  assert.equal(livro.status, 200);
  assert.deepEqual(await livro.json(), {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    preco: 89.9,
    estoque: 12,
  });
  const categorias = await fetch(base + "/categorias");
  assert.equal(categorias.status, 200);
  assert.deepEqual(await categorias.json(), []);

  for (const indice of [
    "99",
    "-1",
    "1.5",
    "abc",
    "length",
    "constructor",
    "__proto__",
  ]) {
    const response = await fetch(base + "/livros/" + indice);
    assert.equal(response.status, 404, indice);
    assert.deepEqual(await response.json(), { erro: "Livro nao encontrado" });
  }
});
