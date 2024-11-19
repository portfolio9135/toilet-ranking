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
        className={`font-bold bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200`}
      >
        {label}
      </button>
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`font-bold bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200`}
    >
      {label}
    </button>
  );
};

export default LoginButton;