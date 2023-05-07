const AvaliacoesRepository = require('../repositories/AvaliacoesRepository');

class AvaliacaoController {
  async index(request, response) { // listar todas as avaliações
    const avaliacoes = await AvaliacoesRepository.findAll();

    response.json(avaliacoes);
  }

  async store(request, response) { // criar uma avaliação
    const {
      id_cliente, id_produto, pontuacao, comentario,
    } = request.body;

    if (!id_cliente && !id_produto && (!(pontuacao || comentario))) {
      response.status(400).json({ error: 'Os dados obrigatórios da avaliação não estão sendo informados' });
    }

    const avaliacao = await AvaliacoesRepository.create({
      id_cliente, id_produto, pontuacao, comentario,
    });

    response.status(201).json(avaliacao);
  }

  async update(request, response) { // Editar uma avaliação
    const { id } = request.params;

    const {
      id_cliente, id_produto, pontuacao, comentario,
    } = request.body;

    const existeAvaliacao = await AvaliacoesRepository.findById(id);

    if (!existeAvaliacao) {
      return response.status(404).json({ error: 'Avaliação não encontrada' });
    }

    if (!id_cliente && !id_produto && (!(pontuacao || comentario))) {
      response.status(400).json({ error: 'Os dados obrigatórios da avaliação não estão sendo informados' });
    }

    const avaliacao = await AvaliacoesRepository.update(id, {
      id_cliente, id_produto, pontuacao, comentario,
    });

    response.json(avaliacao);
  }

  async delete(request, response) { // Deletar uma avaliação
    const { id } = request.params;

    await AvaliacoesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new AvaliacaoController();
