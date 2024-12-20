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

  try {
    // 【投稿したトイレのテーブル】
    const createToiletsTableQuery = `
      CREATE TABLE IF NOT EXISTS toilets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        imgUrl VARCHAR(255),
        address VARCHAR(255) NOT NULL,
        comment VARCHAR(255),
        rating FLOAT NOT NULL,
        postingUserId INT NOT NULL,
        postingUserName VARCHAR(255) NOT NULL
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `;
    await db.execute(createToiletsTableQuery);
    console.log(`テーブルを作成しましたーーーーーーーーーーーーー【テーブル名: toilets】`);

    // 【登録してるユーザーのテーブル】
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255) DEFAULT 'img/default-avatar-url.png',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `;
    await db.execute(createUserTableQuery);
    console.log(`テーブルを作成しましたーーーーーーーーーーーーー【テーブル名: users】`);
  }
  catch(err) {
    console.error("テーブル作成中にエラーが発生しました！:", err);
    throw err;
  } finally {
    await db.end();
  }
};

module.exports = createTablesIfNotExists;