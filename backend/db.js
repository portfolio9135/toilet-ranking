// /backend/db.js
const mysql = require('mysql2');
const dbConfig = require('./config/dbConfig');

const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

db.connect((err) => {
  if (err) {
    console.error('エラー！！データベースに接続できませんでしたーーーーーーーー', err);
    return;
  }
  console.log('データベースに接続成功しましたーーーーーーーーーーーーーーーーー');
});

module.exports = db;
