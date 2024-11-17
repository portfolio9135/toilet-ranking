// 【データベースとテーブルの初期化をまとめて実行するファイル】

//このライブラリは、非同期処理を簡単にするためのPromiseベースのMySQLクライアント
//mysql2/promiseライブラリを使うと、Promiseベースの接続を簡単に作成できるようになる
const mysql = require('mysql2/promise');

const dbConfig = require('../config/dbConfig');
const createDatabaseIfNotExists = require('./createDatabase');
const createTablesIfNotExists = require('./createTables');

// 【コネクションプールを作成する関数 (DBに接続し、DBを作成)】
const initializeDatabase = async (retries = 10, delay = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      //データベースとテーブルを初期化
      await createDatabaseIfNotExists(); //データベースを作成
      await createTablesIfNotExists(); //テーブルを作成

      const pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true, //接続がいっぱいの時は待つ
        connectionLimit: 10, //最大10個まで同時接続可能
        queueLimit: 0, //キューの制限なし
      });

      console.log(`やった！！！${i + 1}回目でMySQL接続成功しましたーーーーーーーーーーーーーーーーーーーーーー`);
      return pool; //プールを返す
    } catch (err) {
      console.error(`${i + 1}回目のMySQL接続は、、、、失敗です!!  再試行中です... (${i + 1}/${retries})`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay)); // 10秒待ってから再試行
      } else {
        throw err; //設定した再試行回数を超えたらエラーを投げる
      }
    }
  }
};

module.exports = initializeDatabase;