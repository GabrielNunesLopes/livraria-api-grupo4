const categoriaService = require("../services/categoriaService");

function listar(req, res) {
  const categorias = categoriaService.listarCategorias(req.query);
  res.status(200).json(categorias);
}

function buscarPorId(req, res) {
  const categoria = categoriaService.buscarCategoriaPorId(req.params.id);
  if (!categoria) {
    return res.status(404).json({ erro: "Categoria não encontrada" });
  }
  return res.status(200).json(categoria);
}

function criar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novaCategoria = categoriaService.criarCategoria(req.body);
  return res.status(201).json(novaCategoria);
}

function atualizar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const categoria = categoriaService.atualizarCategoria(req.params.id, req.body);
  if (!categoria) {
    return res.status(404).json({ erro: "Categoria não encontrada" });
  }
  return res.status(200).json(categoria);
}

function atualizarParcial(req, res) {
  const erro = categoriaService.validarCategoria(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const categoria = categoriaService.atualizarParcialCategoria(
    req.params.id,
    req.body,
  );
  if (!categoria) {
    return res.status(404).json({ erro: "Categoria não encontrada" });
  }
  return res.status(200).json(categoria);
}

function deletar(req, res) {
  const removida = categoriaService.deletarCategoria(req.params.id);
  if (!removida) {
    return res.status(404).json({ erro: "Categoria não encontrada" });
  }
  return res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};
