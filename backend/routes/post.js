// routes/post.js
const express = require('express');
const upload = require('../upload/postUpImg'); // 画像アップロード用のミドルウェアをインポート


module.exports = (db) => {
  const router = express.Router();

  // 投稿API
  router.post('/', upload.single('img'), async (req, res) => {
    const { title, address, comment, rating } = req.body;
    const imgUrl = req.file ? req.file.path : ""; // 画像がある場合はパスを取得なければ空文字

    try {
      const [result] = await db.query(
        'INSERT INTO toilets (title, address, comment, rating, imgUrl) VALUES (?, ?, ?, ?, ?)',
        [title, address, comment, rating, imgUrl]
      );
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