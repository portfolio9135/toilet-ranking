"use client";

import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from "../../store/authState";

const AuthInitializer = () => {
  const setIsLoggedIn = useSetRecoilState(authState);

  useEffect(() => {
    setTimeout(() => {
      const tokenExists = document.cookie.includes("token");
      console.log(tokenExists ? "トークンあり" : "トークンなし");
      setIsLoggedIn(tokenExists);
    }, 5000); // 少し遅らせる
  }, []);

  return null; // UIには何も表示する必要はない
}

export default AuthInitializer