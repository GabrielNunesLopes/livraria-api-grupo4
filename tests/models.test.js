const test = require('node:test');
const assert = require('node:assert/strict');
const Funcionario = require('../src/models/Funcionario');

test('Funcionario calcula bônus de 10% do salário', () => {
  const funcionario = new Funcionario('Ana', 'ana@livraria.com', 2000);
  assert.equal(funcionario.calcularBonus(), 200);
});
