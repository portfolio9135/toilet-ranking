// 【データベースとテーブルの初期化をまとめて実行するファイル】

//このライブラリは、非同期処理を簡単にするためのPromiseベースのMySQLクライアント
//mysql2/promiseライブラリを使うと、Promiseベースの接続を簡単に作成できるようになる
const mysql = require('mysql2/promise');

const dbConfig = require('../config/dbConfig');
const createDatabaseIfNotExists = require('./createDatabase');
const createTablesIfNotExists = require('./createTables');

// 【データベースに接続し、データベースを作成】
const initializeDatabase = async (retries = 10, delay = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await createDatabaseIfNotExists(); //データベースを作成
      await createTablesIfNotExists(); //テーブルを作成
      const db = await mysql.createConnection(dbConfig);
      console.log(`やった！！！${i + 1}回目でMySQL接続成功しましたーーーーーーーーーーーーーーーーーーーーーー`);
      return db;
    } catch (err) {
      console.error(`${i + 1}回目のMySQL接続は、、、、失敗です!!  再試行中です... (${i + 1}/${retries})`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay)); // 10秒待ってから再試行
      } else {
        throw err;
      }
    }
  }
};

module.exports = initializeDatabase;