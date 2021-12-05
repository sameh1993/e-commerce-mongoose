
const mysql = require("mysql");

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'sameh200320',
  database: "e_commerce"
});

exports.Query = (statement) => {
  return new Promise((resolve, reject) => {
    db.query(statement, (err, results, fields) => {
      if(!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })
  })
}

exports.QueryWithParams = (statement, params) => {
  return new Promise((resolve, reject) => {
    db.query(statement, params, (err, results, fields) => {
      if(!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })
  })
}