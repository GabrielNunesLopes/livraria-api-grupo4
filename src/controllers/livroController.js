const livroService = require("../services/livroService");

function buscarPorId(req, res) {
  const livro = livroService.buscarLivroPorId(req.params.id);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.json(livro);
}
function criar(req, res) {
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novoLivro = livroService.criarLivro(req.body);
  res.status(201).json(novoLivro);
}

function atualizar(req, res) {
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const livro = livroService.atualizarLivro(req.params.id, req.body);
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

function atualizarParcial(req, res) {
  const erro = livroService.validarLivro(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const livro = livroService.atualizarParcialLivro(req.params.id, req.body);
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

function deletar(req, res) {
  const removido = livroService.deletarLivro(req.params.id);
  if (!removido) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(204).send();
}

function listar(req, res) {
  const filtros = req.query;
  const livros = livroService.listarLivros(filtros);
  res.status(200).json(livros);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
};
