/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'], // ポート番号なし
  },
  experimental: {
    images: {
      unoptimized: true, // 開発環境で最適化を無効化
    },
  },
};

export default nextConfig;
