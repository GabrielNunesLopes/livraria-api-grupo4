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

Deixem abertas a estimativa escolhida em 23/10, a lista de recursos do projeto e a matriz de riscos revisada em 16/10. Usem esses registros para preencher o orçamento e distribuir os papéis. Confirmem as decisões com o grupo antes de entregar.

As taxas de referência são iguais para todos os grupos: **desenvolvimento, R$ 40,00 por hora; gestão de projeto/PO, R$ 60,00 por hora.**

### Parte 1 — Orçamento do projeto

### 1.1 Base da estimativa

**Estimativa usada:** ☐ Planning Poker  ☐ Pontos de Função  ☐ Outra: __________________________

**Total de horas de desenvolvimento:** __________ horas

**Por que o grupo escolheu essa estimativa?** Retomem a justificativa registrada em 23/10.

____________________________________________________________________________

____________________________________________________________________________

### 1.2 Custo de pessoal

Escolham um percentual de gestão entre 10% e 20%. Calculem as horas de gestão multiplicando as horas de desenvolvimento pelo percentual escolhido. Em cada linha, registrem a conta e o custo.

**Percentual de horas de gestão:** __________ %

| Papel | Horas e cálculo | Custo por hora | Custo |
|---|---:|---:|---:|
| Desenvolvimento | __________ h | R$ 40,00 | R$ __________ |
| Gestão (horas de desenvolvimento × percentual) | __________ h | R$ 60,00 | R$ __________ |
| **Total de pessoal** |  |  | **R$ __________** |

### 1.3 Infraestrutura

Registrem o valor mensal ou único. Para um item mensal, multipliquem o valor mensal pela quantidade de meses de uso. Para um item de custo único, anotem o valor total na coluna de custo.

| Item | Valor mensal ou único | Meses de uso | Custo |
|---|---:|---:|---:|
| ______________________________ | R$ __________ | ______ | R$ __________ |
| ______________________________ | R$ __________ | ______ | R$ __________ |
| ______________________________ | R$ __________ | ______ | R$ __________ |
| **Total de infraestrutura** |  |  | **R$ __________** |

### 1.4 Software e serviços

| Item | Gratuito ou pago? | Custo |
|---|---|---:|
| ______________________________ | __________________ | R$ __________ |
| ______________________________ | __________________ | R$ __________ |
| ______________________________ | __________________ | R$ __________ |
| ______________________________ | __________________ | R$ __________ |
| **Total de software e serviços** |  | **R$ __________** |

### 1.5 Reserva de contingência

Listem os riscos médios e altos da matriz revisada usando o número e o nome de cada risco.

| Número e nome do risco | Classificação |
|---|---|
| ______________________________ | __________________ |
| ______________________________ | __________________ |
| ______________________________ | __________________ |
| ______________________________ | __________________ |

**Percentual escolhido para a reserva:** __________ %

**Justificativa ligada aos riscos listados:**

____________________________________________________________________________

____________________________________________________________________________

### 1.6 Resumo do orçamento

| Bloco | Cálculo | Valor |
|---|---|---:|
| 1. Pessoal | Conforme seção 1.2 | R$ __________ |
| 2. Infraestrutura | Conforme seção 1.3 | R$ __________ |
| 3. Software e serviços | Conforme seção 1.4 | R$ __________ |
| **Subtotal (1 + 2 + 3)** | R$ __________ + R$ __________ + R$ __________ | **R$ __________** |
| 4. Reserva de contingência | Subtotal × __________ % | R$ __________ |
| **Total do projeto** | Subtotal + reserva | **R$ __________** |

### Parte 2 — Equipe, papéis e matriz RACI

### 2.1 Papéis de cada integrante

| Integrante | Papel ou papéis no projeto | Papel no Scrum em 16/10 |
|---|---|---|
| Gabriel Nunes Lopes | ______________________________ | ______________________________ |
| Guilherme de Souza Barbosa | ______________________________ | ______________________________ |
| Vitor Hugo dos Santos Campos | ______________________________ | ______________________________ |
| Isadora Costa Campanari | ______________________________ | ______________________________ |

### 2.2 Matriz RACI

Preencham as células com **R**, **A**, **C** ou **I**. Também podem combinar papéis na mesma célula, como **A/R**. Deixem em branco quando a pessoa não estiver envolvida.

- **R — Responsável:** executa a atividade.
- **A — Responsável final:** responde pelo resultado e dá a aprovação final. Deve haver exatamente um A por atividade.
- **C — Consultado:** contribui com informações ou orientação.
- **I — Informado:** recebe atualizações sobre a atividade.

| Atividade | Gabriel | Guilherme | Vitor | Isadora |
|---|---|---|---|---|---|
| Levantamento e revisão de requisitos |  |  |  |  |  |
| Modelagem do banco de dados |  |  |  |  |  |
| Rotas de livros (CRUD e busca) |  |  |  |  |  |
| Rotas de categorias |  |  |  |  |  |
| Testes da API |  |  |  |  |  |
| Gestão do Project no GitHub |  |  |  |  |  |
| Acompanhamento da matriz de riscos |  |  |  |  |  |
| Documento de Planejamento do Projeto |  |  |  |  |  |
| Preparação da defesa oral |  |  |  |  |  |
| Outra atividade: __________________ |  |  |  |  |  |

### 2.3 Conferência da matriz

- [ ] Cada atividade tem exatamente um A.
- [ ] Cada atividade tem pelo menos um R.
- [ ] Nenhum integrante ficou com R em quase todas as atividades.
- [ ] O grupo avaliou se alguém ficou sobrecarregado.

**Algum integrante ficou sobrecarregado? O que o grupo decidiu fazer?**

____________________________________________________________________________

____________________________________________________________________________

**A matriz confere com os assignees das issues no Project?** ☐ Sim  ☐ Não

**Se não, o que foi ajustado?**

____________________________________________________________________________

### Conferência antes da entrega do complemento

- [ ] A estimativa e sua justificativa são as mesmas escolhidas em 23/10.
- [ ] As horas de gestão foram incluídas no custo de pessoal.
- [ ] Cada linha do orçamento mostra a conta usada (quantidade × valor).
- [ ] O percentual da reserva de contingência está justificado pelos riscos médios e altos.
- [ ] O total do projeto confere com a soma dos blocos e da reserva.
- [ ] A matriz RACI tem exatamente um A e pelo menos um R por atividade.
- [ ] Os papéis da matriz conferem com os assignees das issues no Project.
- [ ] O orçamento e a matriz foram salvos no espaço compartilhado do grupo.
