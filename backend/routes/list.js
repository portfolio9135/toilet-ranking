//【投稿一覧機能】

const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 一覧取得API
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM toilets');
      res.json(rows);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      res.status(500).json({ error: 'データの取得に失敗しました' });
    }
  });

  return router;
};