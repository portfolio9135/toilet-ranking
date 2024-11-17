//【新規登録ページ】

"use client";

import React, { useState } from "react";

const page = () => {
  //********************************************************************************************
  //【状態変数まとめ】

  //フォームの内容（ユーザー名、メール、パスワード）を管理する状態変数
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //エラーメッセージを保存するための状態変数
  const [error, setError] = useState("");

  //登録中かどうか判定する状態変数
  const [loading, setLoading] = useState(false);

  //********************************************************************************************
  //【関数まとめ】

  //入力フォームの内容（ユーザー名、メール、パスワード）の変更を処理する関数
  //e.targetはinputタグのhtml要素。name：フォームのname属性の値が入る。value：フォームの現在の入力値が入る。
  //...formDatajは「スプレッド構文」。今までのformDataの中身をそのままコピーして、新しいオブジェクトを作ってる

  //[name]: value,の[]は 「キーを動的に指定する」 特別な記法で、配列とは関係ない。
  //これは、JavaScriptのオブジェクトで、キー（プロパティ名）を動的に指定できる仕組みのこと
  //Computed Property Nameって名前らしい。。
  //e.target（input html要素）で取得した値でformDataオブジェクトを更新してる

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //フォームが送信されたときに実行される関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    //responseは、サーバーから返ってきたレスポンスを表すオブジェクト
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //.json()はResponseオブジェクトから返ってきたボディ部分（レスポンスのデータ）を、
      //JSON形式で扱えるようにパース（解析）するメソッド
      const data = await response.json();

      //response.okは、Responseオブジェクトの真偽値（trueかfalse）を返すプロパティ
      //HTTPレスポンスが成功か失敗かを簡単に判定するために使う。
      if (response.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });

        alert("登録成功しました！");

        // 登録成功後の処理（例：ログインページへリダイレクトなどを追記する）
      } else {
        setError(data.error || "登録に失敗しました");
      }
    } catch (error) {
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
        <h2 className="text-2xl font-semibold text-center text-gray-800">新規登録</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {error && <div className="text-red-500 text-center">{error}</div>}

          <div>
            <label htmlFor="username" className="block text-gray-700">
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          既にアカウントをお持ちですか？{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
