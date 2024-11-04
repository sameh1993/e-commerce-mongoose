const { createPool } = require("mysql2");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "store",
  port: 3306,
  multipleStatements: true,
}).promise();

module.exports = pool;
