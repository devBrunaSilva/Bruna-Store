const db = require('../../database');

class PedidosRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT pedidos.id_pedido,
      pedidos.id_cliente,
      pedidos.data_pedido,
      pedidos.valor_total,
      pedidos.status,
      array_agg(itens_pedido.id_itens_pedido) AS id_itens_pedido,
      array_agg(itens_pedido.id_produto) AS id_produto,
      array_agg(itens_pedido.quantidade) AS quantidade,
      array_agg(produtos.nome) AS nome,
      array_agg(produtos.descricao) AS descricao,
      array_agg(produtos.preco) AS preco,
      array_agg(produtos.fabricante) AS fabricante,
      array_agg(produtos.estoque) AS estoque,
      array_agg(categorias.name) AS categoria_nome
      FROM pedidos
      INNER JOIN itens_pedido ON pedidos.id_pedido = itens_pedido.id_pedido
      INNER JOIN produtos ON itens_pedido.id_produto = produtos.id_produto
      INNER JOIN categorias ON produtos.id_categoria = categorias.id
      GROUP BY pedidos.id_pedido,
      pedidos.id_cliente,
      pedidos.data_pedido,
      pedidos.valor_total,
      pedidos.status
    `);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
    SELECT pedidos.id_pedido,
      pedidos.id_cliente,
      pedidos.data_pedido,
      pedidos.valor_total,
      pedidos.status,
      array_agg(itens_pedido.id_itens_pedido) AS id_itens_pedido,
      array_agg(itens_pedido.id_produto) AS id_produto,
      array_agg(itens_pedido.quantidade) AS quantidade,
      array_agg(produtos.nome) AS nome,
      array_agg(produtos.descricao) AS descricao,
      array_agg(produtos.preco) AS preco,
      array_agg(produtos.fabricante) AS fabricante,
      array_agg(produtos.estoque) AS estoque,
      array_agg(categorias.name) AS categoria_nome
      FROM pedidos
      INNER JOIN itens_pedido ON pedidos.id_pedido = itens_pedido.id_pedido
      INNER JOIN produtos ON itens_pedido.id_produto = produtos.id_produto
      INNER JOIN categorias ON produtos.id_categoria = categorias.id
      WHERE pedidos.id_pedido = $1
      GROUP BY pedidos.id_pedido,
      pedidos.id_cliente,
      pedidos.data_pedido,
      pedidos.valor_total,
      pedidos.status;
    `, [id]);

    return rows;
  }

  async create({
    id_cliente,
    data_pedido,
    valor_total,
    status,
  }) {
    const [row] = await db.query(`INSERT INTO pedidos(id_cliente,data_pedido,valor_total,status) VALUES ($1,$2,$3,$4)
    RETURNING *
    `, [id_cliente, data_pedido, valor_total, status]);

    return row;
  }
}

module.exports = new PedidosRepository();
