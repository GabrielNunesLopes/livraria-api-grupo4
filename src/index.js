const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da Livraria no ar!');
});

app.get('/sobre', (req, res) => {
  res.send('Livraria SENAI - Trabalho de PBE, turma 1-2026-SESI_DEV_OC_1');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
