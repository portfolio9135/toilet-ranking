"use client";

//【アプリ起動時に一度だけトークンの検証をして、RecoilのauthStateを初期化する】
//描画はしないコンポーネント

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../_store/authState";
import chalk from "chalk";

//childrenっていうプロパティを受け取る。その型はReactのNode（要素）
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  //********************************************************************************************
  //【変数】

  const [isInitialized, setIsInitialized] = useState(false); // 初期化状態
  const setAuthState = useSetRecoilState(authState);

  //********************************************************************************************
  //【関数】

  //【トークンを検証する関数】
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/verify-token", {
          method: "GET",
          credentials: "include", //クッキーを含める
        });

        const result = await response.json();

        if (result.isLoggedIn) {
          setAuthState({
            isLoggedIn: true, //ログイン状態をtrueにする
            user: result.user
          });
          console.log(chalk.green(`ログイン状態を更新しましたー`));
          console.log(chalk.green(`resultの中身はこれです↓↓↓↓↓`));
          console.log(result);
          
        } else {
          setAuthState({
            isLoggedIn: false,
            user: null,
          });
        }
      } catch (err) {
        console.error("トークン検証エラー:", err);
        setAuthState({
          isLoggedIn: false,
          user: null,
        });
      } finally {
        setIsInitialized(true); //初期化完了
      }
    };

    verifyToken();
  }, []);

  //********************************************************************************************
  //【条件付きレンダリング】

  if (!isInitialized) {
    // 初期化が完了するまで何もレンダリングしない
    return <div></div>;
  }

  return <>{children}</>;
};

export default AuthInitializer;

//useSetRecoilState(authState)の戻り値は、authStateっていうRecoilのAtomの値を更新するための「関数」
//第一引数にオブジェクトを渡すことで、そのオブジェクトをauthStateの「新しい状態」として設定できる
