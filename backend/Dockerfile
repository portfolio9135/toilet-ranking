# 【バックエンドのDockerfile】

# ベースのイメージを指定
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

COPY package*.json ./

# 全ての依存関係をインストール
RUN npm install

# 現ディレクトリから作業ディレクトリに
# ファイルをコピー
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]