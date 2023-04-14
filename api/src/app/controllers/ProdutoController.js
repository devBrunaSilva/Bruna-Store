const xml2js = require('xml2js');
const ProdutosRepository = require('../repositories/ProdutosRepository');

class ProdutoController {
  async index(request, response) { // listar todos os produtos
    const produtos = await ProdutosRepository.findAll();

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(produtos);

    const { type } = request.query;

    if (type === 'xml') {
      response.type('application/xml');
      response.send(xml);
    } else {
      response.json(produtos);
    }
  }

  async show(request, response) { // obter UM produto
    const { id } = request.params;

    const produto = await ProdutosRepository.findById(id);

    if (!produto) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(produto);

    const { type } = request.query;

    if (type === 'xml') {
      response.type('application/xml');
      response.send(xml);
    } else {
      response.json(produto);
    }
  }

  async showByNome(request, response) {
    const { nome } = request.params;

    const produto = await ProdutosRepository.findByNome(nome);

    if (!produto) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    response.json(produto);
  }

  async store(request, response) { // criar um produto
    const {
      nome,
      descricao,
      preco,
      fabricante,
      estoque,
      id_categoria,
    } = request.body;

    if (!nome) {
      response.status(400).json({ error: 'O nome é obrigatório' });
    }

    const existeProduto = await ProdutosRepository.findByNome(nome);

    if (existeProduto) {
      response.status(400).json({ error: 'Já existe produto cadastrado com esse nome' });
    }

    const produto = await ProdutosRepository.create({
      nome,
      descricao,
      preco,
      fabricante,
      estoque,
      id_categoria,
    });

    response.json(produto);
  }

  async update(request, response) { // Editar um produto
    const { id } = request.params;

    const {
      nome,
      descricao,
      preco,
      fabricante,
      estoque,
      id_categoria,
    } = request.body;

    const existeProduto = await ProdutosRepository.findById(id);

    if (!existeProduto) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    if (!nome) {
      return response.status(404).json({ error: 'O nome do produto é obrigatório' });
    }

    const existeProdutos = await ProdutosRepository.findByNome(nome);

    if (existeProdutos) {
      response.status(400).json({ error: 'Já existe produto cadastrado com esse nome' });
    }

    const produto = await ProdutosRepository.update(id, {
      nome,
      descricao,
      preco,
      fabricante,
      estoque,
      id_categoria,
    });

    response.json(produto);
  }
}

module.exports = new ProdutoController();
