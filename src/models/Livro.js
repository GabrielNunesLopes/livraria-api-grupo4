class Livro {
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque) {
    this.titulo = titulo;
    this.autor = autor;
    this.#preco = preco;
    this.#estoque = estoque;
  }

  set preco(valor) {
    this.#preco = valor;
  }

  set estoque(valor) {
    this.#estoque = valor;
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
