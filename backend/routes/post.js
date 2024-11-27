// routes/post.js
const express = require('express');
const upload = require('../services/upload/postUpImgService'); // 画像アップロード用のミドルウェアをインポート


module.exports = (db) => {
  const router = express.Router();

  // 投稿API
  router.post('/', upload.single('img'), async (req, res) => {

    // リクエストボディからデータを取得
    const { title, address, comment, rating, postingUserId } = req.body;

    // 画像のパスを取得
    const imgUrl = req.file ? req.file.path : "";


    try {
      // データベースに投稿情報と、投稿をしたユーザーのIDを挿入
      const [result] = await db.query(
        'INSERT INTO toilets (title, address, comment, rating, imgUrl, postingUserId) VALUES (?, ?, ?, ?, ?, ?)',
        [title, address, comment, rating, imgUrl, postingUserId]
      );

      // レスポンスを返す
      res.status(201).json({ message: '投稿成功', data: result });
      console.log("データの挿入に成功しましたーーーーーー");
    } catch (error) {
      console.log("データの挿入に失敗しました！！！");
      console.error(error);
      res.status(500).json({ error: 'データの挿入に失敗しました' });
    }
  });

  return router;
};