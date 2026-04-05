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

exports.getTotalIncome = async () => {
  const result = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total_income 
     FROM financial_records 
     WHERE type = 'income'`
  );

  return result.rows[0];
};

exports.getTotalExpense = async () => {
  const result = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total_expense 
     FROM financial_records 
     WHERE type = 'expense'`
  );

  return result.rows[0];
};

exports.getNetBalance = async () => {
  const result = await pool.query(
    `SELECT 
       COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0)
       AS net_balance
     FROM financial_records`
  );

  return result.rows[0];
};

exports.getCategoryTotals = async () => {
  const result = await pool.query(
    `SELECT category, SUM(amount) AS total
     FROM financial_records
     GROUP BY category
     ORDER BY total DESC`
  );

  return result.rows;
};

exports.updateRecord = async (id, data) => {
  const result = await pool.query(
    `UPDATE financial_records
     SET amount = $1, type = $2, category = $3, date = $4, notes = $5
     WHERE id = $6
     RETURNING *`,
    [data.amount, data.type, data.category, data.date, data.notes, id]
  );

  return result.rows[0];
};

exports.deleteRecord = async (id) => {
  const result = await pool.query(
    `DELETE FROM financial_records WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};