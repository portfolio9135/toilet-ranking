"use client";

import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { authState } from "../_store/authState";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostPage = () => {
  console.log("投稿ページがレンダリングされましたーーーーー");

  //【変数】
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [img, setImg] = useState<File | null>(null); //File型またはnull
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const currentUser = useRecoilValue(authState);

  //【関数】

  //【画像プレビューのURLを生成した時に発火する関数】
  useEffect(() => {
    if (imgPreviewUrl) {
      // 画像プレビューのURLが生成されたら、不要になったURLを解放する
      return () => URL.revokeObjectURL(imgPreviewUrl);
    }
  }, [imgPreviewUrl]);

  //【ユーザーIDをセットする関数】
  useEffect(() => {
    if (currentUser?.user?.id) {
      setUserId(currentUser.user.id);
    }
  }, [currentUser]);

  //【ユーザーネームをセットする関数】
  useEffect(() => {
    if (currentUser?.user?.username) {
      setUserName(currentUser.user.username);
    }
  }, [currentUser]);

  //【投稿送信時に発火する関数】
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページのリロードを防ぐ

    // フォームデータを作成
    const formData = new FormData();

    // フォームデータに各値を追加
    formData.append("title", title);
    formData.append("address", address);
    formData.append("comment", comment);
    formData.append("rating", rating.toString()); //数値を文字列に変換して追加
    formData.append("postingUserId", userId);
    formData.append("postingUserName", userName);

    if (img !== null) {
      formData.append("img", img);
    }

    try {
      const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE_URL}/post`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        //成功した時の処理
        toast.success("投稿成功しました!");

        setTitle("");
        setAddress("");
        setComment("");
        setRating(0);
        setImg(null);
        setImgPreviewUrl("");

        router.push("/");
      } else {
        //エラーハンドリング
        const errorData = await response.json();
        toast.error(`エラーが発生しました！${errorData.message}`);
      }
    } catch (err) {
      console.error("エラーが発生しました！！", err);
      console.log(err);
    }
  };

  //【画像を選択した時に発火する関数】
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setImg(file);

    // 画像ファイルが選ばれたら、そのURLを生成してプレビューを表示する
    if (file) {
      setImgPreviewUrl(URL.createObjectURL(file));
    } else {
      setImgPreviewUrl("");
    }
  };

  //【星の評価をした時に発火する関数】
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  //【HTML部分】
  return (
    <div className="w-fit mx-auto pt-32 flex-grow">
      <h1 className="text-3xl font-bold mx-auto w-fit">おトイレの投稿ページ</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <h2 className="text-xl font-semibold mb-2 text-[#03c1ab]">写真</h2>
            <input
              onChange={handleImgChange}
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f7f5] file:text-[#03c1ab] hover:file:bg-[#ccf0eb]"
            />
            {imgPreviewUrl && (
              <Image
                src={imgPreviewUrl}
                alt="画像プレビュー"
                width={200}
                height={200}
                className="mt-4 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
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
            <label>星の評価:</label>
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
              value={rating}
              key={rating}
            />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default PostPage;