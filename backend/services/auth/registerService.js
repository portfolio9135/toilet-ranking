const bcryptjs = require('bcryptjs');

const registerUser = async (username, email, password, db) => {
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

  } catch (err) {
    console.error('ユーザー登録中にエラーが発生', err);
    throw err;
  }
}

module.exports = { registerUser };