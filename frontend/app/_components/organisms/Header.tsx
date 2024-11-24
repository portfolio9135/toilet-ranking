//【ヘッダー】

"use client";

import React, { FC, useState, memo, useEffect } from "react";
import Link from "next/link";

import HamburgerMenuIconBtn from "../atoms/button/HamburgerMenuIconBtn";
import MenuDrawer from "../molecules/MenuDrawer";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../_store/authState";
import { toast } from "react-toastify";

const Header: FC = memo(() => {
  //********************************************************************************************
  //【状態変数まとめ】
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn } = useRecoilValue(authState);
  const resetAuthState = useSetRecoilState(authState);

  //********************************************************************************************
  //【関数まとめ】

  //ハンバーガーメニュー
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //初期レンダリング時の関数: スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // スクロール量を見てヘッダーの状態を切り替える
    };
  
    window.addEventListener("scroll", handleScroll); // スクロールイベントを監視
  
    return () => {
      window.removeEventListener("scroll", handleScroll); // クリーンアップで監視解除
    };
  }, []);  
  
  //ログアウト関数
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: "POST",
        credentials: 'include',
      });

      if(response.ok) {
        resetAuthState({
          isLoggedIn: false,
          user: null,
        });
        toast.success("ログアウトしました");
      } else {
        toast.error("ログイン失敗しました");
      }
    } catch(err) {
      console.error('ログアウト中にエラー発生:', err);
      toast.error("ログイン中にエラー発生!");
    }
  }

  //********************************************************************************************
  //【HTML部分】
  return (
    <header
      className={`bg-white fixed w-full z-10 h-20 ${
        isScrolled ? "border-b border-gray-300 shadow-md" : ""
      }`}
    >
      <nav className="flex max-w-[1200px] mx-auto items-center justify-between p-3 md:p-5">
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

        <div className="hidden md:block">
          {isLoggedIn ? (
            <PrimaryBtn label="ログアウト" onClick={handleLogout} />
          ) : (
            <PrimaryBtn href="/login" label="ログイン" />
          )}
        </div>

        <HamburgerMenuIconBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      <MenuDrawer isOpen={isOpen} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;

//Header.displayName = "Header"; は、React コンポーネントに 明示的な名前 を設定するためのプロパティです。これにより、デバッグツールやエラーメッセージでそのコンポーネント名が表示されるようになります。
//React.memo や React.forwardRef でラップしたコンポーネントは、名前が自動的に Memo や ForwardRef などに変わります。この場合、デバッグ時にコンポーネントの名前がわかりづらくなることがあります。
//displayName を明示的に設定すると、名前を「Header」として表示させることができます。

//isLoggedInの切り替えロジックはAuthInitializerが担当するから、ここでは読み取るだけ。
