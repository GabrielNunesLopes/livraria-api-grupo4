# Atividade 20 — O Livro Inteiro no Banco

**UC:** Programação Back-End | **Bloco 4 — Aula 29**  
**Grupo 4** — Repositório: `livraria-api-grupo4`  
**Formato:** Em grupo, no repositório do grupo  
**Avaliação:** Formativa — CRUD de Livro persistido

> As respostas marcadas como “pelo código” foram verificadas nos arquivos do projeto. Os resultados que dependem de executar o Workbench, Postman ou a API estão identificados como não registrados. A divisão de responsáveis está preenchida para organizar o revezamento.

## Revezamento

| Ordem | Responsável | Parte |
|---|---|---|
| Todos | Todos os integrantes | Parte 1 — Workbench |
| 1º | Gabriel Nunes Lopes | Parte 2 — POST |
| 2º | Isadora Costa Campanari | Parte 3 — PUT e PATCH |
| 3º | Vitor Hugo dos Santos Campos | Parte 4 — DELETE e fim do array |
| 4º | Guilherme de Souza Barbosa | Parte 6 — coleção e teste do reinício |
| — | Guilherme de Souza Barbosa | Parte 5 — SQL injection, no papel |

**Piloto e crédito do grupo:** Gabriel Nunes Lopes — Parte 2 (POST).

## Parte 1 — INSERT no Workbench

Sem informar um `id` no `INSERT`, o MySQL escolhe o próximo valor do `AUTO_INCREMENT`. Em um banco recém-criado pelo script, o registro novo fica com ID 4 e a tabela passa a ter quatro livros.

| Pergunta | Resposta |
|---|---|
| Quantos livros apareceram após o INSERT? | 4, se o banco começou com os três registros do script. |
| Qual ID o livro novo ganhou? | 4, em um banco recém-criado com os IDs 1, 2 e 3. |
| O grupo escreveu o ID no INSERT? | Não. |
| Então quem escolheu? | O MySQL, pelo `AUTO_INCREMENT`. |
| O que acontece ao rodar `livraria.sql` de novo? | O banco é recriado com os três livros iniciais, IDs 1, 2 e 3; o livro inserido manualmente é removido. |

**Execução individual no Workbench:** não registrada neste documento.

## Parte 2 — POST no banco

As lacunas da função são:

```js
async function criarLivro(dados) {
  const [resultado] = await db.query(
    "INSERT INTO livros (titulo, autor, preco, estoque) VALUES (?, ?, ?, ?)",
    [dados.titulo, dados.autor, dados.preco, dados.estoque],
  );
  return await buscarLivroPorId(resultado.insertId);
}
```

As lacunas são `?`, `?`, `?`, `?`, `estoque` e `insertId`. O código já usa essa consulta em `src/services/livroService.js`; o controller já aguarda a criação antes de responder.

| Teste | Esperado | Identificado no código |
|---|---|---|
| POST de “A Revolução dos Bichos” | `201`, ID 4 num banco resetado | POST insere no MySQL e busca pelo `insertId` |
| GET `/livros` | 4 livros depois do POST | A listagem consulta o MySQL |
| SELECT no Workbench | 4 livros depois do POST | Depende da execução do INSERT e POST |
| POST `{ "autor": "Ninguem" }` | `400` | Validação exige título, autor, preço e estoque no POST |
| Salvar arquivos e consultar de novo | Continua com 4, sem duplicatas automáticas | Não há mais chamadas de exemplo a `criarLivro` no início do service |

**Runner e execução dos testes:** não registrados neste documento.

**Observação do teste feito antes de resetar o banco:** os POSTs retornaram IDs 9 e 10. Isso acontece porque o `AUTO_INCREMENT` já tinha avançado com os cadastros anteriores. Para obter ID 4 como no roteiro, é preciso executar o arquivo `livraria.sql` inteiro e então fazer um único POST.

## Parte 3 — PUT e PATCH no banco

| Teste | Esperado | Identificado no código |
|---|---|---|
| PUT `/livros/1` com os quatro campos | `200` | O service executa `UPDATE ... WHERE id = ?` e busca o livro atualizado |
| PUT `/livros/99999` | `404` | `affectedRows === 0` faz o service retornar `null` |
| PATCH `/livros/3` com `{ "estoque": 2 }` | `200`, estoque 2 | O service busca o livro, muda o estoque e chama PUT para salvar |
| PATCH `/livros/99999` com `{ "estoque": 2 }` | `404` | O service retorna `null` quando a busca não encontra o livro |
| Resultado no Workbench | Clean Code e O Hobbit atualizados conforme as requisições | Confirmar executando as requisições e o SELECT |

