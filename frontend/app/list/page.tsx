"use client";

import React, { FC, useEffect, useState } from "react";

interface Toilet {
  id: number;
  title: string;
  location: string;
  rating: number;
}

const Page: FC = () => {
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
    <div className="pt-20">
      <div>
        <h2>投稿されたトイレの一覧</h2>
        <ul className="custom-grid">
          {toilets.map((toilet) => (
            <li key={toilet.id} className="bg-white shadow-md rounded-lg p-6 max-w-[300px]">
              <div className="text-lg font-bold mb-2">id : {toilet.id}</div>
              <div className="text-lg font-bold mb-2">{toilet.title}</div>
              <div className="text-lg font-bold mb-2">星 {toilet.rating}つ</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;