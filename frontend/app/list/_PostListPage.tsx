"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

interface Toilet {
  id: number;
  title: string;
  imgUrl: string;
  address: string;
  comment: string;
  rating: number;
}

const PostListPage: FC = () => {
  console.log("投稿一覧ページがレンダリングされましたーーーーー");

  const [toilets, setToilets] = useState<Toilet[]>([]);

  useEffect(() => {
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

  return (
    <div className="pt-28">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-bold text-2xl mb-6 mx-auto w-fit">
          投稿されたトイレの一覧
        </h2>
        <ul className="custom-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 break-words">
          {toilets.map((toilet) => (
            <li
              key={toilet.id}
              className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-300 border-y-2 border-x-2 flex flex-col h-[450px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/post/${toilet.id}`}>
                {/* 投稿タイトル */}
                <div className="text-lg font-bold mb-2">{toilet.title}</div>

                {/* 投稿画像サムネイル */}
                <img
                  className="mb-2 border border-gray-300 rounded-lg w-full h-40 object-cover"
                  src={
                    toilet.imgUrl
                      ? `http://localhost:5000/${toilet.imgUrl}`
                      : `/no-image.png`
                  }
                  alt="投稿画像"
                />

                <img src="" alt="" />

                {/* 住所 */}
                <div className="text-lg font-bold mb-2">{toilet.address}</div>

                {/* コメントの表示部分 */}
                <div
                  className="text-lg mb-2 overflow-hidden break-words"
                  style={{
                    color:
                      toilet.comment.length > 150
                        ? "rgba(0, 0, 0, 0.6)"
                        : "black", // 長いコメントの色を薄く
                    maxHeight: "100px", // 高さ制限を設けて超えた部分を非表示に
                    transition: "color 0.3s",
                  }}
                >
                  {toilet.comment.length > 150
                    ? toilet.comment.slice(0, 150) + "..."
                    : toilet.comment}
                </div>

                {/* 星の評価 */}
                <div className="mt-auto relative z-0">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={toilet.rating}
                    edit={false} // 星の数を固定して変更できないようにする
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostListPage;
