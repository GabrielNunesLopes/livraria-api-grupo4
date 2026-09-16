const test = require('node:test');
const assert = require('node:assert/strict');
const livroService = require('../src/services/livroService');
const categoriaService = require('../src/services/categoriaService');

test('livroService expõe uma função listar', () => {
  assert.equal(typeof livroService.listar, 'function');
  assert.equal(livroService.listar()[0].titulo, 'Clean Code');
});

test('busca de livro rejeita propriedades do array e indices invalidos', () => {
  for (const indice of ['length', 'constructor', '__proto__', '-1', '1.5', 'abc']) {
    assert.equal(livroService.buscarLivroPorIndice(indice), undefined, indice);
  }
  assert.equal(livroService.buscarLivroPorIndice('0').titulo, 'Clean Code');
});

test('categoriaService expõe uma função listar', () => {
  assert.equal(typeof categoriaService.listar, 'function');
});
