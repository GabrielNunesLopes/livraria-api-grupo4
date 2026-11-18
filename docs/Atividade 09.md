# Plano de Projeto — Sistema de Gestão Integrada (SGI)

**Unidade Curricular:** Projetos de Software (PSOF) — Bloco 4  
**Grupo:** Grupo 4  
**Integrantes:** Gabriel Nunes Lopes, Guilherme de Souza Barbosa, Vitor Hugo dos Santos Campos, Isadora Costa Campanari  
**Data:** 18/11/2026

---

## 1. Visão Geral
O **Sistema de Gestão Integrada (SGI)** é uma aplicação web desenvolvida para centralizar o controle operacional, o cadastro de registros e o acompanhamento de solicitações de pequenas equipes e organizações. Atualmente, processos realizados de forma manual ou em planilhas isoladas geram retrabalho, perda de histórico e dificuldade na tomada de decisão.

O objetivo principal do projeto é entregar um Produto Mínimo Viável (MVP) funcional, seguro e responsivo que permita aos usuários gerenciar cadastros, consultar status em tempo real e persistir dados com integridade, atendendo às necessidades acadêmicas e práticas definidas para o semestre.

---

## 2. Metodologia
* **Abordagem:** Metodologia Ágil baseada no framework **Scrum**, adaptada à realidade acadêmica com Sprints quinzenais.
* **Justificativa:** O uso do Scrum adaptado permite entregas incrementais frequentes, validação contínua do produto pela Product Owner e rápida adaptação a eventuais impedimentos técnicos em uma equipe enxuta de 4 desenvolvedores.
* **Cerimônias e Práticas:** Planejamento de Sprint (*Sprint Planning*), reuniões rápidas de alinhamento (*Daily* assíncrona via Discord/WhatsApp), revisão de entrega (*Sprint Review*) e revisão de código via *Pull Requests*.
* **Ferramentas de Gestão:** GitHub Issues, GitHub Projects (quadro Kanban automatizado) e Git para controle de versão.

---

## 3. Escopo

### 3.1. Escopo Incluído (Entregáveis)
* Sistema web responsivo com interface intuitiva para usuários finais e administradores.
* Módulo de autenticação e controle de acesso por perfil.
* Operações completas de cadastro, consulta, atualização e exclusão (CRUD) das entidades principais do domínio.
* Persistência de dados relacional com integridade referencial e validações no back-end.
* Documentação técnica do projeto e manual de implantação no repositório.

### 3.2. Escopo Excluído (Não será feito)
* **Aplicativos móveis nativos (Android/iOS):** O sistema será acessível via navegador em dispositivos móveis, mas não haverá publicação nas lojas de aplicativos devido ao prazo do semestre.
* **Integração com meios de pagamento reais:** Não haverá transações financeiras reais para evitar complexidade de homologação bancária.
* **Módulos de inteligência artificial ou análise preditiva:** O escopo limita-se a filtros, buscas e relatórios tabulares simples.

---

## 4. Requisitos
A tabela abaixo apresenta os Requisitos Funcionais (RF) e Não Funcionais (RNF) priorizados e rastreados diretamente com suas respectivas issues no GitHub Project.

| ID | Descrição do Requisito | Tipo | Prioridade | Issue(s) |
| :--- | :--- | :--- | :--- | :--- |
| **RF001** | O sistema deve permitir o cadastro, autenticação e encerramento de sessão de usuários com controle de permissões. | Funcional | Alta | #1, #2 |
| **RF002** | O sistema deve permitir o cadastro e a edição dos registros principais do domínio com validação de campos obrigatórios. | Funcional | Alta | #3 |
| **RF003** | O sistema deve disponibilizar listagem paginada com filtros por status, data e palavra-chave. | Funcional | Média | #4, #5 |
| **RF004** | O sistema deve permitir a atualização de status e o registro de histórico de alterações nos itens cadastrados. | Funcional | Média | #6 |
| **RF005** | O sistema deve permitir a exportação dos dados filtrados em formato tabular (CSV). | Funcional | Baixa | #7 |
| **RNF001** | O sistema deve persistir os dados em banco relacional estruturado com scripts de criação e ambiente padronizado. | Não Funcional | Alta | #8 |
| **RNF002** | O sistema deve possuir cobertura de testes de integração nas rotas críticas e documentação de uso atualizada. | Não Funcional | Média | #9 |

---

## 5. Riscos
A matriz a seguir apresenta os riscos identificados para o projeto, classificados por probabilidade e impacto, juntamente com seus gatilhos, responsáveis e onde a ação preventiva ou corretiva está refletida no planejamento.

