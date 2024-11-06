"use client";

import React, { FC, useState, memo } from "react";
import Link from "next/link";

import MenuIconButton from "../../atoms/button/MenuIconButton";
import MenuDrawer from "../../molecules/MenuDrawer";

const Header: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full z-10">
      <nav className="bg-teal-500 text-gray-50 flex items-center justify-between p-3 md:p-5">
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

        <MenuIconButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      <MenuDrawer isOpen={isOpen} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
