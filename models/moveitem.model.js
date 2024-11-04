const pool = require("./db");

exports.pushInvoiceItems = async (invoiceid, items) => {
  // return console.log(items);
  var sql = `insert into moveItems ( itemid, salePrice, purchasePrice, amount, total, moveid ) values `;
  for (item of items) {
    sql =
      sql +
      `( ${item.idItem}, ${item.salePrice}, ${item.purchasePrice}, ${item.amount}, ${item.total}, ${invoiceid}),`;
  }
  sql = sql.slice(0, -1);
  return await pool.query(sql);
};

exports.getInvoiceItems = async (idinvoice) => {
  const sql = `select * from moveitems from invoiceid = ?`
  return await pool.query(sql, [idinvoice] )
}
