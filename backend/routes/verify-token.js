const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// データベース接続を受け取る（initialize.jsから渡される）
module.exports = (db) => {
  // トークンを検証してユーザー情報を返すエンドポイント
  router.get("/", async (req, res) => {
    const token = req.cookies.token; // HttpOnlyクッキーからトークンを取得

    if (!token) {
      return res
        .status(401)
        .json({ isLoggedIn: false, message: "トークンはありません" });
    }

    try {
      // トークンを検証
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      // データベースから追加情報を取得
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ isLoggedIn: false, message: "ユーザーが見つかりません" });
      }

      // 必要な情報だけ返す
      res.status(200).json({
        isLoggedIn: true,
        user: {
          id: rows[0].id,
          email: rows[0].email,
          username: rows[0].username,
          avatar_url: rows[0].avatar_url,
        },
      });
    } catch (err) {
      console.error("トークン検証エラー:", err);
      res
        .status(401)
        .json({ isLoggedIn: false, message: "トークンが無効です" });
    }
  });

  return router;
};
