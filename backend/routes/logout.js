const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    // httpOnlyクッキーを削除
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 本番環境ではSecureオプションを有効に
      sameSite: "strict",
    });

    return res.status(200).json({ message: "ログアウト成功" });
  } catch (err) {
    console.error("ログアウト失敗:", err);
    return res.status(500).json({ messase: "サーバーエラー" });
  }
});

module.exports = router;