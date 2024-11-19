"use client";

import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

import "./globals.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import AuthInitializer from "./components/templates/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} custom-bg min-h-screen flex flex-col`}>
        <RecoilRoot>
          <AuthInitializer />

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
        </RecoilRoot>
      </body>
    </html>
  );
}
