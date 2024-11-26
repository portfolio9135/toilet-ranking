//【ヘッダー】

"use client";

import React, { FC, useState, memo, useEffect } from "react";
import Link from "next/link";

import HamburgerMenuIconBtn from "../atoms/button/HamburgerMenuIconBtn";
import HamburgerMenuDrawer from "../molecules/HamburgerMenuDrawer";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../_store/authState";
import { toast } from "react-toastify";

//********************************************************************************************
//【型定義】
interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; email: string; avatar_url: string } | null;
}

const Header: FC = memo(() => {
  //********************************************************************************************
  //【状態変数】

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isUserInfoDrawerOpen, setIsUserInfoDrawerOpen] = useState(false);
  const [showBlackShadow, setShowBlackShadwo] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const resetAuthState = useSetRecoilState(authState);
  const auth = useRecoilValue<AuthState>(authState);

  //********************************************************************************************
  //【関数】

  //【ハンバーガーメニュー】
  const toggleHamburgerMenuDrawer = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  //【初期レンダリング時の関数: スクロール検知】
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // スクロール量を見てヘッダーの状態を切り替える
    };

    window.addEventListener("scroll", handleScroll); // スクロールイベントを監視

    return () => {
      window.removeEventListener("scroll", handleScroll); // クリーンアップで監視解除
    };
  }, []);

  //【ログアウト関数】
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        resetAuthState({
          isLoggedIn: false,
          user: null,
        });
        toast.success("ログアウトしました");
        setIsUserInfoDrawerOpen(false);
        setShowBlackShadwo(false);
      } else {
        toast.error("ログイン失敗しました");
      }
    } catch (err) {
      console.error("ログアウト中にエラー発生:", err);
      toast.error("ログイン中にエラー発生!");
    }
  };

  //【ユーザーアイコンクリック時のドロワーメニュー発火】
  const toggleLUserInfoDrawer = () => {
    setIsUserInfoDrawerOpen(!isUserInfoDrawerOpen);
    setShowBlackShadwo(!showBlackShadow);
  };

  //********************************************************************************************
  //【HTML部分】
  return (
    <header
      className={`bg-white fixed w-full z-10 h-20 ${
        isScrolled ? "border-b border-gray-300 shadow-md" : ""
      }`}
    >
      <nav className="flex max-w-[1200px] mx-auto items-center justify-between p-3 md:p-5">
        {/* サイトタイトルとロゴ */}
        <Link
          href="/"
          passHref
          className="mr-8 hover:cursor-pointer hover:opacity-80"
        >
          <div className="flex items-center">
            <img
              className=" rounded-full w-9 mr-3"
              src="/favicon.png"
              alt="タイトルアイコン画像"
            />
            <h1 className="text-md md:text-lg font-bold">おトイレランキング</h1>
          </div>
        </Link>

        {/* ヘッダーのナビゲーションメニュー */}
        <div className="hidden md:flex items-center text-md font-bold">
          <Link
            href="/post"
            passHref
            className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            投稿する
          </Link>
          <Link
            href="/list"
            passHref
            className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            投稿一覧
          </Link>
          <Link
            href="/about"
            passHref
            className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            About
          </Link>
        </div>

        {/* ユーザーアイコン */}
        <div className="hidden md:block">
          {auth.isLoggedIn && auth.user ? (
            <div
              className="flex flex-col items-end"
              onClick={toggleLUserInfoDrawer}
            >
              <img
                src={`http://localhost:5000/${auth.user.avatar_url}`}
                className="w-16"
                alt="ユーザーアバター"
              />
            </div>
          ) : (
            <PrimaryBtn href="/login" label="ログイン" />
          )}
        </div>

        {/* 薄暗い背景 */}
        <div
          className={`${
            showBlackShadow ? "block" : "hidden"
          } fixed inset-0 bg-black bg-opacity-50 z-0 w-full`}
          onClick={toggleLUserInfoDrawer}
        ></div>

        {/* ドロワーメニュー */}
        <div
          className={`fixed top-0 right-0 w-1/4 h-full bg-gray-100 shadow-lg p-8 transform transition-transform duration-300 ${
            isUserInfoDrawerOpen ? "translate-x-0" : "translate-x-full"
          } `}
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900">メニュー</h2>
            <p className="mt-2">こんにちは！{auth.user?.username}さん</p>
            <ul className="text-gray-800">
              <li className="mt-8 hover:opacity-50 cursor-pointer">
                <a href="">プロフィール</a>
              </li>
              <li className="mt-8 hover:opacity-50 cursor-pointer">
                <a href="">設定</a>
              </li>
              <li className="mt-2">
                <div className="py-6 hover:opacity-50 cursor-pointer">
                  <PrimaryBtn label="ログアウト" onClick={handleLogout} />
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ハンバーガーメニューボタン */}
        <HamburgerMenuIconBtn
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          toggleHamburgerMenuDrawer={toggleHamburgerMenuDrawer}
        />
      </nav>

      <HamburgerMenuDrawer isHamburgerMenuOpen={isHamburgerMenuOpen} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;

//Header.displayName = "Header"; は、React コンポーネントに 明示的な名前 を設定するためのプロパティです。これにより、デバッグツールやエラーメッセージでそのコンポーネント名が表示されるようになります。
//React.memo や React.forwardRef でラップしたコンポーネントは、名前が自動的に Memo や ForwardRef などに変わります。この場合、デバッグ時にコンポーネントの名前がわかりづらくなることがあります。
//displayName を明示的に設定すると、名前を「Header」として表示させることができます。

//isLoggedInの切り替えロジックはAuthInitializerが担当するから、ここでは読み取るだけ。