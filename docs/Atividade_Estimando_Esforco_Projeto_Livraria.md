# Atividade — Estimativa, orçamento e papéis do projeto da livraria

**UC:** Projetos de Software (PSOF) — Bloco 4  
**Grupo:** 4  
**Integrantes:** Gabriel Nunes Lopes, Guilherme de Souza Barbosa, Vitor Hugo dos Santos Campos e Isadora Costa Campanari

> **Rascunho para validação do grupo.** O repositório não contém a lista de requisitos de 18/09 nem issues reais do Project. A simulação de sprint existente no arquivo `Atividade_PSOf_Matriz_Risco_Sprint_Planning.docx` informa que os títulos, horas, capacidade e números de issues eram propostas para validação. Os votos abaixo são uma simulação de trabalho, não cartas que os integrantes já tenham apresentado. Confirmem os dados com o Project, o backlog de 16/10 e a lista de requisitos antes de entregar.

## Parte 1 — Planning Poker

### 1.1 Tarefa de referência

**Issue:** a criar — Revisar critérios de aceite e atualizar o Project.  
**Por que é a mais simples e bem entendida?** É uma tarefa curta de conferência e registro, sem alteração de código nem dependência técnica externa.  
**Estimativa de referência:** 1 hora. Portanto, nesta simulação, **1 ponto ≈ 1 hora**.

### 1.2 Rodadas de estimativa

Como os números reais das issues não estão registrados no repositório, os itens são identificados pelo título. As cartas na primeira rodada são uma proposta de simulação, na ordem Gabriel, Guilherme, Vitor e Isadora. Substituam-nas pelas cartas realmente apresentadas pelo grupo.

| Backlog | Issue | Título | Cartas na 1ª rodada (G / Gu / V / I) | Rodadas | Pontos finais | Horas (pontos × conversão) | Chute registrado anteriormente (h) |
|---|---|---|---|---:|---:|---:|---:|
| Sprint 1 | A criar | Iniciar persistência de livros e categorias | 3 / 5 / 8 / 13 | 2 | 5 | 5 | 3,5 |
| Sprint 1 | A criar | Implementar autenticação nas rotas de escrita | 2 / 3 / 5 / 3 | 2 | 3 | 3 | 2,5 |
| Sprint 1 | A criar | Validar payloads de livros e categorias | 1 / 2 / 3 / 2 | 2 | 2 | 2 | 1,5 |
| Produto (extra) | A criar | Conferir CRUD e autenticação no Postman | 1 / 2 / 3 / 2 | 2 | 2 | 2 | 1,5 |
| Produto (extra) | A criar | Testar instalação limpa e documentar inicialização | 1 / 1 / 2 / 1 | 1 | 1 | 1 | 1 |
| Produto (extra) | A criar | Revisar critérios de aceite e atualizar o Project | 1 / 1 / 2 / 1 | 1 | 1 | 1 | 1 |
| **Total** |  | **Sprint: 10 pontos / 10 h; extras: 4 pontos / 4 h** |  |  | **14** | **14** | **11 h (7,5 h na Sprint)** |

Os chutes anteriores são os valores registrados na simulação preparatória do backlog. A conversão de pontos em horas é uma aproximação didática desta atividade, não uma equivalência universal entre pontos e tempo.

### 1.3 A divergência mais interessante

**Issue:** Iniciar persistência de livros e categorias.  
**Menor carta:** 3 pontos. **Maior carta:** 13 pontos.

- **O que quem deu a menor carta pensou?** Considerou principalmente a migração do fluxo já existente de livros para persistência e o reaproveitamento da conexão e dos services.
- **O que quem deu a maior carta pensou?** Considerou a persistência de duas entidades, a configuração do banco, os testes de integração e os riscos de migração como um único pacote.
- **O que o grupo descobriu?** A tarefa mistura configuração, persistência e testes. O escopo precisa ser esclarecido e pode ser dividido em entregas menores. A divergência e as justificativas acima são exemplos para orientar a conversa; registrem o que o grupo realmente discutiu.

### 1.4 Issues que precisaram ser quebradas

