# Atividade 21 — Quando o Banco Recusa

**UC:** Programação Back-End | **Bloco 4 — Aula 30**  
**Projeto:** API de Gestão da Livraria (SA1)  
**Formato:** Em grupo, no repositório do grupo | **Tempo:** 80 minutos  
**Avaliação:** Formativa — CRUD persistido testado

## Revezamento

As mudanças desta atividade envolvem `src/middlewares/tratarErros.js` e `postman/livraria.postman_collection.json`. Para evitar conflitos, trabalhem em revezamento: cada integrante termina sua parte, envia as alterações e avisa o próximo. Quem começa uma parte depois de outra pessoa deve atualizar o repositório antes de trabalhar.

| Ordem | Integrante | Parte |
|---|---|---|
| Todos, ao mesmo tempo | Todos os integrantes | Parte 1 — provocar os erros no próprio notebook |
| 1º | Gabriel Nunes Lopes | Parte 2 — código do erro no terminal |
| Enquanto aguarda | Todos os que aguardam a vez | Parte 3 — identificar quem errou |
| 2º | Isadora Costa Campanari | Parte 4 — tratamento dos erros |
| 3º | Vitor Hugo dos Santos Campos | Parte 5 — testes da coleção |
| 4º | Guilherme de Souza Barbosa | Parte 6 — coleção inteira e JSON mal escrito |

Se o grupo tiver menos de quatro integrantes, alguém faz duas partes seguidas. Enquanto um integrante trabalha, os outros acompanham, preenchem a Parte 3 e, depois de atualizar o repositório, repetem os testes no próprio notebook.

> **Estado deste repositório:** o log do código, as respostas 400/503, o tratamento de JSON mal escrito e os dois testes de limite já estão implementados. Nas partes correspondentes, confiram o código e testem; não dupliquem a pasta ou os testes que já existem.

---

## Parte 1 — Provocar os erros (10 min) — Todos

Antes de começar, executem `src/database/livraria.sql` no Workbench e reiniciem a API. **Esse script apaga e recria o banco `livraria`.** Cada integrante provoca os três erros seguindo a seção 1 do [guia da Aula 30](Atividade30_Quando_o_Problema_e_o_Banco.md) e anota o resultado observado:

| Erro | Status observado | Mensagem observada |
|---|---|---|
| Título grande demais | 400 | `Algum valor e grande demais para o banco` |
| Preço grande demais | 400 | `Algum valor e grande demais para o banco` |
| Banco desligado, com porta errada no `.env` | 503 | `Banco de dados indisponivel` |

Depois de testar a porta errada, voltem para `DB_PORT=3306` e digitem `rs` no terminal do nodemon.

- A porta voltou para `3306` e a API reiniciou? **Sim.**
- Os três resultados foram iguais? **Não. Os dados fora do limite deram 400; a porta recusada deu 503.**
- Quem parece responsável por cada resultado? **O cliente enviou dados fora do limite; o banco estava indisponível na porta errada.**

> Neste repositório atualizado, os dois dados fora do limite devem responder `400` e a porta recusada deve responder `503`. A resposta inicial `500` descrita no guia corresponde ao comportamento antes do tratamento novo.

---

## Parte 2 — O código do erro (10 min) — Gabriel Nunes Lopes

Confira `src/middlewares/tratarErros.js`. O log deve mostrar o código e a mensagem:

```js
console.log("ERRO:", err.code, err.message);
```

Se a linha ainda mostrar somente a mensagem, atualize-a, provoque novamente os erros da Parte 1 e anote o texto exibido depois de `ERRO:`:

| Erro | Código observado no terminal |
|---|---|
| Título grande demais | `ER_DATA_TOO_LONG` |
| Preço grande demais | `ER_WARN_DATA_OUT_OF_RANGE` |
| Banco desligado, com porta errada | `ECONNREFUSED` |

Se aparecer `ERRO: undefined`, o erro não veio do banco. Confiram se o corpo da requisição está correto.

