const test = require("node:test");
const assert = require("node:assert/strict");

const categoriaService = require("../src/services/categoriaService");

test("categorias possuem IDs, CRUD completo e filtro por nome", () => {
  const iniciais = categoriaService.listarCategorias();
  assert.deepEqual(iniciais.map((categoria) => categoria.id), [1, 2]);
  assert.equal(iniciais[0].toJSON().id, 1);
  assert.deepEqual(
    categoriaService.listarCategorias({ nome: "tec" }).map((item) => item.nome),
    ["Tecnologia"],
  );

  const criada = categoriaService.criarCategoria({
    nome: "Infantil",
    descricao: "Livros para criancas",
  });
  assert.equal(criada.id, 3);
  assert.equal(
    categoriaService.atualizarParcialCategoria(3, {
      descricao: "De 6 a 10 anos",
    }).descricao,
    "De 6 a 10 anos",
  );
  assert.equal(
    categoriaService.atualizarCategoria(3, {
      nome: "Infantojuvenil",
      descricao: "Criancas e adolescentes",
    }).nome,
    "Infantojuvenil",
  );
  assert.equal(categoriaService.deletarCategoria(1), true);
  assert.equal(categoriaService.buscarCategoriaPorId(1), undefined);
  assert.equal(categoriaService.atualizarParcialCategoria(99, {}), null);
});
