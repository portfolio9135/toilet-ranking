//【アップロードのミドルウェア（multerの設定）をここで管理】

const multer = require('multer');

// storageって変数にアップロード先の設定を作る
const storage = multer.diskStorage({

  // destination の部分では、アップロードしたファイルをどこに保存するかを指定
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // ファイル名を生成する
  filename: (req, file, cb) => {
    // Date.now() で現在のタイムスタンプ、Math.random() でランダムな数字
    // を使ってユニークなファイル名を生成して被らないようにする
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // file.finename → file.fieldname へ修正
  }
});

module.exports = storage;
