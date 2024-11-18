const express = require('express');
const { loginUser } = require('../services/auth/loginService');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await loginUser(email, password, db);

      res.cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1日
      })

      const body = {
        message: "ユーザーを見つけました！ログイン成功です。",
        token: token,
      }

      res.status(200).json(body);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}


//resはExpressのレスポンスオブジェクトで、これを通してクライアント(リクエストを送ってきた側)に
//データを返す。statusメソッドで、HTTPステータスコードを指定する(200は成功)

//resはExpressのレスポンスオブジェクトで、サーバーからクライアントに対してデータを返すために使われるオブジェクト。
// res.cookie() は レスポンスオブジェクト（res）のメソッドで、クライアントにクッキーを設定するために使われる。
// res.cookie() の第一引数には クッキーの名前、第二引数には 保存する値、第三引数には オプション設定を指定できる。

// httpOnly: true
// JavaScriptでクッキーにアクセスできないようにする設定で、XSS攻撃からクッキーを守るために使われる。

// secure: process.env.NODE_ENV === 'production'
// HTTPS接続のときだけクッキーを送信する設定。本番環境（production）では true になって、開発環境では false になる。

// maxAge: 24 * 60 * 60 * 1000
// クッキーの有効期限を設定してる。ここでは1日（24時間）後にクッキーが無効になるようにしてる。

//res.cookieで作ったクッキーをサーバーがレスポンスヘッダーで送る
//それをブラウザが保存
//対応するリクエストがあった場合、自動的にクッキーをリクエストヘッダーに追加する

//リクエストヘッダーとレスポンスヘッダーっていうのは
//ブラウザ（クライアント）とサーバーがHTTP通信するときに一緒に送る追加情報のこと

//【リクエストヘッダーの例】
//こんなやつ
//↓
// GET /index.html HTTP/1.1
// Host: www.example.com
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
// Accept: text/html,application/xhtml+xml
// Cookie: token=ey...123


//【サーバーがブラウザに返すレスポンスのヘッダー例】
//こんなやつ
//↓
// HTTP/1.1 200 OK
// Content-Type: text/html; charset=UTF-8
// Content-Length: 1234
// Set-Cookie: sessionId=abc123; HttpOnly
// Cache-Control: no-cache
