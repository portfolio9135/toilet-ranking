//【最上位のコンポーネント】

"use client";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import Header from "./_components/organisms/Header";
import Footer from "./_components/organisms/Footer";
import { RecoilRoot } from "recoil";
import AuthInitializer from "./_components/templates/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} custom-bg min-h-screen flex flex-col`}
      >
        <RecoilRoot>
          <AuthInitializer>
            <Header />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
            />
            {children}
            <Footer />
          </AuthInitializer>
        </RecoilRoot>
      </body>
    </html>
  );
}

//ログイン状態の初期化:
// AuthInitializerがアプリ起動時にトークンを検証して、RecoilのauthStateを更新。

// Recoilのグローバル管理:
// HeaderではuseRecoilValue(authState)を使うことで、常に最新のisLoggedIn状態を参照可能。

// APIの柔軟性:
// サーバーサイドでHttpOnlyクッキーを使ったトークン管理をしてるから、セキュリティも問題なし。
