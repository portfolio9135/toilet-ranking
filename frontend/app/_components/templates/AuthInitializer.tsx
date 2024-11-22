//【アプリ起動時に一度だけトークンの検証をして、RecoilのauthStateを初期化する】
//描画はしないコンポーネント

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../_store/authState";

const AuthInitializer = () => {
  //********************************************************************************************
  //【変数】

  const setAuthState = useSetRecoilState(authState);

  //********************************************************************************************
  //【関数】

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
            user: result.user || null, //必要ならユーザー情報もセット
          });
          console.log(
            `ログイン状態を更新しました！ setAuthStateの中身は--- ${setAuthState}です`
          );
          console.log(`resultの中身は--- ${result}です`);
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
      }
    };

    verifyToken();
  }, []);

  return null; //描画は不要
};

export default AuthInitializer;



//useSetRecoilState(authState)の戻り値は、authStateっちゅうRecoilのAtomの値を更新するための「関数
//第一引数にオブジェクトを渡すことで、そのオブジェクトをauthStateの「新しい状態」として設定する
