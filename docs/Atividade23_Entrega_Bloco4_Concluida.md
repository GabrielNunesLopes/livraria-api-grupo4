# Atividade 23 — Entrega do Bloco 4

**UC:** Programação Back-End | Bloco 4 — Aula 32  
**Grupo:** 4 — Livraria API

## Estado da entrega

| Item | Resultado conferido |
|---|---|
| Carga inicial | 3 categorias e 8 livros; nenhum livro sem categoria |
| Ordem preservada | Ficção e Tecnologia continuam como as duas primeiras categorias; os três livros originais continuam no início, na mesma ordem |
| `.env.example` | Configurado para `localhost:3306`, usuário `root`, banco `livraria`; sem senha preenchida |
| Coleção Postman | 22 requisições e 41 asserções por execução |
| Runner | 41/41 em cada uma de duas execuções, totalizando 82/82 asserções aprovadas |
| Clone limpo do GitHub | Não executado nesta cópia de trabalho |
| Captura `postman/entrega-bloco4.png` | Ainda não gerada |
| Push dos commits | Ainda não realizado |

## Ajustes realizados

- Corrigido o script SQL para que possa ser executado no MySQL e ampliada a carga inicial para três categorias e oito livros categorizados.
- Corrigida a consulta de livros para incluir a categoria, com suporte ao filtro `?categoria=`.
- Ajustadas as gravações de livro para validar e persistir `categoria_id`, incluindo a remoção opcional do vínculo.
- Tratados os erros de chave estrangeira: categoria inexistente resulta em 400; categoria ainda usada por livros resulta em 409.
- Atualizado `.env.example` com os parâmetros locais de conexão, sem copiar uma senha.
- Incluídas na coleção as verificações de relacionamento solicitadas e o filtro extra por categoria.

## Resultado do Runner

A coleção `postman/livraria.postman_collection.json` foi executada duas vezes contra uma instância local da API conectada a um banco temporário MySQL preparado pelo script do repositório. Cada execução passou **41/41 asserções**. O banco temporário foi removido após a verificação.

## Itens restantes para a entrega oficial

O teste de clone precisa ser feito depois que as alterações forem enviadas ao GitHub: clonar para uma pasta nova, instalar dependências, criar `.env` a partir de `.env.example`, executar o script SQL e confirmar o Runner no clone. Também falta salvar a captura visual em `postman/entrega-bloco4.png` e enviar os commits. Esses itens não foram marcados como concluídos porque ainda não foram realizados.

## Arquivos principais

- API: `src/services/livroService.js` e `src/middlewares/tratarErros.js`
- Carga: `src/database/livraria.sql`
- Exemplo de configuração: `.env.example`
- Coleção: `postman/livraria.postman_collection.json`
- Guia de relacionamento: `docs/02-guia-alunos-relacionamento.md`
