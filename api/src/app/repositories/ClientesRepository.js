const db = require('../../database');

class ClientesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM clientes ORDER BY nome ASC');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM clientes WHERE id_cliente = $1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM clientes WHERE email = $1', [email]);

    return row;
  }

  async findByNome(nome) {
    const row = await db.query(`
    SELECT *
    FROM clientes
    WHERE nome ILIKE $1`, [`%${nome}%`]);

    return row;
  }

  async create({
    nome, endereco, telefone, email,
  }) {
    const [row] = await db.query(`INSERT INTO clientes(
      nome,
      endereco,
      telefone,
      email
    ) VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [nome, endereco, telefone, email]);

    return row;
  }

  async update(id, {
    nome, endereco, telefone, email,
  }) {
    const [row] = await db.query(`
      UPDATE clientes
      SET nome = $1, endereco = $2, telefone = $3,email = $4
      WHERE id_cliente = $5
      RETURNING *
    `, [nome, endereco, telefone, email, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM clientes WHERE id_cliente = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ClientesRepository();
