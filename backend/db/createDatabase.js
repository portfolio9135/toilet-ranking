// 【データベースの作成部分のロジックを書くファイル】

//このライブラリは、非同期処理を簡単にするためのPromiseベースのMySQLクライアント
//mysql2/promiseライブラリを使うと、Promiseベースの接続を簡単に作成できるようになる
const mysql = require('mysql2/promise');

//設定ファイルをインポート。データベースに接続するための情報
//（ホスト名、ユーザー名、パスワード、データベース名）が書かれてる
const dbConfig = require('../config/dbConfig');



// 【データベース作成の関数】

//createDatabaseIfNotExistsという非同期関数を定義してる。
//この関数が呼ばれたら、データベースの存在確認と作成をする処理が始まる
const createDatabaseIfNotExists = async () => {

  //createConnectionメソッドは、データベースに接続するためのコネクションオブジェクトを作成するためのもの
  //このコネクションオブジェクトを使うことで、データベースに対するクエリを実行したり、データを取得したり、更新したりすることができる
  //指定した設定（ホスト名、ユーザー名、パスワードなど）でMySQLに接続できるようになる
  const connection =  await mysql.createConnection(dbConfig);

  //connectionオブジェクトのqueryメソッドは、DBに対してSQLクエリを実行できる
  //CREATE DATABASE IF NOT EXISTSは「DBがなかったら作る」
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
  console.log(`データベースを作成しましたーーーーーーーーーーー ${dbConfig.database}`);

  //.end()メソッドは、データベースとの接続を終了するためのメソッド
  await connection.end();
};

module.exports = createDatabaseIfNotExists;