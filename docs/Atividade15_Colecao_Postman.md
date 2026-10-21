# Atividade 15 — Coleção Postman do CRUD

**UC:** Programação Back-End · **Bloco 3** · **Grupo 4**

## Arquivo para importar

Importe `postman/livraria.postman_collection.json` no Postman. A coleção contém as oito requisições de Livros e também as oito requisições extras de Categorias, organizadas em pastas. A variável `baseUrl` já está definida como `http://localhost:3000`.

## Como executar

1. Inicie a API na raiz do projeto com `npm run dev`.
2. No Postman, selecione a pasta **Livros** e use **Run** para executar as requisições na ordem numerada. A pasta extra **Categorias** pode ser executada da mesma forma.
3. Confira os resultados. Os status esperados são 200 (listar/buscar existente/alterar), 404 (buscar inexistente ou apagado), 201 (cadastrar) e 204 (apagar).
4. Execute a pasta novamente sem reiniciar o servidor.

**Por que a segunda rodada também passa?** A requisição de cadastro salva o ID retornado em uma variável da coleção a cada rodada; as requisições seguintes usam esse novo ID e alteram/apagam o registro recém-criado.

## Requisições incluídas

### Livros

1. GET `/livros` — listar livros.
2. GET `/livros/99999` — buscar livro inexistente.
3. POST `/livros` — cadastrar O Hobbit (salva `livroId`).
4. GET `/livros/{{livroId}}` — buscar o livro cadastrado.
5. PATCH `/livros/{{livroId}}` — alterar somente o preço.
6. PUT `/livros/{{livroId}}` — substituir todos os campos.
7. DELETE `/livros/{{livroId}}` — apagar o livro.
8. GET `/livros/{{livroId}}` — confirmar que foi apagado.

### Categorias (atividade extra)

Mesmo fluxo CRUD com `categoriaId`: cadastrar Infantil, alterar descrição, substituir por Infantojuvenil, apagar e confirmar o 404.

## Entrega no repositório

O arquivo importável fica em `postman/livraria.postman_collection.json`. Para versionar a coleção:

```bash
git add postman/livraria.postman_collection.json docs/Atividade15_Colecao_Postman.md
git commit -m "test: adiciona colecao Postman com testes do CRUD de livros"
git push
```

Os resultados reais do Runner devem ser anotados pelo grupo após executar a API localmente.
