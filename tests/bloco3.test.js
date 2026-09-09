const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

test("Livro serializa preco e estoque com toJSON", () => {
  const Livro = require(path.join(root, "src/models/Livro"));
  const livro = new Livro("Clean Code", "Robert C. Martin", 89.9, 12);
  assert.deepEqual(JSON.parse(JSON.stringify(livro)), {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    preco: 89.9,
    estoque: 12,
  });
});

test("livroService lista e busca por indice", () => {
  const service = require(path.join(root, "src/services/livroService"));
  assert.equal(service.listarLivros().length, 2);
  assert.equal(service.buscarLivroPorIndice(0).titulo, "Clean Code");
  assert.equal(service.buscarLivroPorIndice(99), undefined);
});

test("controller retorna 404 para indice inexistente", () => {
  const controller = require(
    path.join(root, "src/controllers/livroController"),
  );
  const req = { params: { indice: "99" } };
  const state = { statusCode: 200, body: null };
  const res = {
    status(code) {
      state.statusCode = code;
      return this;
    },
    json(body) {
      state.body = body;
      return this;
    },
  };
  controller.buscarPorIndice(req, res);
  assert.equal(state.statusCode, 404);
  assert.deepEqual(state.body, { erro: "Livro nao encontrado" });
});

test("livroRoutes declara listagem e busca por indice", () => {
  const source = fs.readFileSync(
    path.join(root, "src/routes/livroRoutes.js"),
    "utf8",
  );
  assert.match(
    source,
    /router\.get\(\s*["']\/["']\s*,\s*livroController\.listar\s*\)/,
  );
  assert.match(
    source,
    /router\.get\(\s*["']\/:indice["']\s*,\s*livroController\.buscarPorIndice\s*\)/,
  );
});
