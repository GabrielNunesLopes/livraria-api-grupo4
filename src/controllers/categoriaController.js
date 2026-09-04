const categoriaService = require('../services/categoriaService');

function listar(req, res) {
  res.json(categoriaService.listar());
}

module.exports = { listar };
