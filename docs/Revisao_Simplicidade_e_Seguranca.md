# Revisão do código — manter simples e funcionando

**Projeto:** API da Livraria — Grupo 4  
**Objetivo:** conferir se o código acompanha as atividades do curso, sem adicionar funcionalidades fora do que foi pedido.

## O que foi conferido

- A API usa Node.js, Express e MySQL2, com scripts `npm start` e `npm run dev`.
- A organização em `routes`, `controllers`, `services` e `models` já aparece nas atividades anteriores e deve ser preservada.
- As rotas de livros oferecem GET, POST, PUT, PATCH e DELETE e usam MySQL.
- As rotas de categorias oferecem os mesmos métodos, mas os dados ficam em um array durante a execução.
- O projeto já tem validação de ID, respostas de erro e coleções do Postman.
- O arquivo `.env` é local; suas variáveis não devem ser renomeadas.

## Decisões desta revisão

1. **Não alterar o código funcional sem testes.** A atividade de orçamento e RACI é de planejamento, não pede novas rotas.
2. **Não instalar bibliotecas novas** nem modificar `package.json`, `package-lock.json`, `.env.example` ou o banco.
3. **Não apagar arquivos antigos de atividades.** Eles registram o conteúdo já trabalhado.
4. **Não migrar categorias para MySQL por conta própria.** Isso muda o comportamento atual e exige uma atividade ou decisão específica.
5. **Não remover models, services ou middlewares apenas por parecerem avançados.** Antes, verificar se fazem parte de exercícios anteriores.

## Pontos para conferir depois, com o grupo e o professor

- Se a atividade atual exige categorias no banco ou se o array ainda é esperado.
- Se os models de Pessoa, Cliente e Funcionário fazem parte de uma atividade de orientação a objetos.
- Se a documentação das atividades antigas corresponde ao estado atual da API.
- Se a estimativa de horas e a matriz de riscos usadas no orçamento foram validadas pelo grupo.

## Teste no computador da escola

Antes de atualizar: `git status`. Se houver alterações locais, conferir com o grupo antes do `git pull`.

Depois de atualizar: `git pull origin main`, `npm start` e testar as rotas existentes no Postman. O MySQL local deve estar ligado e o `.env` deve permanecer como estava.

**Resultado desta etapa:** revisão estática da estrutura. Nenhum arquivo de código, dependência, banco ou configuração foi modificado. O funcionamento completo ainda depende de teste no ambiente da escola.
