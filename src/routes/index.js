const express = require("express");
const livroRoutes = require("./livroRoutes");

const categoriaRoutes = require("./categoriaRoutes"); 

const router = express.Router();
router.use("/categorias", categoriaRoutes);
router.use("/livros", livroRoutes);

module.exports = router;
