"use client";

import React, { FC, useEffect, useState } from "react";

interface Toilets {
  id: number;
  name: string;
  lacation: string;
  rating: number;
}

const Page: FC = () => {
  //<Toilets[]>は、Toilets型のオブジェクトを要素として持つ配列を表します。
  const [toilets, setToilets] = useState<Toilets[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/toilets")
      .then((res) => res.json())
      .then((data) => setToilets(data))
      .catch((err) => console.error("エラーが発生しました", err));
  }, []);

  return (
    <div className="pt-20">
      <div>
        <h2>投稿されたトイレの一覧@</h2>
        <ul className="custom-grid">
          {toilets.map((toilet) => (
            <li key={toilet.id} className="bg-white shadow-md rounded-lg p-6 max-w-[300px]">
              <div className="text-lg font-bold mb-2">id : {toilet.id}</div>
              <div className="text-lg font-bold mb-2">住所 : {toilet.address}</div>
              <div className="text-lg font-bold mb-2">{toilet.name}</div>
              <div className="text-lg font-bold mb-2">星{toilet.rating}つ</div>
              <div className="text-lg font-bold mb-2">{toilet.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;