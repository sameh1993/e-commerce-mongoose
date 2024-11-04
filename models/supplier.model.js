const pool = require("../models/db");

exports.addNewSupplier = async (sup) => {
  const sql = `insert into suppliers ( name, address, phone1, phone2 ) values ( ?, ?,  ?, ? )`;
  return await pool.query(sql, [sup.name, sup.address, sup.phone1, sup.phone2]);
};

exports.getAllSupplier = async () => {
  const sql = `select * from suppliers`;
  return await pool.query(sql);
};
