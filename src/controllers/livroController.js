const livroService = require('../services/livroService');

function listar(req, res) {
  res.json(livroService.listar());
}

module.exports = { listar };
