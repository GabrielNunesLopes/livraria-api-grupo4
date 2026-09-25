const express = require("express");
const routes = require("./routes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const logger = require("./middlewares/logger");

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(logger);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API da Livraria no ar!");
});

app.get("/sobre", (req, res) => {
  res.send("Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1");
});

app.use(routes);
app.use("/categorias", categoriaRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
