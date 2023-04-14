const db = require('../../database');

class ItensPedidoRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT *
    FROM itens_pedido`);

    return rows;
  }

  async create({
    id_pedido,
    id_produto,
    quantidade,
    preco_unitario,
  }) {
    const [row] = await db.query(`
    INSERT INTO itens_pedido(
    id_pedido,
    id_produto,
    quantidade,
    preco_unitario
    ) VALUES ($1,$2,$3,$4)
    RETURNING *
    `, [id_pedido, id_produto, quantidade, preco_unitario]);

    return row;
  }
}

module.exports = new ItensPedidoRepository();
