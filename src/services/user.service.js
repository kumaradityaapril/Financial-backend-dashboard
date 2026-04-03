const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, status)
     VALUES ($1, $2, $3, $4, 'active')
     RETURNING id, name, email, role, status`,
    [data.name, data.email, hashedPassword, data.role]
  );

  return result.rows[0];
};

exports.getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, status, created_at FROM users`
  );

  return result.rows;
};