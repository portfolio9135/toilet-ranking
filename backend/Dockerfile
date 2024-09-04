# バックエンドのDockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# 全ての依存関係をインストール
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
