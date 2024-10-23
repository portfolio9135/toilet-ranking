# 【フロントエンドのDockerfile】

# Node.jsの公式イメージを使う
FROM node:18

# アプリを置くディレクトリを作る
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのアプリのファイルをコピー
COPY . .

# 開発用のポートを開ける
EXPOSE 3000

# アプリを起動する

CMD ["npm", "run", "dev"]
