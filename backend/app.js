//**********************************************************
//【必要なものをインポートして変数に格納】
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mysql = require('mysql2/promise');

const postRouter = express.Router();
const listRouter = express.Router();

//**********************************************************

// 【CORSとJSON形式のデータ送信を許可】
app.use(cors());
app.use(express.json());

//**********************************************************

//【MySQLデータベースへの接続オブジェクトを作成】
const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'pass',
  database: 'toilet_ranking',
  charset: 'utf8mb4'
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
  console.log(`データベースを作成しましたーーーーーーーーーーーーーーーーーーーーー${dbConfig.database}`);
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
      title VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      comment VARCHAR(255) NOT NULL,
      rating FLOAT NOT NULL
    )
  `;

  await db.query(createTableQuery); // テーブル作成を実行
  console.log(`テーブルを作成しましたーーーーーーーーーーーーーーーーーーーーー${db}`);
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
      console.log(`よし！！${i+1}回目でMySQL接続成功しましたーーーーーーーーーーーーーーーーーーーーーー`);
      return db;
    } catch (err) {
      console.error(`${i+1}回目のMySQL接続は、、、、失敗です!!  再試行中です... (${i+1}/${retries})`);
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
    console.error("初期化中にエラー発生!:", err);
  }
};

//**********************************************************

// 【投稿ページのAPI】
postRouter.post('/', async (req, res) => {
  const { title, address, comment, rating} = req.body;

  try {
    const [result] = await db.query('INSERT INTO toilets (title, address, comment, rating) VALUES (?, ?, ?, ?)', [title, address, comment, rating]);
    res.status(201).json({ id: result.insertId }); // 成功時に201ステータスを返す
  } catch (error) {
    console.error("データの挿入に失敗しました:", error);
    res.status(500).json({ error: 'データの挿入に失敗しました' });
  }
});

// ルーターをアプリに追加
app.use('/post', postRouter);

//**********************************************************

// 【投稿一覧ページのAPI】
listRouter.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM toilets'); // toiletsテーブルの全データを取得
    res.json(rows); // 取得したデータを返す
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    res.status(500).json({ error: 'データの取得に失敗しました' });
  }
});

// ルーターをアプリに追加
app.use('/list', listRouter);

//**********************************************************







//**********************************************************

//【アプリケーションの起動】
initalize().then(() => {
  app.listen(port, () => {
    console.log(`サーバーの準備ができましたーーーー http://localhost:${port}`);
  });
}).catch(err => {
  console.error("初期化エラーですーーーーーーーーー", err);
});

//**********************************************************