Se houve alteração:

```bash
git add src/middlewares/tratarErros.js
git commit -m "feat: mostra o codigo do erro no terminal"
git push
```

Avisem o grupo. Os demais atualizam o repositório e repetem os testes no próprio notebook. Depois, avisem Isadora.

---

## Parte 3 — Quem errou? (no papel) — Quem estiver esperando

Leiam a seção 3 do guia e preencham:

| Erro | Código | Culpa de quem? | Status certo |
|---|---|---|---|
| Título grande demais | `ER_DATA_TOO_LONG` | Cliente | 400 |
| Preço grande demais | `ER_WARN_DATA_OUT_OF_RANGE` | Cliente | 400 |
| Banco desligado | `ECONNREFUSED` | Ninguém; indisponibilidade temporária | 503 |
| O programador escreveu `SELEC` no lugar de `SELECT` | `ER_PARSE_ERROR` | Programador | 500 |

Atenção à última linha: o erro foi reportado pelo banco, mas a consulta foi escrita pelo programador. O status esperado é `500`.

---

## Parte 4 — Tratar os erros (20 min) — Isadora Costa Campanari

Atualize o repositório antes de começar. No papel, completem os status e o operador:

```js
if (err.code === "ECONNREFUSED") {
  res.status(503).json({ erro: "Banco de dados indisponivel" });
  return;
}

if (err.code === "ER_DATA_TOO_LONG" || err.code === "ER_WARN_DATA_OUT_OF_RANGE") {
  res.status(400).json({ erro: "Algum valor e grande demais para o banco" });
  return;
}

res.status(500).json({ erro: "Erro interno no servidor" });
```

O operador `||` quer dizer: **ou**.

Confira se `src/middlewares/tratarErros.js` contém esses tratamentos. Teste os três casos da Parte 1 e preencha:

| Teste | Status esperado | Status observado |
|---|---:|---:|
| Título grande demais | 400 | 400, passou |
| Preço grande demais | 400 | 400, passou |
| Porta errada | 503 | 503, passou |

Se houve alteração:

```bash
git add src/middlewares/tratarErros.js
git commit -m "feat: responde erros do banco com 400 e 503"
git push
```

Avisem o grupo e, depois que os outros atualizarem o repositório e testarem, avisem Vitor.

---

## Parte 5 — Testar os erros na coleção (20 min) — Vitor Hugo dos Santos Campos

Atualize o repositório antes de começar. Na coleção importável, confira se existe a pasta **Erros do banco** com estas duas requisições:

| Requisição | Método e URL | Status esperado |
|---|---|---:|
| Titulo grande demais | `POST {{baseUrl}}/livros` | 400 |
| Preco grande demais | `POST {{baseUrl}}/livros` | 400 |

Cada requisição deve enviar os quatro campos do livro e ter um teste Post-response que verifica o status 400. Os corpos são os da seção 1 do guia.

A pasta e os dois testes já estão em `postman/livraria.postman_collection.json`. Se já estiverem presentes, não crie duplicatas: rode somente a pasta no Runner e registre o resultado:

| Teste | Esperado | Obtido |
|---|---|---|
| Titulo grande demais | 400, passou | 400, passou |
| Preco grande demais | 400, passou | 400, passou |

Se a coleção foi alterada no Postman, exporte como **Collection v2.1** e salve sobre `postman/livraria.postman_collection.json`.

Se houve alteração:

```bash
git add postman/livraria.postman_collection.json
git commit -m "test: adiciona erros do banco na colecao"
git push
```

Avisem Guilherme.

---

## Parte 6 — Coleção inteira e JSON mal escrito (15 min) — Guilherme de Souza Barbosa

Atualize o repositório antes de começar.

### 1. Rodar a coleção inteira

Executem `src/database/livraria.sql` no Workbench e reiniciem a API. No Postman, importem ou substituam a coleção pelo arquivo `postman/livraria.postman_collection.json`. Rodem a coleção inteira no Runner e anotem:

