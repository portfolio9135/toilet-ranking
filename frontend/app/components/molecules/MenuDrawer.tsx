import Link from "next/link";
import React, { FC, memo } from "react";
import LoginButton from "../atoms/button/LoginButton";

type Props = {
  isOpen: boolean;
};

const MenuDrawer: FC<Props> = memo((props) => {
  const { isOpen } = props;

  return (
    <div
      className={`fixed left-0 w-full h-full bg-gray-100 transform transition-transform duration-300 ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      } md:hidden w-4/5`}
      style={{ top: "64px" }}
    >
      <div className="p-8 text-center font-bold text-md">
        <Link
          href="/post"
          passHref
          className="block py-6 hover:underline hover:underline-offset-8 hover:decoration-2"
        >
          投稿する@
        </Link>
        <Link
          href="/list"
          passHref
          className="block py-6 hover:underline hover:underline-offset-8 hover:decoration-2"
        >
          投稿一覧@
        </Link>
        <Link
          href="/about"
          passHref
          className="block py-6 hover:underline hover:underline-offset-8 hover:decoration-2"
        >
          About@
        </Link>

        <div className="py-6">
          <LoginButton />
        </div>
      </div>
    </div>
  );
});

MenuDrawer.displayName = "MenuDrawer";

export default MenuDrawer;
