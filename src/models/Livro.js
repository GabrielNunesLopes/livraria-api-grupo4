class Livro {
  #titulo;
  #autor;
  #preco;

  constructor(titulo, autor, preco) {
    this.#titulo = titulo;
    this.#autor = autor;
    this.#preco = preco;
  }

  get titulo() {
    return this.#titulo;
  }

  set titulo(novoTitulo) {
    this.#titulo = novoTitulo;
  }

  get autor() {
    return this.#autor;
  }

  set autor(novoAutor) {
    this.#autor = novoAutor;
  }

  get preco() {
    return this.#preco;
  }

  set preco(novoPreco) {
    this.#preco = novoPreco;
  }
}

module.exports = Livro;
