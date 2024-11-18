// 【トップページ】
"use client";

import React, { FC, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Search from "./components/molecules/Search";

interface Toilet {
  id: number;
  title: string;
  imgUrl: string;
  address: string;
  comment: string;
  rating: number;
}

const HomePage: FC = () => {
  //【状態変数まとめ】
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //【ページの読み込み時に実行される関数】
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchToilets = async () => {
      try {
        const response = await fetch("http://localhost:5000/list");
        if (response.ok) {
          const data = await response.json();
          setToilets(data);
          console.log("データ取得成功ですーーーーーー");
        } else {
          console.error("一覧取得失敗!!!:", response.statusText);
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    fetchToilets();
  }, []);

  // 【評価が5の投稿だけにフィルタリングする関数】
  const filteredToilets = toilets.filter((toilet) => toilet.rating === 5);

  //【ログアウト処理の関数】
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  //【ここからHTML部分】
  return (
    <div className="custom-bg min-h-screen pt-20">
      {/* タイトルテキスト */}
      <div className="w-fit mx-auto mt-8">
        <h1 className="text-4xl">現在地は？</h1>
      </div>

      {/* 【検索バー】 */}
      <div className="mt-8">
        <Search />
      </div>

      {/* 【今年最も評価の高いトイレ】 */}
      <div className="max-w-[1024px] mx-auto mt-24 px-5">
        <h2 className="font-bold text-2xl">2024年最も評価の高いおトイレ</h2>
        <img className="mt-4" src="/mv-04.png" alt="キービジュアル" />
      </div>

      {/* 【最高評価のトイレ】 */}
      <div className="mt-24 custom-bg-color py-8 px-6">
        <div className="w-fit mx-auto">
          <h2 className="font-bold text-2xl">最高評価のおトイレ</h2>
          <p className="text-md text-gray-600 mt-1">※評価が5のトイレ一覧です。</p>
          <ul className="custom-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 break-words mt-5">
            {filteredToilets.map((toilet) => (
              <li
                key={toilet.id}
                className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-300 border-y-2 border-x-2 flex flex-col h-[450px]"
              >
                <div className="text-lg font-bold mb-2">{toilet.title}</div>

                <img
                  className="mb-2 border border-gray-300 rounded-lg w-full h-40 object-cover"
                  src={toilet.imgUrl ? `http://localhost:5000/${toilet.imgUrl}` : `/no-image.png`}
                  alt="投稿画像"
                />

                <div className="text-lg font-bold mb-2">{toilet.address}</div>

                {/* コメントの表示部分 */}
                <div
                  className="text-lg mb-2 overflow-hidden break-words"
                  style={{
                    color: toilet.comment.length > 150 ? "rgba(0, 0, 0, 0.6)" : "black", // 長いコメントの色を薄く
                    maxHeight: "100px", // 高さ制限を設けて超えた部分を非表示に
                    transition: "color 0.3s",
                  }}
                >
                  {toilet.comment.length > 150
                    ? toilet.comment.slice(0, 150) + "..."
                    : toilet.comment}
                </div>

                <div className="mt-auto relative z-0">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={toilet.rating}
                    edit={false} // 星の数を固定して変更できないようにする
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 【特定のユーザーからのおすすめおトイレ】 */}
      <div className="max-w-5xl mx-auto mt-24 px-5">
        <h2 className="font-bold text-2xl">特定のユーザーからのおすすめおトイレ</h2>
        <p className="text-md text-gray-600 mt-1">人気ユーザーの最高評価のおトイレです。</p>
        <div className="mt-5 bg-gray-100 rounded-3xl p-3 md:p-0">
          <div className="p-4">
            <div className="md:flex items-center space-x-4">
              <div className="basis-1/6">
                <img className="ounded-md" src="/mv-04.png" alt="" />
              </div>
              <div className="mt-4 md:mt-0 basis-4/6">
                <p className="font-bold text-gray-800">ユーザー名 山田</p>
                <p className="mt-2 text-gray-600 font-medium">
                  El santuario de Tofino: playas afables, senderos copiosos y un atardecer mágico
                </p>
                <p className="mt-1 text-gray-600">
                  Guía completa para explorar Tofino que incluye lugares donde alojarse, comer,
                  emprender aventuras y ver atardeceres. Conecta con los espectaculares paisajes
                  costeros, los bosques apacibles y la majestuosa vida silvestre de esta ciudad
                  costera canadiense de la costa
                </p>
              </div>
              <button className="mt-4 md:mt-0 basis-1/6 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200">
                今すぐチェック
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 【渋谷区のおすすめおトイレ】 */}
      <div className="mt-24 py-8 px-6">
        <div className="w-fit mx-auto">
          <h2 className="font-bold text-2xl">渋谷区おすすめおトイレ</h2>
          <p className="text-md text-gray-600 mt-1">渋谷区の評価が高い順のトイレ一覧です。</p>
          <ul className="custom-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 break-words mt-5">
            {filteredToilets.map((toilet) => (
              <li
                key={toilet.id}
                className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-300 border-y-2 border-x-2 flex flex-col h-[450px]"
              >
                <div className="text-lg font-bold mb-2">{toilet.title}</div>

                <img
                  className="mb-2 border border-gray-300 rounded-lg w-full h-40 object-cover"
                  src={toilet.imgUrl ? `http://localhost:5000/${toilet.imgUrl}` : `/no-image.png`}
                  alt="投稿画像"
                />

                <div className="text-lg font-bold mb-2">{toilet.address}</div>

                {/* コメントの表示部分 */}
                <div
                  className="text-lg mb-2 overflow-hidden break-words"
                  style={{
                    color: toilet.comment.length > 150 ? "rgba(0, 0, 0, 0.6)" : "black", // 長いコメントの色を薄く
                    maxHeight: "100px", // 高さ制限を設けて超えた部分を非表示に
                    transition: "color 0.3s",
                  }}
                >
                  {toilet.comment.length > 150
                    ? toilet.comment.slice(0, 150) + "..."
                    : toilet.comment}
                </div>

                <div className="mt-auto relative z-0">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={toilet.rating}
                    edit={false} // 星の数を固定して変更できないようにする
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 新宿区のおすすめおトイレ */}
      <div className="mt-24 mb-20 custom-bg-color-01 py-8 px-6">
        <div className="w-fit mx-auto">
          <h2 className="font-bold text-2xl">新宿区おすすめおトイレ</h2>
          <p className="text-md text-gray-600 mt-1">新宿区の評価が高い順のトイレ一覧です。</p>
          <ul className="custom-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 break-words mt-5">
            {filteredToilets.map((toilet) => (
              <li
                key={toilet.id}
                className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-300 border-y-2 border-x-2 flex flex-col h-[450px]"
              >
                <div className="text-lg font-bold mb-2">{toilet.title}</div>

                <img
                  className="mb-2 border border-gray-300 rounded-lg w-full h-40 object-cover"
                  src={toilet.imgUrl ? `http://localhost:5000/${toilet.imgUrl}` : `/no-image.png`}
                  alt="投稿画像"
                />

                <div className="text-lg font-bold mb-2">{toilet.address}</div>

                {/* コメントの表示部分 */}
                <div
                  className="text-lg mb-2 overflow-hidden break-words"
                  style={{
                    color: toilet.comment.length > 150 ? "rgba(0, 0, 0, 0.6)" : "black", // 長いコメントの色を薄く
                    maxHeight: "100px", // 高さ制限を設けて超えた部分を非表示に
                    transition: "color 0.3s",
                  }}
                >
                  {toilet.comment.length > 150
                    ? toilet.comment.slice(0, 150) + "..."
                    : toilet.comment}
                </div>

                <div className="mt-auto relative z-0">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={toilet.rating}
                    edit={false} // 星の数を固定して変更できないようにする
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;