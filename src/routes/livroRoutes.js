const express = require("express");
const livroController = require("../controllers/livroController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

router.get("/", livroController.listar);
router.get("/:id", validarId, livroController.buscarPorId);
router.post("/", livroController.criar);
router.put("/:id", validarId, livroController.atualizar);
router.patch("/:id", validarId, livroController.atualizarParcial);
router.delete("/:id", validarId, livroController.deletar);

module.exports = router;
