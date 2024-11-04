const pool = require("./db");

exports.addInvoice = async (invoice) => {
  const sql = `insert into moves( paid_cash, residual , total_price, clientid, type ) values ( ?, ?,?, ?, ? )`;
  return await pool.query(sql, [
    +invoice.cashValue,
    +invoice.remainingValue,
    +invoice.totalPrice,
    +invoice.idsup, // client
    "invoice",
  ]);
};

exports.addPermission = async (invoice) => {
  const sql = `insert into moves( paid_cash, residual , total_price,  supplierid, type ) values ( ?, ?,?, ?, ? )`;
  return await pool.query(sql, [
    +invoice.cashValue,
    +invoice.remainingValue,
    +invoice.totalPrice,
    +invoice.idsup, // client
    "supply",
  ]);
};

exports.getInvoiceById = async (id) => {
  const sql = `select * from invoices i left JOIN clients c on i.clientid = c.idClient where i.clientid = ?`;
  return await pool.query(sql, [id]);
};

exports.getInvoicebyClient = async (id) => {
  // return console.log(id)
  const sql = `select * from  moves where clientid = ?`;
  return await pool.query(sql, [id]);
};
