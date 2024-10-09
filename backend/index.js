//**********************************************************
//【必要なものをインポートして変数に格納】
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mysql = require('mysql2/promise');

//**********************************************************

//【MySQLデータベースへの接続オブジェクトを作成】
const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'toilet_ranking'
};

//**********************************************************

// 【データベース作成の関数】
const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  // データベースが存在しない場合は作成する
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
  await connection.end();
};

//**********************************************************

// 【テーブル作成の関数】
const createTablesIfNotExists = async () => {
  const db = await mysql.createConnection(dbConfig);

  // toiletsテーブルを作成するSQLクエリ
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS toilets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      rating FLOAT NOT NULL
    )
  `;

  await db.query(createTableQuery); // テーブル作成を実行
  await db.end();
};

//**********************************************************

// 【データベースに接続し、データベースを作成】
const connectToDatabase = async (retries = 10, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await createDatabaseIfNotExists();
      await createTablesIfNotExists();
      const db = await mysql.createConnection(dbConfig);
      const { host, port } = dbConfig;
      console.log(`MySQL接続成功! ホスト: ${host}, ポート: ${port}`);
      return db;
    } catch (err) {
      console.error(`MySQL接続失敗、再試行中... (${i+1}/${retries})`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay)); // 5秒待ってから再試行
      } else {
        throw err;
      }
    }
  }
};

//**********************************************************

//【接続を非同期で行う】
let db;

const initalize = async () => {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error("初期化中にエラー発生:", err);
  }
};

app.use(express.json());
app.use(cors());

//**********************************************************

//【POSTリクエストの確認】
app.post("/test", (req, res) => { // タイポ修正
  console.log(req.body);
  res.send("データを受信しました!!");
});

//**********************************************************

//【ルートエンドポイント】
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

//**********************************************************

//【アプリケーションの起動】
initalize().then(() => {
  app.listen(port, () => {
    console.log(`サーバーの準備ができましたーーーー http://localhost:${port}`);
  });
}).catch(err => {
  console.error("初期化エラーですーーーーーーーーー", err);
});
