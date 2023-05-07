const ItensPedidoRepository = require('../repositories/ItensPedidoRepository');
const PedidosRepository = require('../repositories/PedidosRepository');

class PedidoController {
  async index(request, response) { // listar todos os pedidos
    const pedidos = await PedidosRepository.findAll();

    response.json(pedidos);
  }

  async show(request, response) { // obter UM pedido
    const { id } = request.params;

    const pedido = await PedidosRepository.findById(id);

    if (!pedido) {
      return response.status(404).json({ error: 'Cliente não encontrado' });
    }

    response.json(pedido);
  }

  async store(request, response) { // criar um pedido
    const {
      id_cliente, status, itens,
    } = request.body;

    const data_pedido = new Date();

    let valor_total = 0;

    itens.forEach((item) => {
      valor_total += item.quantidade * parseFloat(item.preco_unitario);
    });

    const pedido = await PedidosRepository.create({
      id_cliente, data_pedido, valor_total, status,
    });

    const itens_pedido = [];

    await Promise.all(itens.map(async (item) => {
      const {
        id_produto, quantidade, preco_unitario,
      } = item;

      const { id_pedido } = pedido;

      const item_pedido = await ItensPedidoRepository.create({
        id_pedido, id_produto, quantidade, preco_unitario,
      });

      itens_pedido.push(item_pedido);
    }));

    response.status(201).json({ pedido, itens_pedido });
  }
}

module.exports = new PedidoController();
