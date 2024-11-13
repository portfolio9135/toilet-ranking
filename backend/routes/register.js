const express = require('express');
const { registerUser } = require('../services/auth/registerService');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
      await registerUser(username, email, password, db);

      const body = {
        username: username,
        email: email,
        password: password,
      }

      res.status(201).json(body);
    } catch (err) {
      console.error('ユーザー登録エラー:', err);
      res.status(500).json({ message: 'ユーザー登録に失敗しました！' });
    }
  });

  return router;
};