Na simulação, nenhuma tarefa ficou em 21 pontos ou `?`. A tarefa de persistência teve divergência ampla (3 a 13) e deve ser detalhada antes de entrar em execução. Uma possível quebra é: (1) preparar conexão e esquema; (2) persistir livros; (3) persistir categorias; (4) testar reinício e erros de banco. Confirmem com o grupo se essa divisão faz sentido para o escopo.

### 1.5 Comparação com a Sprint 1

**Total de horas da Sprint 1 pelo Planning Poker:** 10 h.  
**Capacidade registrada na simulação de 16/10:** 8,4 h (12 h disponíveis × fator de foco 0,7; 3 h propostas para cada integrante).

**A Sprint 1 continua cabendo? Não, nesta estimativa ela excede a capacidade em 1,6 h.** Para caber, retirar ou dividir a tarefa de menor prioridade no backlog proposto: **Validar payloads de livros e categorias (2 h)**. A sprint ficaria com 8 h estimadas, abaixo da capacidade de 8,4 h. A decisão final deve ser confirmada com o PO e com a disponibilidade real do grupo.

## Parte 2 — Pontos de Função e recursos

### 2.1 Contagem de Pontos de Função

Contagem preliminar de baixa complexidade, baseada nas operações atualmente observáveis nas rotas de Livro e Categoria. Consideram-se listagem, busca por ID e consulta com filtros como consultas distintas. A lista formal de requisitos de 18/09 deve ser usada para confirmar ou corrigir esta fronteira. `Pessoa`, `Cliente` e `Funcionario` não foram contados porque não há operações de API para essas entidades no escopo funcional evidenciado.

| Entidade | Função | Tipo | Peso |
|---|---|---:|---:|
| Livro | Manter dados dos livros | ALI | 7 |
| Livro | Cadastrar livro (POST) | EE | 3 |
| Livro | Substituir livro (PUT) | EE | 3 |
| Livro | Alterar parcialmente livro (PATCH) | EE | 3 |
| Livro | Excluir livro (DELETE) | EE | 3 |
| Livro | Listar livros | CE | 3 |
| Livro | Buscar livro por ID | CE | 3 |
| Livro | Consultar livros com filtros | CE | 3 |
| Categoria | Manter dados das categorias | ALI | 7 |
| Categoria | Cadastrar categoria (POST) | EE | 3 |
| Categoria | Substituir categoria (PUT) | EE | 3 |
| Categoria | Alterar parcialmente categoria (PATCH) | EE | 3 |
| Categoria | Excluir categoria (DELETE) | EE | 3 |
| Categoria | Listar categorias | CE | 3 |
| Categoria | Buscar categoria por ID | CE | 3 |
| Categoria | Consultar categorias por nome | CE | 3 |
| **Total** | **2 ALI + 8 EE + 6 CE** |  | **56 PF** |

**Cálculo:** 2 × 7 + 8 × 3 + 6 × 3 = 14 + 24 + 18 = **56 PF**. Autenticação e validações são requisitos importantes, mas não foram adicionados como funções transacionais separadas nesta contagem preliminar; revisem essa decisão com a lista oficial de requisitos e o critério ensinado em aula.

### 2.2 Esforço estimado por Pontos de Função

**56 PF × 8 horas por PF = 448 horas** para o software inteiro dentro do escopo contado acima. É uma estimativa preliminar de referência; depende da validação dos requisitos e da regra de contagem adotada em aula.

### 2.3 Comparando as estimativas

| Técnica | O que estimou | Total de horas |
|---|---|---:|
| Chute de 16/10 | Backlog proposto da Sprint 1 | 7,5 h |
| Planning Poker simulado | Sprint 1 + três itens extras do backlog proposto | 14 h |
| Pontos de Função | Software inteiro, para Livro e Categoria no escopo contado | 448 h |

**Por que os números não batem?** O chute e o Planning Poker cobrem tarefas selecionadas do backlog; a contagem por PF tenta representar o escopo funcional inteiro e usa uma produtividade de referência fixa de 8 h/PF. Além disso, os chutes e a capacidade no documento preparatório eram propostas não confirmadas, e os votos desta atividade são simulados.

**Estimativa mais confiável para o orçamento:** a contagem por Pontos de Função é a melhor referência inicial para o software inteiro, porque parte de funções identificáveis, desde que os requisitos e a fronteira do escopo sejam validados. Para assumir compromisso de sprint, o Planning Poker revisado pelo grupo é mais útil. Nenhum dos três totais deve ser tratado como orçamento fechado antes dessas validações.

