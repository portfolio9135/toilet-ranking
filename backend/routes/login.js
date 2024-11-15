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
        secure: process.env.NODE_ENV === 'production',
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
// HTTPS接続のときだけクッキーを送信する設定や。本番環境（production）では true になって、開発環境では false になる。

// maxAge: 24 * 60 * 60 * 1000
// クッキーの有効期限を設定してる。ここでは1日（24時間）後にクッキーが無効になるようにしてる。