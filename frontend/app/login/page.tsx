//【ログインページ】

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../_store/authState";

const LoginPage = () => {
  //********************************************************************************************
  //【状態変数まとめ】

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useRecoilValue(authState);

  const setAuthState = useSetRecoilState(authState);
  //********************************************************************************************
  //【関数まとめ】

  //フォーム内容の入力を検知して発火する関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //フォーム送信時に発火する関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // クッキーを許可
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("ログイン成功しました!");

        // RecoilのauthStateを更新してisLoggedInをtrueにする
        setAuthState({
          isLoggedIn: true,
          user: data.user, // サーバーから返ってきたユーザー情報（例）
        });

        router.push('/');
      } else {
        toast.error("ログイン失敗しました！");
        setError(data.error || "ログインに失敗しました！");
      }
    } catch (err) {
      toast.error("エラーが発生しました！");
      setError("サーバーエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  //********************************************************************************************
  //【HTML部分】

  return (
    <div className="flex-grow p-24 md:p-24">
      <div className="max-w-md mx-auto bg-gray-100 p-6 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          ログイン
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {error && <div className="text-red-500 text-center">{error}</div>}

          <div>
            <label htmlFor="email" className="block text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-gray-600">
          アカウントをお持ちでないですか？{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            新規登録
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
