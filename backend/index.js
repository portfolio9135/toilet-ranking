const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors'); // ここで cors をインポートする
const port = 3001;

// MySQLデータベースへの接続オブジェクトを作成して、変数dbに格納
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toilet',
  database: 'toilet_ranking'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// リクエストボディがJSON形式で送られてきたときに
//そのデータをパースしてreq.bodyに格納するミドルウェアを設定
app.use(express.json());

// これでCORSを許可する設定になる
app.use(cors());

app.post("/example", (req, res) => {
  console.log(req.body);
  res.send("Data received!!!")
});

//トイレ情報を追加するエンドポイント（POSTリクエスト）
app.post("/toilets", (req, res) => {
    //req.bodyのオブジェクトを分割代入
    const { name, address, rating, description } = req.body;
    const sql = `insert into toilets (name, address, rating, description) values (?, ?, ?, ?)`;

    db.query(sql, [name, address, rating, description], (err, result) => {
      if (err) {
        console.error("エラー発生", err);
        res.status(500).send("トイレ情報の追加中にエラーが発生しました。");
        return;
      }
      res.send("トイレ情報を追加しました!!");
    });
});

// トイレ情報を取得するエンドポイント（GETリクエスト）
app.get("/toilets", (req, res) => {
  const sql = `select * from toilets`;
  db.query(sql, (err, results) => {
    if(err) {
      console.error("エラー発生", err);
      return;
    }
    res.json(results);
  });
});

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});