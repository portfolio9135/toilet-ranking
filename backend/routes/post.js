// /backend/routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // DB接続

// 投稿作成のAPIエンドポイント
router.post('/post', (req, res) => {
  const { title, content } = req.body; // フロントから受け取ったデータ
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';

  db.query(query, [title, content], (error, results) => {
    if (error) {
      console.error('投稿の作成に失敗しましたーーーーーーーー', error);
      return res.status(500).json({ error: '投稿の作成に失敗しました' });
    }
    res.status(201).json({ id: results.insertId, title, content });
  });
});

module.exports = router;
