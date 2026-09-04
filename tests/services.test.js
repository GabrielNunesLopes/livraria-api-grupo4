const test = require('node:test');
const assert = require('node:assert/strict');
const livroService = require('../src/services/livroService');
const categoriaService = require('../src/services/categoriaService');

test('livroService expõe uma função listar', () => {
  assert.equal(typeof livroService.listar, 'function');
});

test('categoriaService expõe uma função listar', () => {
  assert.equal(typeof categoriaService.listar, 'function');
});
