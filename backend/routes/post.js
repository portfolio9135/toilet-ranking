// routes/post.js
const express = require('express');
const upload = require('../services/upload/postUpImgService'); // 画像アップロード用のミドルウェアをインポート


module.exports = (db) => {
  const router = express.Router();

  // 投稿API
  router.post('/', upload.single('img'), async (req, res) => {

    // リクエストボディからデータを取得
    const { title, address, comment, rating, postingUserId, postingUserName } = req.body;

    // 画像のパスを取得
    const imgUrl = req.file ? req.file.path : "";


    try {
      // データベースに投稿情報と、投稿をしたユーザーのIDを挿入
      const [result] = await db.query(
        'INSERT INTO toilets (title, address, comment, rating, imgUrl, postingUserId, postingUserName) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, address, comment, rating, imgUrl, postingUserId, postingUserName]
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

  // 投稿削除API
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      // 指定されたIDの投稿が存在するか確認
      const [checkResult] = await db.query('SELECT * FROM toilets WHERE id = ?', [id]);
      if (checkResult.length === 0) {
        // 投稿が見つからない場合
        return res.status(404).json({ error: '削除対象の投稿が見つかりません' });
      }

      // 投稿を削除
      const [deleteResult] = await db.query('DELETE FROM toilets WHERE id = ?', [id]);

      // 削除成功レスポンスを返す
      res.status(200).json({ message: '削除成功', data: deleteResult });
    } catch (error) {
      console.error("削除中にエラー発生:", error);
      res.status(500).json({ error: '削除に失敗しました' });
    }
  });


  return router;
};