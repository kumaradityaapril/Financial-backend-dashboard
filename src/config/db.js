const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance_assignment_db",
  password: "postgres123",
  port: 5432,
});

module.exports = pool;
