# Documento de Escopo do Projeto

**Unidade Curricular:** Projetos de Software (PSOF) & Programação Back-End (PBE)  
**Atividade:** SA1 — Planejamento e Gerência: Desafio Formativo 1  
**Instituição:** Escola SENAI "Santo Paschoal Crepaldi"  
**Turma:** 1-2026-SESI_DEV_OC_1  
**Repositório:** [GabrielNunesLopes/livraria-api-grupo4](https://github.com/GabrielNunesLopes/livraria-api-grupo4)  

---

## 1. Identificação do Projeto

* **Nome do Projeto:** API de Gestão da Livraria — Grupo 4
* **Equipe de Projeto (Grupo 4):**
  * Vitor Hugo dos Santos Campos
  * Guilherme de Souza Barbosa
  * Isadora Costa Campanari
  * Gabriel Nunes Lopes

---

## 2. Objetivo do Projeto

Desenvolver e disponibilizar uma API RESTful modular para o gerenciamento de catálogo e controle de estoque de uma livraria local em expansão. O sistema fornecerá aos operadores e administradores uma interface de serviços padronizada, rápida e consistente para o cadastro, consulta, atualização e remoção de livros e categorias.

---

## 3. Justificativa

A livraria local identificou a necessidade urgente de modernizar seus controles e expandir suas operações comerciais. Atualmente, o controle descentralizado e informal gera inconsistências de estoque, dificuldade na localização de títulos e lentidão no atendimento aos clientes. 

A construção de uma API com arquitetura em camadas (MVC) resolve o problema imediato de organização de catálogo e gestão de estoque, ao mesmo tempo em que prepara a empresa tecnologicamente para futuras integrações (como sistemas web de frente de loja, aplicações móveis ou novos canais de vendas), reduzindo retrabalho e custos operacionais futuros.

---

## 4. Escopo Incluído (O que o projeto vai entregar)

Nesta versão do projeto, estão compreendidas as seguintes entregas e funcionalidades:

* **Módulo de Livros (CRUD Completo):**
  * Cadastro de novos títulos com atributos essenciais (título, autor, ISBN/código, preço, estoque, categoria);
  * Listagem geral de livros cadastrados;
  * Consulta detalhada de livro por identificador/índice com tratamento de inexistência (404);
  * Atualização de dados cadastrais de livros;
  * Remoção/inativação de títulos do catálogo.
* **Módulo de Categorias (CRUD Completo):**
  * Cadastro, listagem, atualização e exclusão de categorias literárias (gêneros e classificações);
  * Vinculação de livros às suas respectivas categorias.
* **Controle de Estoque:**
  * Registro e acompanhamento da quantidade de unidades físicas disponíveis por exemplar.
* **Autenticação e Permissões Básicas:**
  * Mecanismo de controle de acesso para operações administrativas (criação, edição e exclusão de dados).
* **Arquitetura e Qualidade de Código:**
  * Estruturação estrita no padrão arquitetural MVC (`routes`, `controllers`, `services`, `models`);
  * Adoção de boas práticas de *Clean Code* (métodos coesos, ausência de números mágicos e nomes expressivos);
  * Tratamento de erros e padronização de códigos de status HTTP (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
* **Documentação Técnica e de Gestão:**
  * Documento de Escopo, diagrama de classes UML atualizado e instruções de execução/testes no `README.md`.

---

## 5. Escopo Excluído (O que NÃO será entregue nesta versão)

Para garantir a viabilidade, a qualidade e o cumprimento dos prazos estabelecidos, ficam explicitamente fora do escopo desta versão:

* **Gateway e Pagamento Online:** Integração com operadoras de cartão, Pix, boletos ou plataformas de pagamento (ex.: Stripe, Mercado Pago);
* **Aplicativo Mobile:** Desenvolvimento de interfaces nativas ou híbridas para smartphones (Android / iOS);
* **Inteligência Artificial e Algoritmos de Recomendação:** Mecanismos automáticos de sugestão de leitura baseados em perfil de usuário ou aprendizado de máquina;
* **Sistema de Avaliações e Resenhas:** Comentários, pontuação em estrelas ou feedbacks públicos deixados por clientes;
* **Interface Gráfica para o Consumidor Final (E-commerce B2C):** Telas de vitrine virtual e checkout para compras online pelo público geral;
* **Cálculo de Frete e Integração com Transportadoras:** Consulta a APIs externas de logística e cálculo de taxas de entrega.

---

## 6. Premissas

Para o planejamento e execução deste projeto, assumem-se como verdadeiras as seguintes condições:

1. **Stack Tecnológica:** A implementação técnica continuará sendo realizada utilizando a plataforma **Node.js** com o framework **Express** em ambiente JavaScript;
2. **Evolução da Persistência:** A atual camada de dados em memória nos *services* será gradualmente adaptada para persistência estruturada/banco de dados conforme a evolução do bloco;
3. **Equipe Integrada:** Os quatro membros do grupo atuarão conjuntamente tanto no desenvolvimento técnico (Back-End) quanto na gestão e documentação (PSOF);
4. **Versionamento Centralizado:** O código-fonte e todos os artefatos de documentação serão mantidos e sincronizados via repositório Git/GitHub da equipe;
5. **Acesso aos Ambientes:** O ambiente de testes locais e execução de servidor permanecerá funcional nos computadores do laboratório SENAI.

---

## 7. Restrições

O projeto está condicionado às seguintes limitações incontornáveis:

* **Restrição de Prazo (Cronograma):** A entrega final, a documentação consolidada e a apresentação para a banca examinadora devem ocorrer impreterivelmente até o encerramento da Situação de Aprendizagem 1 (final do bloco letivo);
* **Restrição de Recursos Humanos:** A equipe de desenvolvimento e gestão é restrita exclusivamente aos 4 integrantes formalmente matriculados no Grupo 4;
* **Restrição Orçamentária (Custo Zero):** O projeto dispõe de orçamento financeiro nulo (R$ 0,00), devendo utilizar estritamente linguagens, bibliotecas, ferramentas e serviços de hospedagem/versionamento de código aberto ou gratuitos;
* **Restrição de Escopo Tecnológico:** A API deve obedecer às diretrizes curriculares do SENAI, mantendo aderência ao padrão REST e ao modelo MVC.

---

## 8. Critérios de Aceitação

O projeto será considerado concluído e aceito com êxito pela equipe e pela banca examinadora se atender aos seguintes requisitos verificáveis:

1. **Funcionalidade REST:** Todas as rotas de Livros e Categorias operando conforme especificação (respostas JSON corretas para operações de CRUD);
2. **Robustez e Códigos HTTP:** O sistema responder com status `200/201` para operações válidas, status `404` para recursos não encontrados e status `400` para requisições com dados malformados;
3. **Aderência Arquitetural:** O código-fonte apresentar separação limpa de camadas sem acoplamento indevido entre regras de negócio, controle HTTP e rotas;
4. **Reprodutibilidade:** O projeto ser clonado, instalado via `npm install` e executado via `npm run dev` sem falhas em qualquer máquina que atenda aos pré-requisitos;
5. **Defensabilidade do Planejamento:** A equipe apresentar e justificar com coerência todas as decisões de escopo, riscos, prazos e custos na defesa oral da Avaliação Somativa 1.
