// routes/post.js
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 投稿API
  router.post('/', async (req, res) => {
    const { title, address, comment, rating } = req.body;

    try {
      const [result] = await db.query(
        'INSERT INTO toilets (title, address, comment, rating) VALUES (?, ?, ?, ?)',
        [title, address, comment, rating]
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error("データの挿入に失敗しました:", error);
      res.status(500).json({ error: 'データの挿入に失敗しました' });
    }
  });

  return router;
};