| ID | Risco | Prob. / Impacto | Estratégia e Ação de Resposta | Gatilho | Dono | Onde aparece no plano |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R01** | Atraso na modelagem do banco de dados e configuração do ambiente | Alta / Alto | **Mitigar:** Antecipar a criação do schema e ambiente logo na Sprint 1 com revisão em dupla. | Ambiente não funcional até o 4º dia da Sprint 1 | Guilherme de Souza Barbosa | Tarefa antecipada na **Sprint 1** (Issue #8) |
| **R02** | Indisponibilidade temporária de integrante do time por motivos pessoais/acadêmicos | Média / Alto | **Mitigar:** Padronizar código, exigir *Pull Requests* revisados e manter reserva financeira para redistribuição de horas. | Ausência de integrante por mais de 3 dias consecutivos | Gabriel Nunes Lopes | **Reserva de contingência (15%)** na Seção 8 |
| **R03** | Falhas de integração ou inconsistência na persistência de dados entre camadas | Média / Médio | **Mitigar:** Definir contratos de API antes da codificação e executar testes de integração contínuos. | Erros recorrentes em testes de persistência | Vitor Hugo dos Santos Campos | **Issue #9** e critérios de aceite das Sprints |
| **R04** | Alteração ou má interpretação das regras de negócio durante o desenvolvimento | Baixa / Alto | **Evitar:** Realizar validação semanal das entregas parciais junto à Product Owner. | Divergência entre entrega e critério de aceite | Isadora Costa Campanari | Marco de **Sprint Review** no Cronograma |

---

## 6. Cronograma
O acompanhamento em tempo real das tarefas, status e responsáveis está disponível no [GitHub Project do Grupo 4](https://github.com). O projeto foi estruturado em três Sprints quinzenais.

| Marco / Sprint | Período | Principais Entregas e Marcos | Issues Vinculadas |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | 01/10 a 15/10 | Preparação do ambiente, modelagem do banco de dados, estrutura base e autenticação (`RNF001`, `RF001`). | #1, #2, #8 |
| **Sprint 2** | 16/10 a 31/10 | Desenvolvimento das operações principais de cadastro, listagem e filtros (`RF002`, `RF003`). | #3, #4, #5 |
| **Sprint 3** | 01/11 a 18/11 | Histórico de alterações, exportação de dados, testes integrados e consolidação documental (`RF004`, `RF005`, `RNF002`). | #6, #7, #9 |
| **Entrega Final** | 18/11/2026 | Consolidação do Plano de Projeto, revisão cruzada e apresentação final do MVP. | Todas |

---

## 7. Estimativa e Recursos

### 7.1. Técnica de Estimativa
* **Técnica utilizada:** *Planning Poker* adaptado com estimativa em **horas de esforço** por issue.
* **Justificativa:** A estimativa em horas facilita o alinhamento direto entre a capacidade semanal de cada integrante da equipe, o cronograma das Sprints e o cálculo objetivo do orçamento financeiro.

### 7.2. Recursos Técnicos (Stack Tecnológica)
A equipe utiliza exclusivamente as seguintes tecnologias homologadas para o projeto:
* **Back-end e Persistência:** Node.js com Express e banco de dados relacional PostgreSQL. *(Nota: ajustar caso o back-end utilize Java/Spring ou Python/FastAPI).*
* **Front-end:** HTML5, CSS3 e JavaScript (React).
* **Infraestrutura e Versionamento:** Git, GitHub e ambiente containerizado com Docker.

### 7.3. Tabela de Esforço Estimado
A soma das horas estimadas nas issues do GitHub Project totaliza **60 horas** de desenvolvimento e infraestrutura.

| Requisito / Atividade | Issue(s) | Estimativa (Horas) |
| :--- | :--- | :---: |
| RF001 — Autenticação e Controle de Acesso | #1, #2 | 12h |
| RF002 — Cadastro e Edição de Registros | #3 | 10h |
| RF003 — Listagem e Filtros de Busca | #4, #5 | 14h |
| RF004 — Atualização de Status e Histórico | #6 | 8h |
| RF005 — Exportação de Dados (CSV) | #7 | 6h |
| RNF001 — Banco de Dados e Preparação de Ambiente | #8 | 6h |
| RNF002 — Testes de Integração e Documentação | #9 | 4h |
| **Total Geral de Esforço** | **#1 a #9** | **60h** |

---

## 8. Orçamento
O orçamento do projeto considera o esforço total de **60 horas** definido na Seção 7, multiplicado pelo valor médio de **R$ 50,00/hora** estipulado para desenvolvedores júnior/pleno em ambiente acadêmico, acrescido de uma **reserva de contingência de 15%**.

* **Justificativa da Contingência:** O percentual de 15% (R$ 450,00) equivale a 9 horas adicionais de desenvolvimento, destinadas exclusivamente a absorver o impacto dos riscos **R01** (atrasos na configuração de banco) e **R02** (indisponibilidade temporária de algum integrante) mapeados na Seção 5.

| Item de Custo | Detalhamento do Cálculo | Valor (R$) |
| :--- | :--- | :---: |
| **Mão de Obra (Desenvolvimento)** | 60 horas × R$ 50,00/hora | R$ 3.000,00 |
| **Infraestrutura e Ferramentas** | GitHub, PostgreSQL e hospedagem em tier gratuito | R$ 0,00 |
| **Subtotal (Linha de Base)** | Custo direto previsto | **R$ 3.000,00** |
| **Reserva de Contingência (15%)** | Cobertura para os riscos R01 e R02 | R$ 450,00 |
| **Orçamento Total do Projeto** | **Linha de Base + Contingência** | **R$ 3.450,00** |

---

## 9. Equipe e Papéis (Matriz RACI)

### 9.1. Estrutura da Equipe
A tabela abaixo detalha a divisão de responsabilidades técnicas e os papéis ágeis desempenhados por cada integrante do Grupo 4.

| Integrante | Responsabilidades Principais | Papel no Projeto |
| :--- | :--- | :--- |
| **Gabriel Nunes Lopes** | Desenvolvimento e coordenação técnica | Scrum Master e integrante do time de desenvolvimento |
| **Guilherme de Souza Barbosa** | Desenvolvimento, banco e preparação do ambiente | Integrante do time de desenvolvimento |
