// routes/postDetail.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const [rows] = await db.query('SELECT * FROM toilets WHERE id = ?', [id]);
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ error: '投稿が見つかりません' });
      }
    } catch (error) {
      console.error("投稿詳細取得中にエラー発生:", error);
      res.status(500).json({ error: 'サーバーエラー' });
    }
  });

  return router;
};
