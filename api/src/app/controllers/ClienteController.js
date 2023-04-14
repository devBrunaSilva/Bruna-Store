const xml2js = require('xml2js');
const ClientesRepository = require('../repositories/ClientesRepository');

class ClienteController {
  async index(request, response) { // listar todos os clientes
    const clientes = await ClientesRepository.findAll();

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(clientes);

    const { type } = request.query;

    if (type === 'xml') {
      response.type('application/xml');
      response.send(xml);
    } else {
      response.json(clientes);
    }
  }

  async show(request, response) { // obter UM cliente
    const { id } = request.params;

    const cliente = await ClientesRepository.findById(id);

    if (!cliente) {
      return response.status(404).json({ error: 'Cliente não encontrado' });
    }

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(cliente);
    const { type } = request.query;

    if (type === 'xml') {
      response.type('application/xml');
      response.send(xml);
    } else {
      response.json(cliente);
    }
  }

  async showByNome(request, response) { // obter UM cliente Por Nome
    const { nome } = request.params;

    const cliente = await ClientesRepository.findByNome(nome);

    if (!cliente) {
      return response.status(404).json({ error: 'Cliente não encontrado' });
    }

    response.json(cliente);
  }

  async store(request, response) { // criar um cliente
    const { type } = request.query;

    if (type === 'xml') {
      const {
        pessoa: {
          nome, endereco, telefone, email,
        },
      } = request.body;

      const newObj = {
        nome: nome[0], endereco: endereco[0], telefone: telefone[0], email: email[0],
      };

      const cliente = await ClientesRepository.create(newObj);
      response.json(cliente);
    } else {
      const {
        nome, endereco, telefone, email,
      } = request.body;

      if (!nome) {
        response.status(400).json({ error: 'O nome é obrigatório' });
      }

      const existeCliente = await ClientesRepository.findByEmail(email);

      if (existeCliente) {
        response.status(400).json({ error: 'Já existe cliente cadastrado com esse email' });
      }

      const cliente = await ClientesRepository.create({
        nome, endereco, telefone, email,
      });
      response.json(cliente);
    }
  }

  async update(request, response) { // Editar uma categoria
    const { id } = request.params;

    const {
      nome,
      endereco,
      telefone,
      email,
    } = request.body;

    const existeCliente = await ClientesRepository.findById(id);

    if (!existeCliente) {
      return response.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (!nome) {
      return response.status(404).json({ error: 'Nome é obrigatório' });
    }

    const clienteByEmail = await ClientesRepository.findByEmail(email);

    if (!existeCliente && clienteByEmail.id !== id) {
      response.status(400).json({ error: 'Já existe cliente cadastrado com esse email' });
    }

    const cliente = await ClientesRepository.update(id, {
      nome, endereco, telefone, email,
    });

    response.json(cliente);
  }
}

module.exports = new ClienteController();
