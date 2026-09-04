class Pessoa {
  #email;

  constructor(nome, email) {
    this.nome = nome;
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  exibirNome() {
    console.log(`Nome: ${this.nome}`);
  }

  exibirEmail() {
    console.log(`Email: ${this.#email}`);
  }

  apresentar() {
    this.exibirNome();
    this.exibirEmail();
  }
}

module.exports = Pessoa;
