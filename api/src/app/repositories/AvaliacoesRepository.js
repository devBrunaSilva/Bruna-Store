const db = require('../../database');

class AvaliacoesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM avaliacoes ORDER BY pontuacao');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT * FROM avaliacoes
    WHERE id_avaliacao = $1
    `, [id]);

    return row;
  }

  async create({
    id_cliente, id_produto, pontuacao, comentario,
  }) {
    const [row] = await db.query(`
    INSERT INTO avaliacoes(
      id_cliente,
      id_produto,
      pontuacao,
      comentario
    ) VALUES ($1,$2,$3,$4)
    RETURNING*
    `, [id_cliente, id_produto, pontuacao, comentario]);

    return row;
  }

  async update(id, {
    id_cliente, id_produto, pontuacao, comentario,
  }) {
    const [row] = await db.query(`
    UPDATE avaliacoes
    SET id_cliente = $1, id_produto = $2, pontuacao = $3, comentario = $4
    WHERE id_avaliacao = $5
    RETURNING *
    `, [id_cliente, id_produto, pontuacao, comentario, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM avaliacoes WHERE id_avaliacao = $1', [id]);

    return deleteOp;
  }
}

module.exports = new AvaliacoesRepository();
