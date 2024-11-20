const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// トークンを検証するエンドポイント
router.get('/', (req, res) => {
  const token = req.cookies.token; // HttpOnlyクッキーからトークンを取得

  if (!token) {
    return res.status(401).json({ isLoggedIn: false, message: 'トークンはありません' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // トークンを検証
    res.status(200).json({ isLoggedIn: true, user: decoded }); // 検証成功
  } catch (err) {
    res.status(401).json({ isLoggedIn: false, message: 'トークンが無効です' });
  }
});

module.exports = router; 