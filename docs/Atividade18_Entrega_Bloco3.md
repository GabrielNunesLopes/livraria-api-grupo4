# Atividade 18 - Entrega do Bloco 3

**UC:** Programação Back-End | **Bloco 3** | **Grupo 4**  
**Projeto:** API de Gestão da Livraria  
**Coleção de testes:** `postman/collections/Livraria API - Entrega do Bloco 3/`

Este documento registra a conferência da API para a entrega do Bloco 3. A coleção verifica as rotas de livros, categorias e respostas para dados inválidos. Os livros são persistidos no MySQL; as categorias continuam em memória e voltam aos dados iniciais quando o servidor reinicia.

## Como executar os testes

1. Configure as variáveis de conexão MySQL no arquivo `.env`, seguindo `.env.example`.
2. Crie o banco e a tabela executando `src/database/livraria.sql` no MySQL Workbench. **O script apaga e recria o banco `livraria`.**
3. Inicie a API na pasta do projeto com `npm run dev`.
4. Abra a coleção **Livraria API - Entrega do Bloco 3**, localizada em `postman/collections/`, e confira se `baseUrl` está definido como `http://localhost:3000`.
5. Execute as requisições na ordem apresentada e confira os status esperados nas tabelas abaixo.

A coleção tem 9 requisições de Livros, 7 de Categorias e 7 de Erros. Como algumas requisições têm mais de uma asserção, o Runner apresenta 27 testes.

## Resultados esperados

### 1 - Livros

| Requisição | Resultado esperado |
|---|:---:|
| Listar livros | 200 |
| Cadastrar livro | 201 |
| Buscar livro cadastrado | 200 |
| Filtrar pelo título | 200 e pelo menos um resultado |
| Alterar somente o preço (PATCH) | 200 |
| Substituir os dados (PUT) | 200 |
| Tentar salvar estoque negativo | 400 |
| Apagar livro | 204 |
| Buscar livro apagado | 404 |

### 2 - Categorias

| Requisição | Resultado esperado |
|---|:---:|
| Listar categorias | 200 |
| Cadastrar categoria | 201 |
| Buscar categoria cadastrada | 200 |
| Alterar somente a descrição (PATCH) | 200 |
| Substituir os dados (PUT) | 200 |
| Apagar categoria | 204 |
| Buscar categoria apagada | 404 |

### 3 - Erros

| Requisição | Resultado esperado |
|---|:---:|
| Livro sem título | 400 |
| Livro com preço negativo | 400 |
| Livro com preço em texto | 400 |
| Livro sem `Content-Type` | 400 |
| Categoria sem nome | 400 |
| Categoria com nome curto | 400 |
| Rota que não existe | 404 e resposta JSON |

Os seis primeiros casos são entradas inválidas e devem ser recusados com `400 Bad Request`. A rota desconhecida não existe na API e deve responder `404 Not Found`. Os resultados desta versão devem ser preenchidos após executar novamente a coleção com o MySQL configurado.

## Estrutura conferida no projeto

As rotas seguem a organização MVC já usada pelo projeto:

- `src/routes/` recebe as requisições e encaminha para os controllers.
- `src/controllers/` coordena a resposta e chama os services.
- `src/services/` contém as operações e validações: livros usam MySQL e categorias usam memória.
- `src/middlewares/` contém o registro de requisições, a resposta de rota não encontrada e o tratamento de erros.

## Placar da entrega

- Pasta 1 - Livros: 9 requisições para executar.
- Pasta 2 - Categorias: 7 requisições para executar.
- Pasta 3 - Erros: 7 requisições para executar; seis devem retornar `400` e a rota inexistente deve retornar `404`.
- Total esperado no Runner: 27 testes.
- Placar final do Runner do Postman: **preencher após executar a coleção completa**.

## Checklist

- [x] Executar novamente a coleção após configurar o MySQL e conferir as rotas.
- [x] Conferir os sete resultados esperados da pasta Erros.
- [x] Executar o Runner completo e anotar o placar de 27 testes.
- [x] Conferir os arquivos MVC e middlewares no repositório.
- [x] Fazer commit e push da entrega, se ainda não foram feitos.