const livroService = require("../services/livroService");

function listar(req, res) {
  const livros = livroService.listarLivros();
  res.json(livros);
}

function buscarPorIndice(req, res) {
  //req, res são os parâmetros que representam a requisição e a resposta do Express.js. O parâmetro req contém informações sobre a requisição HTTP, como parâmetros de rota, corpo da requisição, cabeçalhos, etc. O parâmetro res é usado para enviar a resposta de volta ao cliente.
  const indice = req.params.indice; //req.params.indice é usado para acessar o valor do parâmetro de rota chamado "indice" na URL da requisição. Por exemplo, se a rota for definida como "/livros/:indice", e a requisição for feita para "/livros/2", então req.params.indice terá o valor "2".
  const livro = livroService.buscarLivroPorIndice(indice); // indice é passado como argumento para a função buscarLivroPorIndice do livroService, que retorna o livro correspondente ao índice fornecido.

  if (!livro) {
    // Se o livro não for encontrado (ou seja, se a função buscarLivroPorIndice retornar null ou undefined), o código dentro do bloco if será executado.
    res.status(404).json({ erro: "Livro nao encontrado" }); //res.status(404) define o status HTTP da resposta como 404 (Not Found), indicando que o recurso solicitado não foi encontrado. Em seguida, res.json({ erro: "Livro nao encontrado" }) envia uma resposta JSON contendo uma mensagem de erro para o cliente.
    return;
  }

  res.json(livro);
}
function criar(req, res) {
  const novoLivro = livroService.criarLivro(req.body);
  res.status(201).json(novoLivro);
}

function atualizar(req, res) {
  const livro = livroService.atualizarLivro(req.params.indice, req.body);
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

function atualizarParcial(req, res) {
  const livro = livroService.atualizarParcialLivro(req.params.indice, req.body);
  if (!livro) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(200).json(livro);
}

function deletar(req, res) {
  const removido = livroService.deletarLivro(req.params.indice);
  if (!removido) return res.status(404).json({ erro: "Livro nao encontrado" });
  res.status(204).send();
}

module.exports = { listar, buscarPorIndice, criar, atualizar, atualizarParcial, deletar };
