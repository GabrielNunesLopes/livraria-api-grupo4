const Livro = require("../models/Livro");

const livros = [];
let proximoId = 1;

criarLivro({
  titulo: "Clean Code",
  autor: "Robert C. Martin",
  preco: 89.9,
  estoque: 12,
});
criarLivro({
  titulo: "Eloquent JavaScript",
  autor: "Marijn Haverbeke",
  preco: 45.0,
  estoque: 20,
});

function listarTodos() {
  return livros;
}

function buscarLivroPorIndice(indice) {
  if (!/^(0|[1-9]\d*)$/.test(String(indice))) {
    return undefined;
  }
  return livros[indice];
}

function buscarLivroPorId(id) {
  return livros.find((livro) => livro.id === Number(id));
}

function criarLivro(dados) {
  const novoLivro = new Livro(
    dados.titulo,
    dados.autor,
    dados.preco,
    dados.estoque,
  );
  novoLivro.id = proximoId;
  proximoId++;
  livros.push(novoLivro);
  return novoLivro;
}

function atualizarLivro(id, dados) {
  const livro = buscarLivroPorId(id);
  if (!livro) return undefined;
  livro.titulo = dados.titulo;
  livro.autor = dados.autor;
  livro.preco = dados.preco;
  livro.estoque = dados.estoque;
  return livro;
}

function atualizarParcialLivro(id, dados) {
  const livro = buscarLivroPorId(id);
  if (!livro) return undefined;
  if (dados.titulo !== undefined) livro.titulo = dados.titulo;
  if (dados.autor !== undefined) livro.autor = dados.autor;
  if (dados.preco !== undefined) livro.preco = dados.preco;
  if (dados.estoque !== undefined) livro.estoque = dados.estoque;
  return livro;
}

function deletarLivro(id) {
  const posicao = livros.findIndex((livro) => livro.id === Number(id));
  if (posicao === -1) return false;
  livros.splice(posicao, 1);
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
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  atualizarParcialLivro,
  deletarLivro,
  listarTodos,
};
