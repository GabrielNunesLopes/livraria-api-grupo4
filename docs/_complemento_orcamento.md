---

## Complemento — Orçamento e papéis do projeto

Para este orçamento, usamos a contagem preliminar de Pontos de Função já registrada no documento: 56 PF, convertidos pela referência de 8 horas por PF. Isso representa 448 horas para o escopo completo de livros e categorias. O Planning Poker de 14 horas cobre apenas as tarefas do backlog preparado, por isso não representa o produto inteiro. A decisão formal registrada em 23/10 não aparece nas issues consultadas; usamos Pontos de Função como base do orçamento global.

### Parte 1 — Orçamento do projeto

#### 1.1 Base da estimativa

**Estimativa usada:** Pontos de Função  
**Total de horas de desenvolvimento:** 448 horas  
**Cálculo:** 56 PF × 8 horas/PF = 448 horas.

Escolhemos Pontos de Função para estimar o produto completo porque a contagem inclui as funções de livros e categorias. O Planning Poker registrado cobre um conjunto menor de tarefas; por isso, usamos a contagem de PF para calcular o custo total do projeto.

#### 1.2 Custo de pessoal

**Percentual de horas de gestão:** 15% — percentual intermediário da faixa de 10% a 20%, adotado para cobrir coordenação, acompanhamento e resposta aos riscos médios e altos.

| Papel | Horas e cálculo | Custo por hora | Custo |
|---|---:|---:|---:|
| Desenvolvimento | 448 h × R$ 40,00 | R$ 40,00 | R$ 17.920,00 |
| Gestão | 67,2 h × R$ 60,00 | R$ 60,00 | R$ 4.032,00 |
| **Total de pessoal** | 448 h + 67,2 h |  | **R$ 21.952,00** |

#### 1.3 Infraestrutura

Os computadores, a internet e o laboratório já estão disponíveis para o grupo. Consideramos apenas custo incremental do projeto; nenhum valor adicional foi informado.

| Item | Valor mensal ou único | Meses de uso | Custo considerado |
|---|---:|---:|---:|
| Computadores dos integrantes ou laboratório | Recurso existente | — | R$ 0,00 |
| Internet e rede do laboratório | Recurso existente | — | R$ 0,00 |
| **Total de infraestrutura** |  |  | **R$ 0,00** |

#### 1.4 Software e serviços

Consideramos as ferramentas já listadas para o projeto em versões gratuitas, de código aberto ou já disponíveis ao grupo. O valor abaixo é custo incremental informado para esta atividade.

| Item | Gratuito ou pago? | Custo considerado |
|---|---|---:|
| GitHub e Projects | Plano disponível ao grupo | R$ 0,00 |
| Visual Studio Code, Node.js e Express | Gratuitos / código aberto | R$ 0,00 |
| MySQL Community | Gratuito | R$ 0,00 |
| Postman | Plano gratuito disponível | R$ 0,00 |
| **Total de software e serviços** |  | **R$ 0,00** |

#### 1.5 Reserva de contingência

| Número | Risco | Classificação |
|---:|---|---|
| 1 | Conflitos de integração em arquivos MVC | Médio |
| 2 | Atraso na migração dos dados em memória para o banco | Alto |
| 3 | Falha na autenticação das rotas de escrita | Alto |
| 4 | Ausência de integrante em período crítico | Médio |
| 6 | Payload sem validação preventiva | Médio |
| 7 | Falha de instalação ou inicialização no ambiente de avaliação | Médio |
| 8 | Estimativas iniciais não refletirem o esforço real da equipe | Médio |

O risco 5 ficou fora da reserva porque a matriz o classifica como baixo. Os riscos 2 e 3 são altos; os riscos 1, 4, 6, 7 e 8 são médios.

**Percentual escolhido:** 15%  
**Justificativa:** os riscos de persistência e autenticação estão classificados como altos. A reserva intermediária também cobre integração, validação, disponibilidade de integrantes, instalação e incerteza da estimativa.

#### 1.6 Resumo do orçamento

| Bloco | Cálculo | Valor |
|---|---|---:|
| 1. Pessoal | R$ 17.920,00 + R$ 4.032,00 | R$ 21.952,00 |
| 2. Infraestrutura | Recursos existentes, sem custo incremental informado | R$ 0,00 |
| 3. Software e serviços | Ferramentas gratuitas ou já disponíveis | R$ 0,00 |
| **Subtotal (1 + 2 + 3)** | R$ 21.952,00 + R$ 0,00 + R$ 0,00 | **R$ 21.952,00** |
| 4. Reserva de contingência | R$ 21.952,00 × 15% | R$ 3.292,80 |
| **Total do projeto** | R$ 21.952,00 + R$ 3.292,80 | **R$ 25.244,80** |

### Parte 2 — Equipe, papéis e matriz RACI

#### 2.1 Papéis de cada integrante

| Integrante | Papel no projeto | Papel no Scrum registrado em 16/10 |
|---|---|---|
| Gabriel Nunes Lopes | Desenvolvimento e coordenação técnica | Scrum Master e integrante do time de desenvolvimento |
| Guilherme de Souza Barbosa | Desenvolvimento, banco e preparação do ambiente | Integrante do time de desenvolvimento |
| Vitor Hugo dos Santos Campos | Desenvolvimento e persistência de dados | Integrante do time de desenvolvimento |
| Isadora Costa Campanari | Desenvolvimento, produto e validação | Product Owner e integrante do time de desenvolvimento |

#### 2.2 Matriz RACI

**R** executa; **A** responde pelo resultado e aprova; **C** é consultado; **I** recebe informação. A matriz abaixo distribui as responsabilidades com base nos papéis e responsáveis anotados no planejamento do projeto.

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
| Documentação de instalação e execução | C | R | I | A |

Cada atividade tem exatamente um A e pelo menos um R, incluindo quando uma célula está marcada A/R. A proposta distribui o papel R entre a equipe: Gabriel em 3 atividades, Guilherme em 5, Vitor em 4 e Isadora em 2; ninguém ficou responsável pela execução em quase todas as linhas.

**A matriz confere com os assignees das issues no Project?** Não foi possível confirmar: a busca no repositório do GitHub não encontrou issues cadastradas. A matriz registra a divisão proposta a partir do planejamento local e deve ser comparada aos assignees quando as issues estiverem disponíveis.

**Sobre sobrecarga:** a distribuição proposta não concentra o papel R em uma pessoa. O grupo deve confirmar a carga real ao revisar as issues do Project.

### Conferência do orçamento

- A base de 56 PF resulta em 448 horas usando 8 horas por PF.
- As horas de gestão foram calculadas como 448 × 15% = 67,2 horas.
- O custo de pessoal é R$ 17.920,00 + R$ 4.032,00 = R$ 21.952,00.
- A reserva é R$ 21.952,00 × 15% = R$ 3.292,80.
- O total é R$ 21.952,00 + R$ 3.292,80 = R$ 25.244,80.
- Todas as linhas da RACI têm exatamente um A e pelo menos um R.

