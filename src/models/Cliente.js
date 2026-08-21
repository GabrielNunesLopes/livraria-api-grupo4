const Pessoa = require("./Pessoa");

class Cliente extends Pessoa {
  #pontosFidelidade;

  constructor(nome, email, pontosFidelidade) {
    // LACUNA 1: Chama o construtor da classe-mãe
    super(nome, email);
    this.#pontosFidelidade = pontosFidelidade;
  }

  get pontosFidelidade() {
    return this.#pontosFidelidade;
  }

  apresentar() {
    // LACUNA 2: Executa a versão original de apresentar()
    super.apresentar();
    console.log("Tipo: Cliente");
    console.log("Pontos: " + this.#pontosFidelidade);
  }
}

module.exports = Cliente;