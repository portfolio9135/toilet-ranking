import React, { FC } from "react";

interface LoginButtonProps {
  onClick?: () => void; //ログアウト用
  href?: string; //ログイン用
  label: string; //ボタンのラベル（ログイン or ログアウト）
}

const LoginButton: FC<LoginButtonProps> = ({ onClick, href, label }) => {
  return href ? (
    <a href={href}>
      <button
        onClick={onClick}
        className={`font-bold bg-gradient-to-r from-[#03c1ab] to-[#02a38a] text-white py-2 px-4 rounded-full hover:opacity-80 transition duration-500`}
      >
        {label}
      </button>
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`font-bold bg-gradient-to-r from-[#03c1ab] to-[#02a38a] text-white py-2 px-4 rounded-full hover:opacity-80 transition duration-500`}
    >
      {label}
    </button>
  );
};

export default LoginButton;