No `UPDATE` do PUT há **5 pontos de interrogação** e **5 valores** na lista. O último `?` corresponde ao `id` do `WHERE`.

## Parte 4 — DELETE e o fim do array

| Teste | Esperado | Identificado no código |
|---|---|---|
| DELETE `/livros/2` | `204` | DELETE no banco retorna sucesso quando `affectedRows > 0` |
| GET `/livros/2` após apagar | `404` | A busca no banco não encontra o ID apagado |
| DELETE `/livros/2` novamente | `404` | O DELETE retorna `false` quando `affectedRows` é zero |
| Servidor inicia sem `livros is not defined` | Sim | O service não usa mais array nem variável `livros` |

A tabela `livros` ainda aparece no service somente dentro dos comandos SQL. `Livro`, `livros` e `proximoId` foram removidos do topo do arquivo.

## Parte 5 — Por que sempre `?`

Com concatenação insegura, o texto enviado poderia montar:

```sql
DELETE FROM livros WHERE id = 0 OR 1=1
```

Esse comando apagaria **todos os livros**, porque `1=1` é sempre verdadeiro. Com `?`, o valor externo é passado separadamente como um único parâmetro; não vira parte do comando SQL. Na rota atual, `0 OR 1=1` também é recusado como ID não numérico antes de chegar ao service. Portanto, **nenhum livro é apagado**.

## Parte 6 — Coleção e teste do reinício

O banco é recriado com três livros. Depois de um POST válido, espera-se que a resposta traga o novo ID, normalmente 4. Como o livro foi gravado no MySQL, ele deve continuar lá após reiniciar o servidor.

| Verificação | Resultado esperado | Resultado observado |
|---|---|---|
| Runner da Atividade 15, primeira execução | 16 de 16 | Não registrado |
| Runner da Atividade 15, segunda execução | 16 de 16 | Não registrado |
| POST depois de resetar o banco | Novo livro, normalmente ID 4 | Não registrado |
| Livro continua após reiniciar o servidor? | Sim, porque o POST grava no MySQL | Não registrado |
| O que aconteceria na Aula 27, com array em memória? | O livro sumiria ao reiniciar a API | Resposta conceitual |
| Último `git pull` e API funcionando em cada notebook | Conferir em cada máquina | Não registrado |

## SQL executado por cada rota

| Requisição | SQL |
|---|---|
| GET `/livros` | `SELECT * FROM livros` |
| GET `/livros/3` | `SELECT * FROM livros WHERE id = ?` |
| POST `/livros` | `INSERT INTO livros (titulo, autor, preco, estoque) VALUES (?, ?, ?, ?)` |
| PUT `/livros/3` | `UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ? WHERE id = ?` |
| DELETE `/livros/3` | `DELETE FROM livros WHERE id = ?` |

## Situação no repositório

- [x] POST, PUT, PATCH e DELETE de livros usam o MySQL no service.
- [x] O controller aguarda as operações assíncronas.
- [x] As chamadas que inseriam exemplos ao iniciar foram removidas.
- [x] O array e os identificadores em memória foram removidos do service.
- [ ] Executar e registrar os testes de API e a coleção 16/16 duas vezes.
- [ ] Confirmar o Workbench e o teste de reinício.
- [ ] Fazer os três commits e o push do revezamento, se ainda não foram feitos.
- [ ] Confirmar que todos deram `git pull` e executaram a API localmente.

## Banco de dados dos integrantes

O `git pull` atualiza os arquivos do projeto, mas **não sincroniza os registros do MySQL local**. Cada integrante precisa configurar o próprio `.env` e criar/preparar o banco executando `src/database/livraria.sql` no Workbench. Esse script apaga e recria o banco com os três livros iniciais.

Cadastros e alterações feitos depois do script ficam apenas no banco ao qual a API daquele integrante está conectada. Para todos verem os mesmos registros, precisam conectar a API ao mesmo banco MySQL compartilhado; caso usem bancos locais separados, cada integrante faz os cadastros necessários no próprio banco.
