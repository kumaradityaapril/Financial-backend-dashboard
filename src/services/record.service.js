const pool = require("../config/db");

exports.createRecord = async (data) => {
  const result = await pool.query(
    `INSERT INTO financial_records (amount, type, category, date, notes, user_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.amount,
      data.type,
      data.category,
      data.date,
      data.notes,
      data.user_id,
    ]
  );

  return result.rows[0];
};

exports.getRecords = async () => {
  const result = await pool.query(
    `SELECT * FROM financial_records ORDER BY created_at DESC`
  );

  return result.rows;
};