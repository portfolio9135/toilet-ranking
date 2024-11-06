const multer = require('multer');
const storage = require('./postUpImgConfig');

// upload インスタンスを作成し、設定した storage を使用
const upload = multer({ storage: storage });

module.exports = upload;
