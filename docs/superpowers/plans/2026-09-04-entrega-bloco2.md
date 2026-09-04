# Entrega Consolidada do Bloco 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Concluir a Atividade 09 do Bloco 2 alinhando UML, esqueleto MVC, Clean Code, execução Express e README sem adicionar banco de dados nem implementar Pedido/ItemPedido em código.

**Architecture:** Manter o Express em `src/index.js`, conectar rotas de Livro e Categoria a controllers e services simples em memória, preservar os models existentes e aplicar refatorações pequenas e verificáveis de Clean Code. O diagrama continuará sendo a referência visual das classes e relacionamentos, enquanto o README documentará a estrutura final e a refatoração.

**Tech Stack:** Node.js, Express 5, CommonJS, Nodemon, `node:test`.

**Spec:** `docs/superpowers/specs/2026-09-04-entrega-bloco2-design.md`

## Global Constraints

- Não adicionar banco de dados.
- Não criar `Pedido.js` nem `ItemPedido.js`; essas entidades permanecem somente no diagrama.
- Manter o escopo da atividade: Livro e Categoria como referências funcionais do fluxo MVC.
- Preservar `module.exports` em todas as classes de `src/models/`.
- `npm run dev` deve iniciar o servidor sem erro.
- Atualizar o README com diagrama final, estrutura MVC e frase de Clean Code.

---

### Task 1: Baseline e testes de comportamento

**Files:**
- Create: `tests/models.test.js`
- Create: `tests/services.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: `Funcionario#calcularBonus()`, getters de `Livro`/`Categoria`.
- Produces: script `npm test` e cobertura dos comportamentos que serão preservados/refatorados.

- [ ] **Step 1: Criar testes de model**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const Funcionario = require('../src/models/Funcionario');

test('Funcionario calcula bônus de 10% do salário', () => {
  const funcionario = new Funcionario('Ana', 'ana@livraria.com', 2000);
  assert.equal(funcionario.calcularBonus(), 200);
});
```

- [ ] **Step 2: Criar testes de service antes da implementação**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const livroService = require('../src/services/livroService');

test('livroService expõe uma função listar', () => {
  assert.equal(typeof livroService.listar, 'function');
});
```

- [ ] **Step 3: Adicionar script de teste**

```json
"test": "node --test"
```

- [ ] **Step 4: Rodar `npm test` e confirmar RED**

Run: `npm test`
Expected: falha porque `livroService.listar` ainda não existe.

---

### Task 2: Referência funcional de services/controllers/routes

**Files:**
- Modify: `src/services/livroService.js`
- Modify: `src/services/categoriaService.js`
- Modify: `src/controllers/livroController.js`
- Modify: `src/controllers/categoriaController.js`
- Modify: `src/routes/livroRoutes.js`
- Modify: `src/routes/categoriaRoutes.js`
- Modify: `src/index.js`

**Interfaces:**
- Produces: `livroService.listar()`, `categoriaService.listar()`, controllers `listar(req,res)` e routers Express montados em `/livros` e `/categorias`.

- [ ] **Step 1: Implementar services mínimos em memória**

```js
function listar() {
  return [];
}

module.exports = { listar };
```

- [ ] **Step 2: Implementar controllers de listagem**

```js
const livroService = require('../services/livroService');

function listar(req, res) {
  res.json(livroService.listar());
}

module.exports = { listar };
```

- [ ] **Step 3: Implementar routers Express**

```js
const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();
router.get('/', livroController.listar);

module.exports = router;
```

- [ ] **Step 4: Montar routers no servidor**

```js
app.use('/livros', livroRoutes);
app.use('/categorias', categoriaRoutes);
```

- [ ] **Step 5: Rodar `npm test` e confirmar GREEN**

Run: `npm test`
Expected: todos os testes passam.

---

### Task 3: Clean Code nos models e servidor

**Files:**
- Modify: `src/models/Funcionario.js`
- Modify: `src/models/Pessoa.js`
- Modify: `src/index.js`

**Interfaces:**
- Preserva: `Funcionario#calcularBonus()` e `Pessoa#apresentar()`.
- Produces: constantes nomeadas e decomposição de apresentação em métodos menores.

- [ ] **Step 1: Extrair números mágicos**

```js
const PERCENTUAL_BONUS = 0.1;
```

- [ ] **Step 2: Extrair responsabilidades de apresentação**

```js
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
```

- [ ] **Step 3: Nomear porta padrão**

```js
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
```

- [ ] **Step 4: Rodar `npm test`**

Run: `npm test`
Expected: todos os testes continuam passando.

---

### Task 4: Documentação e conformidade da atividade

**Files:**
- Modify: `README.md`
- Review: `docs/diagrama-Classes.png`

**Interfaces:**
- Produces: documentação final da Atividade 09 e checklist do Bloco 2.

- [ ] **Step 1: Conferir o diagrama existente contra os models reais**
- [ ] **Step 2: Atualizar README com `![Diagrama UML final](docs/diagrama-Classes.png)`**
- [ ] **Step 3: Atualizar árvore MVC incluindo testes e arquivos reais**
- [ ] **Step 4: Registrar a refatoração de 02/09**

Texto mínimo:

```md
Em 02/09, o código foi refatorado com extração de constantes nomeadas e divisão de responsabilidades em métodos menores, reduzindo números mágicos e melhorando a legibilidade.
```

- [ ] **Step 5: Registrar que `Pedido` e `ItemPedido` permanecem somente no UML**

---

### Task 5: Verificação final e entrega

**Files:**
- Review: projeto completo

**Interfaces:**
- Produces: evidência de que o projeto instala, testa e inicia corretamente.

- [ ] **Step 1: Rodar `npm install`**
- [ ] **Step 2: Rodar `npm test`**
- [ ] **Step 3: Iniciar `npm run dev` e validar `/`, `/sobre`, `/livros` e `/categorias`**
- [ ] **Step 4: Revisar checklist do PDF linha a linha**
- [ ] **Step 5: Gerar commit final com a mensagem exigida**

```bash
git add .
git commit -m "docs: entrega consolidada do Bloco 2 - UML, esqueleto MVC e clean code"
```