### 2.4 Recursos do projeto

| Tipo | Recurso | Quantidade | Custo |
|---|---|---:|---|
| Humano | Integrantes de desenvolvimento: Gabriel, Guilherme, Vitor e Isadora | 4 | Sem custo financeiro direto informado (projeto acadêmico) |
| Humano | Orientação docente de PSOF/PBE | 1 equipe docente | Gratuito para o grupo |
| Material/infraestrutura | Computadores dos integrantes ou laboratório | 4 | Recursos existentes; sem custo incremental informado |
| Material/infraestrutura | Acesso à internet/rede | 1 acesso compartilhado | Disponível no laboratório; custo não informado |
| Software/serviço | GitHub (repositório e Projects) | 1 organização/repositório | Plano gratuito, conforme disponibilidade da conta |
| Software/serviço | Visual Studio Code, Node.js e Express | 1 conjunto | Gratuito / código aberto |
| Software/serviço | MySQL Community e Postman | 1 instalação de cada | Gratuito, conforme edição e plano utilizados |

## Antes de encerrar

- [ ] Conferir títulos, IDs, iteração e estimativas reais no GitHub Project.
- [ ] Trocar as cartas de simulação pelas cartas registradas durante o Planning Poker do grupo.
- [ ] Confirmar as horas disponíveis e a capacidade da Sprint 1 calculada em 16/10.
- [ ] Conferir as funções com a lista de requisitos de 18/09 e ajustar a contagem de PF.
- [ ] Registrar os pontos finais no campo **Estimativa** das issues reais do Project.
- [x] Estimar todas as três tarefas candidatas da Sprint 1 e três tarefas extras do backlog proposto.
- [x] Comparar capacidade, pontos, horas e Pontos de Função, explicitando as premissas.

---

## Complemento — Orçamento e papéis do projeto

**Base adotada para este orçamento:** estimativa preliminar de Pontos de Função registrada acima. A escolha formal feita pelo grupo em 23/10 não está registrada nos arquivos disponíveis; por isso, este preenchimento usa os 56 PF como base explícita para estimar o produto inteiro. Confirmem essa escolha e os valores com os registros do grupo antes de entregar.

### Parte 1 — Orçamento do projeto

#### 1.1 Base da estimativa

**Estimativa usada:** ☒ Pontos de Função (contagem preliminar)  
**Total de horas de desenvolvimento:** 56 PF × 8 h/PF = **448 horas**.

Foi escolhida como referência por cobrir o escopo funcional contado para livros e categorias, enquanto as 14 horas de Planning Poker acima cobrem apenas tarefas selecionadas. A contagem e a produtividade de 8 h/PF continuam sendo premissas a validar com os requisitos oficiais.

#### 1.2 Custo de pessoal

**Percentual de horas de gestão:** 15%.

| Papel | Horas e cálculo | Custo por hora | Custo |
|---|---:|---:|---:|
| Desenvolvimento | 448 h × R$ 40,00 | R$ 40,00 | R$ 17.920,00 |
| Gestão | 448 h × 15% = 67,2 h | R$ 60,00 | R$ 4.032,00 |
| **Total de pessoal** |  |  | **R$ 21.952,00** |

#### 1.3 Infraestrutura

Custos incrementais considerados para o projeto acadêmico; computadores, laboratório e internet já disponíveis não têm valor adicional informado.

| Item | Valor mensal ou único | Meses de uso | Custo |
|---|---:|---:|---:|
| Computadores/laboratório existentes | R$ 0,00 adicional | — | R$ 0,00 |
| Rede/internet disponível | R$ 0,00 adicional | — | R$ 0,00 |
| **Total de infraestrutura** |  |  | **R$ 0,00** |

#### 1.4 Software e serviços

Custos considerados zero por uso das edições gratuitas/código aberto ou recursos já disponíveis; não é uma cotação comercial.

| Item | Gratuito ou pago? | Custo |
|---|---|---:|
| GitHub e Projects | Gratuito, conforme conta disponível | R$ 0,00 |
| Visual Studio Code, Node.js e Express | Gratuito/código aberto | R$ 0,00 |
| MySQL Community | Gratuito/código aberto | R$ 0,00 |
| Postman | Plano gratuito | R$ 0,00 |
| **Total de software e serviços** |  | **R$ 0,00** |

