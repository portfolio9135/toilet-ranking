"use client";

import React, { useState } from "react";

const page = () => {
  //【状態を管理する変数】
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  //【発火させる関数】
  const handleSubmit = async (e) => {
    e.preventDefault(); //ページのリロードを防ぐ

    console.log("投稿する関数は発火しましたーーーー");

    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //JSON形式で送信する
        },
        body: JSON.stringify({
          title: title,
          address: address,
          comment: comment,
          rating: rating,
        }),
      });

      if (response.ok) {
        //成功した時の処理
        console.log("投稿が成功しましたーーーーーーーー！");
        setTitle("");
        setAddress("");
        setComment("");
        setRating(0); // もし評価があればこれもリセット
      } else {
        //エラーハンドリング
        console.error("投稿に失敗しました!!");
      }
    } catch (err) {
      console.error("エラーが発生しました！！", err);
      console.log(err);
    }
  };

  return (
    <div className="p-4  md:p-24">
      <h1 className="text-3xl font-bold mb-8">投稿ページですよーーーーーー</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#03c1ab]">写真</h2>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f7f5] file:text-[#03c1ab] hover:file:bg-[#ccf0eb]"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#03c1ab]">おトイレ名</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03c1ab]"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#03c1ab]">住所</h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03c1ab]"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#03c1ab]">投稿者コメント</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="投稿者のコメントを入力"
              cols={30}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03c1ab]"
            ></textarea>
          </div>







          

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#03c1ab] to-[#02a38a] text-white font-bold rounded-lg shadow-lg hover:opacity-80"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
