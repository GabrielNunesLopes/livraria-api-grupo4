const Pessoa = require("./Pessoa");

class Funcionario extends Pessoa {
  #salario;

  constructor(nome, email, salario) {
    super(nome, email);
    // LACUNA 3: Guarda o salário no atributo privado
    this.#salario = salario;
  }

  get salario() {
    return this.#salario;
  }

  calcularBonus() {
    // LACUNA 4: Retorna 10% do salário
    return this.#salario * 0.1;
  }

  apresentar() {
    super.apresentar();
    console.log("Tipo: Funcionario");
    console.log("Bonus: R$ " + this.calcularBonus().toFixed(2));
  }
}

module.exports = Funcionario;