const mysql = require("mysql2");
const pool = require("../models/db");

exports.addNewItem = async (item) => {
  // return console.log(item)
  const result = await pool.query(
    "insert into store ( itemName, unit, purchasePrice, salePrice ) values ( ?, ?, ?, ?)",
    [item.itemName, item.unit, +item.purchasePrice, +item.salePrice]
  );
  return result[0];
};

exports.getAllItems = async () => {
  const sql = `select idItem, itemName from store`;
  return await pool.query(sql);
};

exports.getItemById = async (id) => {
  const sql = `select * from store where idItem = ?`;
  return await pool.query(sql, [id]);
};
