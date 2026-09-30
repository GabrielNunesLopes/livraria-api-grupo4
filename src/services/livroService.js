const Livro = require("../models/Livro");

const livros = [
  new Livro("Clean Code", "Robert C. Martin", 89.9, 12),
  new Livro("Eloquent JavaScript", "Marijn Haverbeke", 45.0, 20),
];

function listarTodos() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  if (!/^(0|[1-9]\d*)$/.test(String(indice))) {
    return undefined;
  }
  return livros[indice];
}

function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
  );
  livros.push(novoLivro);
  return novoLivro;
}

function atualizarLivro(indice, dados) {
  const livro = buscarLivroPorIndice(indice);
  if (!livro) return undefined;
  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  return livro;
}

function atualizarParcialLivro(indice, dados) {
  const livro = buscarLivroPorIndice(indice);
  if (!livro) return undefined;
  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  return livro;
}

function deletarLivro(indice) {
  if (!buscarLivroPorIndice(indice)) return false;
  livros.splice(Number(indice), 1);
  return true;
}

function listarLivros(filtros = {}) {
  let resultado = livros;
  if (filtros.autor) {
    resultado = resultado.filter((livro) =>
      livro.autor.toLowerCase().includes(filtros.autor.toLowerCase()),
    );
  }
  if (filtros.precoMax !== undefined) {
    resultado = resultado.filter(
      (livro) => livro.preco <= Number(filtros.precoMax),
    );
  }
  return resultado;
}
module.exports = {
  listar: listarLivros,
  listarLivros,
  buscarLivroPorIndice,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
  listarTodos,
};
