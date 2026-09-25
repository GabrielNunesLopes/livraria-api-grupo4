# Atividade — Análise de Riscos do Projeto da Livraria
**Unidade Curricular:** Projetos de Software (PSOF) — Bloco 3  
**Curso:** Técnico em Desenvolvimento de Sistemas — Escola SENAI "Santo Paschoal Crepaldi"  
**Turma:** 1-2026-SESI_DEV_OC_1  
**Grupo:** Grupo 4  
**Repositório Central:** [github.com/GabrielNunesLopes/livraria-api-grupo4](https://github.com/GabrielNunesLopes/livraria-api-grupo4)  

---

### Integrantes da Equipe
1. **Gabriel Nunes Lopes** (N° 09) — *Desenvolvimento / Planejamento*
2. **Guilherme de Souza Barbosa** (N° 10) — *Desenvolvimento / Planejamento*
3. **Vitor Hugo dos Santos Campos** (N° 29) — *Desenvolvimento / Planejamento*
4. **Isadora Costa Campanari** (N° 32) — *Desenvolvimento / Planejamento*

---

## Contextualização do Projeto
O projeto consiste no desenvolvimento de uma **API RESTful modular (Node.js/Express)** com arquitetura **MVC** para gestão de catálogo literário (CRUD de Livros e Categorias), controle de estoque físico e autenticação básica para operações administrativas. Esta análise considera a perspectiva da equipe técnica e das restrições do projeto de software da SA1.

---

## Parte 1 — SWOT do Nosso Projeto

*Observação: Quadrantes elaborados estritamente sob a ótica da equipe técnica de desenvolvimento, gestão do projeto e requisitos definidos da API (não sob a ótica de um negócio comercial físico).*

### Forças (O que o grupo já tem a favor — Ambiente Interno)
1. **Arquitetura MVC e Estrutura Inicial Funcional:** A equipe já consolidou os blocos anteriores com sucesso, possuindo esqueleto modularizado (`routes/`, `controllers/`, `services/`, `models/`), diagrama de classes UML alinhado e rotas de catálogo operacionais em memória.
2. **Domínio e Padronização no Versionamento Git/GitHub:** O grupo opera com repositório estruturado centralizado, convenções de commits, branches por funcionalidade e integração contínua do código entre os membros, minimizando extravio de versões.
3. **Escopo e Requisitos Bem Delimitados (Escopo Negativo Claro):** O documento formal de escopo aprovado define com precisão o que não será desenvolvido (sem gateway de pagamentos complexo, sem app mobile e sem interface visual B2C), evitando dispersão de esforço (*scope creep*).

### Fraquezas (O que o grupo ainda não domina ou não tem — Ambiente Interno)
1. **Inexperiência Técnica na Transição para Persistência em Banco de Dados:** A aplicação ainda opera com estruturas voláteis em memória; o grupo apresenta curva de aprendizado para implementar a conexão estruturada com banco de dados relacional ou NoSQL sem quebrar as regras já desenvolvidas.
2. **Pouca Prática na Implementação de Autenticação Segura (RNF002):** A equipe possui pouca vivência no desenvolvimento de middlewares de autorização (validação de headers e tokens para bloquear requisições não autorizadas de escrita com status 401/403).
3. **Ausência de Automação Ampla de Testes de Regressão:** O processo de validação das rotas e contratos da API ainda é fortemente dependente de checagens manuais via Insomnia, o que pode permitir a introdução de falhas despercebidas durante refatorações.

### Oportunidades (O que, fora do controle do grupo, pode ajudar — Ambiente Externo)
1. **Orientação Técnica Contínua dos Docentes do SENAI:** Disponibilidade de acompanhamento e suporte presencial dos professores especialistas nas disciplinas de Projetos de Software (PSOF) e Programação Back-End (PBE).
2. **Maturidade e Documentação do Ecossistema Node.js/Express:** Ampla disponibilidade de bibliotecas de código aberto maduras e gratuitas (como `jsonwebtoken`, `bcrypt`, validadores de esquemas) com farta documentação oficial e suporte da comunidade técnica.
3. **Convergência Pedagógica entre UCs (PBE e PSOF):** A integração das matérias permite aproveitar o mesmo artefato de código e planejamento, unificando a avaliação técnica e de gestão sem duplicar o esforço de entrega.

### Ameaças (O que, fora do controle do grupo, pode atrapalhar — Ambiente Externo)
1. **Prazo Rígido do Calendário Acadêmico e Concorrência com Outras UCs:** Calendário estrito da Situação de Aprendizagem 1 (SA1) com acúmulo de provas e entregas concomitantes de outros módulos escolares no encerramento do bloco.
2. **Vulnerabilidade a Imprevistos e Absenteísmo na Equipe Fixa:** Regra de formação engessada com estritamente 4 alunos designados e sem reposição de integrantes; eventuais faltas por saúde ou imprevistos pessoais sobrecarregam de imediato os demais membros.
3. **Instabilidades de Infraestrutura no Laboratório Escolar:** Quedas de conexão à internet na rede escolar ou máquinas com restrições administrativas locais que podem dificultar a instalação de pacotes (`npm install`) e sincronização remota com o GitHub.

---

## Parte 2 — Matriz de Riscos do Projeto

### Critérios de Avaliação (Escala 1 a 5)
* **Probabilidade (P):** 1 (Muito Baixa) | 2 (Baixa) | 3 (Média) | 4 (Alta) | 5 (Muito Alta)
* **Impacto (I):** 1 (Muito Baixo) | 2 (Baixo) | 3 (Médio) | 4 (Alto) | 5 (Muito Alto / Crítico)
* **Pontuação:** $P \times I$ (Escala de 1 a 25)
* **Classificação:**
  * **Baixo:** 1 a 6
  * **Médio:** 7 a 14
  * **Alto:** 15 a 25

---

### Tabela da Matriz de Riscos

| # | Risco (Nomeado Claramente) | Probabilidade (1-5) | Impacto (1-5) | Pontuação (P × I) | Classificação | Ideia de Mitigação |
|---|---|:---:|:---:|:---:|:---:|---|
| **1** | **Conflitos de integração (*merge conflicts*) no GitHub decorrentes de alterações simultâneas em arquivos centrais do MVC** | 4 | 3 | **12** | **Médio** | Estabelecer fluxo de Git com branches isoladas por funcionalidade (`feature/`), commits curtos e frequentes, e realizar *pull requests* diários com conferência entre pares antes do merge na branch principal (`main`). |
| **2** | **Atraso ou falha técnica na migração dos dados em memória para banco de dados persistente** | 3 | 4 | **12** | **Médio** | Manter o isolamento rigoroso da camada `services/` (sem acoplamento com controllers); manter uma branch estável com a versão funcional em memória como contingência para a apresentação caso ocorram bloqueios na integração do banco. |
| **3** | **Falhas na implementação do middleware de autenticação (RNF002), gerando brechas de segurança ou bloqueio indevido de rotas de escrita** | 3 | 4 | **12** | **Médio** | Desenvolver e testar o middleware de autenticação isoladamente em uma rota mockada antes de aplicá-lo às rotas de CUD de Livros e Categorias; automatizar cenários de teste no Insomnia cobrindo requisições com token ausente, token inválido e token válido (401/403 vs 200/201). |
| **4** | **Sobrecarga de trabalho e quebra de cronograma por ausência imprevista de integrante da equipe em período crítico** | 3 | 4 | **12** | **Médio** | Praticar pareamento rotativo de tarefas (*pair programming*) e manter as tarefas do sprint transparentes no quadro kanban (GitHub Projects), garantindo que todo o time conheça as regras de negócio e eliminando gargalos de conhecimento individual (*fator-ônibus*). |
| **5** | **Divergência entre o comportamento real dos endpoints da API e os critérios de aceitação exigidos durante a defesa perante a banca** | 3 | 3 | **9** | **Médio** | Executar um *code freeze* 48 horas antes da data da avaliação perante a banca examinadora, congelando o código para testes de ponta a ponta e ensaio geral da apresentação oral com a collection atualizada do Insomnia. |
| **6** | **Inconsistência ou falha na integridade dos dados por ausência de validação preventiva de payloads (ex: estoque negativo, preço zerado ou ISBN inválido)** | 3 | 3 | **9** | **Médio** | Implementar camadas de validação nos controllers com retorno padronizado de status `400 Bad Request` antes de encaminhar requisições para as regras de negócio, conforme estabelecido nos requisitos RNF001 e RF006. |
| **7** | **Incompatibilidade ou falha de inicialização do projeto no ambiente de avaliação (divergência de versão de Node.js ou dependências não instaladas)** | 2 | 4 | **8** | **Médio** | Garantir o versionamento estrito do arquivo `package-lock.json`, fixar os scripts e versões recomendadas no `package.json` e validar a instalação limpa (`git clone` e `npm install`) em outro computador antes do dia da entrega final. |

---

## Checklist de Conformidade da Atividade

- [x] **Foco da Análise SWOT:** Todos os 4 quadrantes foram preenchidos avaliando a equipe técnica, a gestão do projeto, as ferramentas e o escopo do software, sem tratar a livraria como comércio varejista.
- [x] **Nomeação Clara de Riscos:** Identificados 7 riscos específicos de engenharia de software (superando a meta mínima de 5), evitando termos vagos.
- [x] **Cálculo de Severidade:** Todas as linhas contêm Probabilidade (1 a 5), Impacto (1 a 5), Pontuação calculada ($P \times I$) e a devida Classificação.
- [x] **Ações de Mitigação:** Todos os riscos classificados como Médio ou Alto possuem propostas práticas, preventivas e acionáveis de mitigação.
- [x] **Armazenamento Centralizado:** O documento encontra-se salvo na pasta oficial de documentação do repositório (`docs/`) junto ao Documento de Escopo e Especificação de Requisitos.
