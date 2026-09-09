class Livro {
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque) {
    this.titulo = titulo;
    this.autor = autor;
    this.#preco = preco;
    this.#estoque = estoque;
  }

  toJSON() {
    return {
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
    };
  }
}

module.exports = Livro;
