// 【テーブル作成部分のロジックを書くファイル】

//このライブラリは、非同期処理を簡単にするためのPromiseベースのMySQLクライアント
//mysql2/promiseライブラリを使うと、Promiseベースの接続を簡単に作成できるようになる
const mysql = require('mysql2/promise');

//設定ファイルをインポート。データベースに接続するための情報
//（ホスト名、ユーザー名、パスワード、データベース名）が書かれてる
const dbConfig = require('../config/dbConfig');



// 【テーブル作成の関数】
const createTablesIfNotExists = async () => {

  // dbConfigを使ってMySQLデータベースに接続するためのコネクションオブジェクトを作成してる。
  // awaitを使って、接続が完了するの待ってる。このdbという変数が、以降のクエリを実行するための接続オブジェクトになる。
  const db = await mysql.createConnection(dbConfig);

  //テーブルを作成するためのSQLクエリを定義している部分。
  //このクエリは、toiletという名前のテーブルを作成するもので、以下のカラムを持ってる
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS toilet (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      comment VARCHAR(255) NOT NULL,
      rating FLOAT NOT NULL
    )
  `;

  //定義したSQLクエリを実行して、toiletテーブルを作成している。この処理が完了するまで待つためにawaitを使ってる。
  await db.query(createTableQuery);
  console.log(`テーブルを作成しましたーーーーーーーーーーーーー toilets`);

  //データベースとの接続を終了している部分。
  //これによって、リソースを解放し、接続をきれいに閉じている。
  await db.end();
};

module.exports = createTablesIfNotExists;