const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');

//**********************************************************

// 【インポートまとめ】
const mysql = require('mysql2');

//**********************************************************

// 【MySQLデータベースへの接続オブジェクトを作成して、変数dbに格納】
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'toilet_ranking'
});

//**********************************************************

//【接続】
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL データベースに接続中...');
});

//**********************************************************

//【JSONを変換】
// リクエストボディがJSON形式で送られてきたときに
//そのデータをパースしてreq.bodyに格納するミドルウェアを設定
app.use(express.json());

//**********************************************************

// 【これでCORSを許可する設定になる】
app.use(cors());

//**********************************************************

// 【POSTリクエストの確認】
app.post("/example", (req, res) => {
  console.log(req.body);
  res.send("Data received!!!")
});

//**********************************************************

// 【トイレ情報を追加するエンドポイント（POSTリクエスト）】
// app.post("/toilets", (req, res) => {
//     //req.bodyのオブジェクトを分割代入
//     const { name, address, rating, description } = req.body;
//     const sql = `insert into toilets (name, address, rating, description) values (?, ?, ?, ?)`;

//     db.query(sql, [name, address, rating, description], (err, result) => {
//       if (err) {
//         console.error("エラー発生", err);
//         res.status(500).send("トイレ情報の追加中にエラーが発生しました。");
//         return;
//       }
//       res.send("トイレ情報を追加しました!!");
//     });
// });

//**********************************************************

// 【トイレ情報を取得するエンドポイント（GETリクエスト）】
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

//**********************************************************

// 【ルートエンドポイント】
app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

//**********************************************************

app.listen(port, () => {
  console.log(`サーバーの準備ができましたー---  http://localhost:${port}`);
});
