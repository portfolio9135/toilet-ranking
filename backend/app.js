//**********************************************************
//【必要なものをインポートして変数に格納】
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const initializeDatabase = require('./db/initializeDatabase');

require('dotenv').config(); 
//**********************************************************
// CORS JSON形式のデータ送信
// uploadsフォルダへの静的ファイルのアクセス を許可
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
//**********************************************************
//【初期化関数】
const initialize = async () => {
  try {
    // データベース初期化と接続を取得
    const db = await initializeDatabase();

    // 【ルーターの読み込み】
    const postRouter = require('./routes/post')(db); // 投稿ルーター
    const listRouter = require('./routes/list')(db); // 投稿一覧ルーター
    const registerRouter = require('./routes/register')(db); // ユーザー新規登録ルーター
    const loginRouter = require('./routes/login')(db); // ユーザーログインルーター

    // 【ルーターをアプリに追加】
    app.use('/post', postRouter); //投稿機能
    app.use('/list', listRouter); //投稿一覧機能
    app.use('/register', registerRouter); //ユーザーの新規登録機能
    app.use('/login', loginRouter); //ユーザーのログイン機能

  } catch (err) {
    console.error("初期化中にエラー発生!:", err);
  }
};
//**********************************************************
//【アプリケーションの起動】
initialize().then(() => {
  app.listen(port, () => {
    console.log(`サーバーの準備ができましたーーーー http://localhost:${port}`);
  });
}).catch(err => {
  console.error("初期化エラーですーーーーーーーーー", err);
});
//**********************************************************