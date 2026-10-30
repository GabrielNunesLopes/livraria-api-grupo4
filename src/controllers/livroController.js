const livroService = require("../services/livroService");

async function buscarPorId(req, res) {
  const id = req.params.id;
  const livro = await livroService.buscarLivroPorId(id);
  if (!livro) {
    res.status(404).json({ erro: "Livro nao encontrado" });
    return;
  }
  res.json(livro); 
}
async function criar(req, res) {
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novoLivro = await livroService.criarLivro(req.body);
  res.status(201).json(novoLivro);
}

async function atualizar(req, res) {
  const erro = livroService.validarLivro(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const livro = await livroService.atualizarLivro(req.params.id, req.body);
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

async function atualizarParcial(req, res) {
  const erro = livroService.validarLivro(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const livro = await livroService.atualizarParcialLivro(
    req.params.id,
    req.body,
  );
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

async function deletar(req, res) {
  const removido = await livroService.deletarLivro(req.params.id);
  if (!removido) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(204).send();
}

async function listar(req, res) {
  const filtros = req.query;
  const livros = await livroService.listarLivros(filtros);
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
