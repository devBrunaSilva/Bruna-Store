const db = require('../../database');

class ProdutosRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT produtos.*, categorias.name AS nome_categoria
    FROM produtos
    LEFT JOIN categorias ON categorias.id = id_categoria
    ORDER BY produtos.nome ASC`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT produtos.*, categorias.name AS nome_categoria
    FROM produtos
    LEFT JOIN categorias ON categorias.id = id_categoria
    WHERE id_produto = $1
    `, [id]);

    return row;
  }

  async findByNome(nome) {
    const row = await db.query(`
    SELECT produtos.*, categorias.name AS nome_categoria
    FROM produtos
    LEFT JOIN categorias ON categorias.id = id_categoria
    WHERE nome ILIKE $1
    `, [`%${nome}%`]);

    return row;
  }

  async create({
    nome, descricao, preco, fabricante, estoque, id_categoria,
  }) {
    const [row] = await db.query(`INSERT INTO produtos(
      nome,
      descricao,
      preco,
      fabricante,
      estoque,
      id_categoria
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [nome, descricao, preco, fabricante, estoque, id_categoria]);

    return row;
  }

  async update(id, {
    nome, descricao, preco, fabricante, estoque, id_categoria,
  }) {
    const [row] = await db.query(`
      UPDATE produtos
      SET nome = $1, descricao = $2, preco = $3, fabricante = $4, estoque = $5, id_categoria = $6
      WHERE id_produto = $7
      RETURNING *
      `, [nome, descricao, preco, fabricante, estoque, id_categoria, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM produtos WHERE id_produto = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ProdutosRepository();
