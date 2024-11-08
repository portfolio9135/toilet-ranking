import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/organisms/layout/Header";
import Footer from "./components/organisms/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "おトイレランキング",
  description: "おトイレを評価して共有するアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} custom-bg`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
