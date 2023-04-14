const db = require('../../database');

class CategoriasRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categorias ORDER BY name ASC');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT * FROM categorias
    WHERE id = $1
    `, [id]);

    return row;
  }

  async findByNome(nome) {
    const row = await db.query(`
    SELECT *
    FROM categorias
    WHERE name ILIKE $1`, [`${nome}%`]);

    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categorias(name)
      VALUES($1)
      RETURNING *
      `, [name]);

    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
    UPDATE categorias
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id]);

    return row;
  }
}

module.exports = new CategoriasRepository();
