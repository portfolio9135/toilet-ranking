"use client";

import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("ログイン成功！");
        // ログイン成功後の処理（例：ダッシュボードへリダイレクトなど）
      } else {
        setError(data.error || "ログインに失敗しました");
      }
    } catch (error) {
      setError("サーバーエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  //【HTML部分】
  return (
    <div className="flex-grow p-24 md:p-24">
      <div className="max-w-md mx-auto bg-gray-100 p-6 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800">ログイン</h2>

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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "ログイン中..." : "ログインする"}
          </button>
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
