const Pessoa = require('./Pessoa');

const PERCENTUAL_BONUS = 0.1;
const CASAS_DECIMAIS_MOEDA = 2;

class Funcionario extends Pessoa {
  #salario;

  constructor(nome, email, salario) {
    super(nome, email);
    this.#salario = salario;
  }

  get salario() {
    return this.#salario;
  }

  calcularBonus() {
    return this.#salario * PERCENTUAL_BONUS;
  }

  exibirDadosProfissionais() {
    console.log('Tipo: Funcionario');
    console.log(`Bonus: R$ ${this.calcularBonus().toFixed(CASAS_DECIMAIS_MOEDA)}`);
  }

  apresentar() {
    super.apresentar();
    this.exibirDadosProfissionais();
  }
}

module.exports = Funcionario;
