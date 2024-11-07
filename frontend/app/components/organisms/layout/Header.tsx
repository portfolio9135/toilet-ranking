"use client";

import React, { FC, useState, memo, useEffect } from "react";
import Link from "next/link";

import MenuIconButton from "../../atoms/button/MenuIconButton";
import MenuDrawer from "../../molecules/MenuDrawer";

const Header: FC = memo(() => {
  //【状態変数を定義】
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //【ハンバーガーメニューのための関数】
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <header className={`bg-white fixed w-full z-10 ${isScrolled ? "border-b border-gray-300 shadow-md" : ""}`}>
      <nav className="flex max-w-[1200px] mx-auto items-center justify-between p-3 md:p-5">
        <Link href="/" passHref className="mr-8 hover:cursor-pointer hover:opacity-80">
          <h1 className="text-md md:text-lg font-bold">おトイレランキング</h1>
        </Link>

        <div className="hidden md:flex items-center text-sm">
          <Link href="/post" passHref className="pr-4 hover:underline">
            投稿する
          </Link>
          <Link href="/list" passHref className="pr-4 hover:underline">
            投稿一覧
          </Link>
          <Link href="/about" passHref className="pr-4 hover:underline">
            About
          </Link>
        </div>

        <div>
          <button>ログイン</button>
        </div>

        <MenuIconButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      <MenuDrawer isOpen={isOpen} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
