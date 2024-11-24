//************************************************************************************************
//【必要なものをインポート】

const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // 環境変数があれば、それを使い、無ければデフォルトで5000
const cors = require('cors');
const cookieParser = require('cookie-parser'); // リクエストに含まれるクッキーを解析できるように

const initializeDatabase = require('./db/initializeDatabase');

require('dotenv').config();

//************************************************************************************************
//【useメソッドまとめ】

app.use(express.json()); //JSON形式のリクエストボディをJavaScriptのオブジェクトに変換

//'/uploads'にアクセスがあった場合、指定したディレクトリ(uploads)内の全てのファイルを静的に公開する
app.use('/uploads', express.static('uploads'));

// 別のオリジン(http://localhost:3000)からのリクエストを許可
app.use(cors({
  origin: 'http://localhost:3000', //フロントエンドのURL
  credentials: true, //クッキーを許可
}));

// クッキーを解析するミドルウェアを使う
app.use(cookieParser());

//************************************************************************************************
//【初期化関数】

const initialize = async () => {
  try {
    // データベース初期化と接続を取得
    const db = await initializeDatabase();

    // 【ルーターの読み込み】
    const postRouter = require('./routes/post')(db); // 投稿
    const listRouter = require('./routes/list')(db); // 投稿一覧ルーター
    const registerRouter = require('./routes/register')(db); // ユーザー新規登録ルーター
    const loginRouter = require('./routes/login')(db); // ユーザーログインルーター
    const logoutRouter = require('./routes/logout'); // ユーザーログアウトルーター
    const verifyTokenRouter = require('./routes/verify-token'); // トークン検証ルーターのインポート

    // 【ルーターをアプリに追加】
    app.use('/post', postRouter); //投稿機能
    app.use('/list', listRouter); //投稿一覧機能
    app.use('/register', registerRouter); //ユーザーの新規登録機能
    app.use('/login', loginRouter); //ユーザーのログイン機能
    app.use('/logout', logoutRouter); //ユーザーのログアウト機能
    app.use('/verify-token', verifyTokenRouter); // トークン検証機能を追加

  } catch (err) {
    console.error("初期化中にエラー発生!:", err);
  }
};

//************************************************************************************************
//【アプリケーションの起動】

initialize().then(() => {
  app.listen(port, () => {
    console.log(`サーバーの準備ができましたーーーー http://localhost:${port}`);
  });
}).catch(err => {
  console.error("初期化エラーですーーーーーーーーー", err);
});





//************************************************************************************************
//【app.use()メソッドについて】

//**use()** は「ミドルウェアを使う」ためのメソッド
//ミドルウェアとは、リクエストがサーバーに来てから、レスポンスが返る前に、何か処理をするための関数

//app.use() は、リクエストに対して実行したいミドルウェアを設定するために使う、
//引数が一つの場合、全てのリクエストに対してそのミドルウェアを適用する
//app.use(express.json());は全てのリクエストに対してJSON形式のリクエストボディを自動でパースする

//2つの引数を取る場合
//第一引数には、URLのパスを指定、第二引数には、そのパスにアクセスがあったときに実行するミドルウェア関数を指定する。
// express.static('uploads')メソッドは指定したディレクトリ内のファイルを静的に公開するメソッド
//app.use('/uploads', express.static('uploads'));
//上記は/uploadsにアクセスがあった場合、サーバー上の特定のファイル(uploadsディレクトリ内の全ファイル)を
//クライアントがブラウザでURLを使ってアクセスできるようにする

//************************************************************************************************
//【CORS（クロスオリジンリソースシェアリング）とは？】

//CORSは、「別のオリジン（ドメイン、プロトコル、ポートが違う場所）からのリクエストを受け入れるかどうかを設定する仕組み」
//バックエンドサーバー（localhost:5000）が、フロントエンドサーバー（localhost:3000）からのリクエストを許可するための設定をしている
//これでfetch関数とか使って一覧画面表示したり、クッキーのリクエストも許可される

//************************************************************************************************

//【require('dotenv').config();について】

// dotenvが .envファイルの中身を環境変数として読み込んでくれるから、
//コードには「process.env.API_KEY」って書くだけで済む

//************************************************************************************************