| Pasta | Passaram |
|---|---|
| Livros | 8 de 8 |
| Categorias (extra) | 8 de 8 |
| Erros do banco | 2 de 2 |

Rodem novamente. O resultado mudou? **Não.** Por quê? **Os testes atualizam os IDs usados durante a execução e cada fluxo termina apagando o registro que criou.**

### 2. JSON mal escrito

Enviem `POST /livros` com uma vírgula sobrando:

```json
{ "titulo": "X", }
```

- Antes do tratamento, o que voltou? **500 — Erro interno no servidor.**
- A culpa é do cliente ou do servidor? **Do cliente, porque o JSON está mal escrito.**
- Depois do tratamento, qual status voltou? **400 — O JSON enviado esta mal escrito.**

Confira se `src/middlewares/tratarErros.js` trata `err.type === "entity.parse.failed"` antes do retorno final 500. O status esperado é `400`.

Se houve alteração:

```bash
git add src/middlewares/tratarErros.js
git commit -m "feat: responde 400 para JSON mal escrito"
git push
```

Por fim, todos atualizam o repositório e conferem no próprio notebook: título longo retorna 400, e a coleção inteira passa.

---

## Se sobrar tempo

Registrem o código no terminal e o status retornado pela API:

| Situação | Código no terminal | Status |
|---|---|---:|
| `PATCH /livros/1` com `{ "estoque": 9999999999 }` | `ER_WARN_DATA_OUT_OF_RANGE` | 400 |
| Senha errada em `DB_PASSWORD` | `ER_ACCESS_DENIED_ERROR` | 500 |
| `GET /livros/99999` (livro inexistente) | Sem erro no terminal | 404 |

Por que a senha errada não dá 503? **A conexão chega ao MySQL, mas ele recusa a autenticação. O código é `ER_ACCESS_DENIED_ERROR`, não `ECONNREFUSED`; por isso cai no 500 padrão.**

> Se testarem uma senha errada, restaurem o `.env` e reiniciem a API. Não incluam nem enviem o `.env` nos commits.

---

## Checklist

- [x] Todos provocaram os três erros e restauraram `DB_PORT=3306`.
- [x] Os três códigos de erro foram anotados.
- [x] A Parte 3 foi preenchida, incluindo o caso `SELEC`.
- [x] Todos confirmaram as respostas 400 e 503.
- [x] A pasta Erros do banco passou no Runner e a coleção está atualizada.
- [x] A coleção inteira foi executada duas vezes (18/18 nas duas execuções).
- [x] JSON mal escrito retornou 400.
- [x] Os commits necessários foram enviados.
- [x] Todos atualizaram o repositório e verificaram a API localmente.

## Se der erro

| Sintoma | Solução |
|---|---|
| `git push` recusado (`rejected`) | Alguém enviou antes. Atualize o repositório, resolva conflitos se houver e tente novamente. |
| Título longo ainda dá 500 | Compare o código do terminal com o `if`, letra por letra. |
| Título longo dá 201 | Este MySQL pode cortar o texto em vez de recusar. Testem o preço gigante e anotem qual notebook teve esse resultado. |
| Porta errada dá 500, não 503 | Confirme que só `DB_PORT` foi alterado e que o valor era `3399`. |
| Mudei o `.env` e nada mudou | Digite `rs` e Enter no terminal do nodemon. |
| Toda requisição de livro dá 503 | Restaure `DB_PORT=3306` e reinicie a API com `rs`. |
| `ERRO: undefined` no terminal | O erro não veio do banco; leiam também a mensagem exibida. |
| Teste de 400 passa com "O titulo e obrigatorio" | O corpo precisa conter título, autor, preço e estoque. |
| Postman pergunta se substitui a coleção | Escolha **Replace** para importar a coleção atualizada do repositório. |
| Pastas antigas da coleção falham | Execute o script do banco, reinicie a API e rode novamente. |