#### 1.5 Reserva de contingência

Riscos médios e altos da matriz de riscos do grupo:

| Número e nome do risco | Classificação |
|---|---|
| 1 — Conflitos de integração | Médio |
| 2 — Atraso na migração | Alto |
| 3 — Falha na autenticação | Alto |
| 4 — Ausência de integrante | Médio |
| 6 — Payload inválido | Médio |
| 7 — Configuração do ambiente | Médio |
| 8 — Estimativa imprecisa | Médio |

**Percentual escolhido para a reserva:** 15%.

O percentual fica dentro da faixa definida na atividade e reserva margem para retrabalho de integração, atraso de migração, autenticação, ambiente e estimativa. Os riscos 2 e 3 são altos; os demais listados são médios.

#### 1.6 Resumo do orçamento

| Bloco | Cálculo | Valor |
|---|---|---:|
| 1. Pessoal | R$ 17.920,00 + R$ 4.032,00 | R$ 21.952,00 |
| 2. Infraestrutura | Custos incrementais | R$ 0,00 |
| 3. Software e serviços | Custos incrementais | R$ 0,00 |
| **Subtotal (1 + 2 + 3)** | R$ 21.952,00 + R$ 0,00 + R$ 0,00 | **R$ 21.952,00** |
| 4. Reserva de contingência | R$ 21.952,00 × 15% | R$ 3.292,80 |
| **Total do projeto** | R$ 21.952,00 + R$ 3.292,80 | **R$ 25.244,80** |

### Parte 2 — Equipe, papéis e matriz RACI

#### 2.1 Papéis de cada integrante

| Integrante | Papel no projeto | Papel no Scrum registrado no planejamento |
|---|---|---|
| Gabriel Nunes Lopes | Desenvolvimento, integração e acompanhamento do projeto | Scrum Master |
| Guilherme de Souza Barbosa | Desenvolvimento e configuração do banco/ambiente | Desenvolvedor |
| Vitor Hugo dos Santos Campos | Desenvolvimento e persistência | Desenvolvedor |
| Isadora Costa Campanari | Requisitos, validação e priorização | Product Owner |

#### 2.2 Matriz RACI

**R** executa; **A** responde pelo resultado; **C** é consultado; **I** é informado. Há exatamente um A e pelo menos um R em cada atividade.

| Atividade | Gabriel | Guilherme | Vitor | Isadora |
|---|---|---|---|---|
| Levantamento e revisão de requisitos | C | I | C | A/R |
| Modelagem do banco de dados | C | A | R | I |
| Rotas de livros (CRUD e busca) | C | C | A/R | I |
| Rotas de categorias | I | A/R | C | C |
| Testes da API | A | R | R | C |
| Gestão do Project no GitHub | A/R | I | I | C |
| Acompanhamento da matriz de riscos | C | R | C | A/R |
| Documento de Planejamento do Projeto | R | C | C | A |
| Preparação da defesa oral | R | R | R | A |
| Documentação da instalação e entrega | C | R | I | A |

#### 2.3 Conferência da matriz

- [x] Cada atividade tem exatamente um A.
- [x] Cada atividade tem pelo menos um R.
- [x] A distribuição não deixa uma pessoa como R em quase todas as atividades (Gabriel: 4; Guilherme: 5; Vitor: 3; Isadora: 2, contando A/R como R).
- [x] A matriz distribui a execução entre os quatro integrantes.

**A matriz confere com os assignees das issues no Project?** Não foi possível confirmar: não há issues/assignees disponíveis no repositório consultado. A distribuição acima é uma proposta coerente com os papéis descritos nos documentos de planejamento, e precisa ser comparada com o Project do grupo.

### Conferência do complemento

- [x] Horas de gestão incluídas no custo de pessoal.
- [x] As linhas mostram as contas usadas.
- [x] Reserva justificada pelos riscos médios e altos listados.
- [x] Total confere: R$ 21.952,00 + R$ 3.292,80 = R$ 25.244,80.
- [x] Matriz tem exatamente um A e pelo menos um R por atividade.
- [ ] Confirmar que a estimativa de PF coincide com a escolha formal de 23/10 e validar os assignees no Project antes de entregar.
