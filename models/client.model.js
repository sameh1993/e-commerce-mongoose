const pool = require("../models/db");

exports.addClient = async (c) => {
  const url = `insert into clients ( name, address, phone1, phone2) values ( ?, ?, ?, ?)`;
  const result = await pool.query(url, [c.name, c.address, c.phone1, c.phone2]);
  return result;
};

exports.getClientById = async (id) => {
  const url = `select * from clients where idclient = ?`;
  return await pool.query(sql, [id]);
};

exports.getClients = async () => {
  const sql = `select * from clients`;
  return await pool.query(sql);
};
