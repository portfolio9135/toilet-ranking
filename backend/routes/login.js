const express = require('express');
const { loginUser } = require('../services/auth/loginService');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await loginUser(email, password, db);

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