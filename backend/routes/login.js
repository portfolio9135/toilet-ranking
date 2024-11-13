const express = require('express');
const { loginUser } = require('../services/auth/loginService');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await loginUser(email, password, db);
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}


//resはExpressのレスポンスオブジェクトで、これを通してクライアント(リクエストを送ってきた側)に
//データを返す。statusメソッドで、HTTPステータスコードを指定する(200は成功)

//res.status(200).json({ token });
//この書き方 { token } は短縮表記という、実際には { token: token } と同じ意味
//クライアントには { "token": "発行されたトークンの値" } というJSONデータが返る