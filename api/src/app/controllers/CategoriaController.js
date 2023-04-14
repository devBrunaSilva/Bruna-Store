const xml2js = require('xml2js');
const CategoriasRepository = require('../repositories/CategoriasRepository');

class CategoriaController {
  async index(request, response) { // listar todas as categorias
    const categorias = await CategoriasRepository.findAll();
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(categorias);

    const { type } = request.query;

    if (type === 'xml') {
      response.type('application/xml');
      response.send(xml);
    } else {
      response.json(categorias);
    }
  }

  show() { // obter UMA categoria

  }

  async showByNome(request, response) {
    const { nome } = request.params;

    const categoria = await CategoriasRepository.findByNome(nome);

    if (!categoria) {
      return response.status(404).json({ error: 'Categoria não encontrado' });
    }

    response.json(categoria);
  }

  async store(request, response) { // criar uma categoria
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'O nome é obrigatório' });
    }

    const existeCategoria = await CategoriasRepository.findByNome(name);

    if (existeCategoria) {
      response.status(400).json({ error: 'Já existe categoria cadastrada com esse nome' });
    }
    const categoria = await CategoriasRepository.create({ name });

    response.json(categoria);
  }

  async update(request, response) { // Editar uma categoria
    const { id } = request.params;

    const { name } = request.body;

    const existeCategoria = await CategoriasRepository.findById(id);

    if (!existeCategoria) {
      return response.status(404).json({ error: 'Categoria não encontrado' });
    }

    if (!name) {
      return response.status(404).json({ error: 'Nome é obrigatório' });
    }

    const categoriaByNome = await CategoriasRepository.findByNome(name);

    if (!existeCategoria && categoriaByNome.id !== id) {
      response.status(400).json({ error: 'Já existe categoria cadastrada com esse nome' });
    }

    const categoria = await CategoriasRepository.update(id, { name });

    response.json(categoria);
  }
}

module.exports = new CategoriaController();
