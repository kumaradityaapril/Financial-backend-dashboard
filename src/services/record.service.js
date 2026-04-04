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

exports.getFilteredRecords = async (filters) => {
  let query = `SELECT * FROM financial_records WHERE 1=1`;
  let values = [];

  if (filters.type) {
    values.push(filters.type);
    query += ` AND type = $${values.length}`;
  }

  if (filters.category) {
    values.push(filters.category);
    query += ` AND category = $${values.length}`;
  }

  if (filters.startDate) {
    values.push(filters.startDate);
    query += ` AND date >= $${values.length}`;
  }

  if (filters.endDate) {
    values.push(filters.endDate);
    query += ` AND date <= $${values.length}`;
  }

  query += ` ORDER BY created_at DESC`;

  const result = await pool.query(query, values);

  return result.rows;
};