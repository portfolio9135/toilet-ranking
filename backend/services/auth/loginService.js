const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password, db) => {
  try {
    //ユーザーが送信したemailでデータベースからユーザー情報を探す
    const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);

    //ユーザーが存在しない場合
    if (rows.length === 0) {
      throw new Error('ユーザーが見つかりません');
    }

    const match = await bcryptjs.compare(password, rows[0].password);

    //パスが一致してない場合
    if (!match) {
      throw new Error('パスワードが間違っています');
    }

    const token = jwt.sign(
      { userId: rows[0].id, email: rows[0].email }, //トークンに含める情報(ここではユーザーIDとメールアドレス)
      process.env.JWT_SECRET, //シークレットキー（これは環境変数から取得）
      { expiresIn: '1h' } //トークンの有効期限（1時間）
    );

    await db.end();
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { loginUser };



//JavaScript では「なんでも throw できるけど、Error で投げるのが基本」
// デバッグやエラー処理のためには Error クラスのインスタンスを投げる方が便利、標準的なやり方。

//bcryptjs.compareを使って、ユーザーが入力したpasswordと、
//データベースに保存されてるpasswordのハッシュを比較してる。
//もし一致したらmatchにtrueが入るし、違ってたらfalseが入る。



//.sign は3つ引数とる jwt オブジェクトのメソッドで、トークンを生成するために使うメソッド
//ユーザー情報などのデータをトークンに変換し、指定したシークレットキーで暗号化する
//第1引数：トークンに含めたいデータ、
//第2引数：シークレットキーこのキーを使って暗号化したり改竄されてないかチェックしたりする
//第3引数：トークンのオプション設定
//process は Node.js のグローバルオブジェクトで、アプリケーションの実行環境に関する情報や
//プログラムの実行を制御するためのプロパティやメソッドを持ってる。
//process はサーバーの設定、環境変数、コマンドライン引数などにアクセスするのに使われる。
//process.env は process オブジェクトのプロパティで、実行環境の 環境変数を保持するオブジェクト。
//process.env の中には、アプリケーションの動作に必要な設定やキー、パスワードなどの情報が含まれてる。