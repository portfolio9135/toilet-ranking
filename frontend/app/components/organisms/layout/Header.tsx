"use client";

import React, { FC, useState, memo, useEffect } from "react";
import Link from "next/link";

import MenuIconButton from "../../atoms/button/MenuIconButton";
import MenuDrawer from "../../molecules/MenuDrawer";
import LoginButton from "../../atoms/button/LoginButton";

const Header: FC = memo(() => {
  //【状態変数を定義】
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //【ハンバーガーメニューのための関数】
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //【初期関数】
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white fixed w-full z-10 h-20 ${
        isScrolled ? "border-b border-gray-300 shadow-md" : ""
      }`}
    >
      <nav className="flex max-w-[1200px] mx-auto items-center justify-between p-3 md:p-5">
        <Link href="/" passHref className="mr-8 hover:cursor-pointer hover:opacity-80">
          <div className="flex items-center">
            <img className=" rounded-full w-9 mr-3" src="/favicon.png" alt="タイトルアイコン画像" />
            <h1 className="text-md md:text-lg font-bold">おトイレランキング</h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center text-md font-bold">
          <Link href="/post" passHref className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2">
            投稿する
          </Link>
          <Link href="/list" passHref className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2">
            投稿一覧
          </Link>
          <Link href="/about" passHref className="pr-8 hover:underline hover:underline-offset-8 hover:decoration-2">
            About
          </Link>
        </div>

        <div className="hidden md:block">
          <LoginButton />
        </div>

        <MenuIconButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      <MenuDrawer isOpen={isOpen} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
