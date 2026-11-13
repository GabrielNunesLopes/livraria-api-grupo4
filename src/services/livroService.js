const { db } = require("../config/db");

async function listarTodos() {
  return listarLivros();
}

async function buscarLivroPorIndice(indice) {
  if (!/^(0|[1-9]\d*)$/.test(String(indice))) {
    return undefined;
  }
  const [linhas] = await db.query(
    "SELECT * FROM livros ORDER BY id LIMIT 1 OFFSET ?",
    [Number(indice)],
  );
  return linhas[0];
}

async function buscarLivroPorId(id) {
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.id = ?",
    [id],
  );
  return linhas[0];
}

function validarLivro(dados, completo) {
  if (!dados) return "Envie os dados do livro em JSON";
  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.autor) return "O autor e obrigatorio";
  if (completo && dados.preco === undefined) return "O preco e obrigatorio";
  if (completo && dados.estoque === undefined) return "O estoque e obrigatorio";
  if (
    dados.titulo !== undefined &&
    (typeof dados.titulo !== "string" || dados.titulo.trim() === "")
  ) {
    return "O titulo deve ser um texto";
  }
  if (
    dados.autor !== undefined &&
    (typeof dados.autor !== "string" || dados.autor.trim() === "")
  ) {
    return "O autor deve ser um texto";
  }
  if (
    dados.preco !== undefined &&
    (typeof dados.preco !== "number" || dados.preco < 0)
  ) {
    return "O preco deve ser um numero maior ou igual a zero";
  }
  if (
    dados.estoque !== undefined &&
    (!Number.isInteger(dados.estoque) || dados.estoque < 0)
  ) {
    return "O estoque deve ser um numero inteiro maior ou igual a zero";
  }
  if (
    dados.categoria_id !== undefined &&
    dados.categoria_id !== null &&
    (!Number.isInteger(dados.categoria_id) || dados.categoria_id < 1)
  ) {
    return "O categoria_id deve ser um numero inteiro positivo ou nulo";
  }
  return null;
}

async function criarLivro(dados) {
  const [resultado] = await db.query(
    "INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES (?, ?, ?, ?, ?)",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria_id ?? null],
  );
  return await buscarLivroPorId(resultado.insertId);
}

async function atualizarLivro(id, dados) {
  const [resultado] = await db.query(
    "UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ?, categoria_id = ? WHERE id = ?",
    [dados.titulo, dados.autor, dados.preco, dados.estoque, dados.categoria_id ?? null, id],
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarLivroPorId(id);
}

async function atualizarParcialLivro(id, dados) {
  const livro = await buscarLivroPorId(id);
  if (!livro) return null;
  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  if (dados.categoria_id !== undefined) livro.categoria_id = dados.categoria_id;
  return await atualizarLivro(id, livro);
}

async function deletarLivro(id) {
  const [resultado] = await db.query("DELETE FROM livros WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

async function listarLivros(filtros = {}) {
  const [linhas] = await db.query(
    "SELECT livros.*, categorias.nome AS categoria FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id ORDER BY livros.id",
  );
  let resultado = linhas;
  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase()),
    );
  }
  if (filtros.titulo) {
    resultado = resultado.filter((livro) =>
      livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()),
    );
  }
  if (filtros.precoMax !== undefined) {
    resultado = resultado.filter(
      (livro) => livro.preco <= Number(filtros.precoMax),
    );
  }
  if (filtros.precoMin !== undefined) {
    resultado = resultado.filter(
      (livro) => livro.preco >= Number(filtros.precoMin),
    );
  }
  if (filtros.categoria) {
    resultado = resultado.filter(
      (livro) =>
        livro.categoria !== null &&
        livro.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()),
    );
  }
  return resultado;
}
module.exports = {
  listar: listarLivros,
  listarLivros,
  buscarLivroPorIndice,
  buscarLivroPorId,
  validarLivro,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
  listarTodos,
};
