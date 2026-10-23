function naoEncontrado(req, res, next) {
  res.status(404).json({ erro: "Rota nao encontrada" });
}

module.exports = naoEncontrado;
