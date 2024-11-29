"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { useRecoilValue } from "recoil";
import { authState } from "../../_store/authState";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const router = useRouter();

  const { id } = params;
  const [post, setPost] = useState<any | null>(null);
  const [rating, setRating] = useState(0);

  const currentUser = useRecoilValue(authState);

  // 投稿データを取得する処理
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/post/${id}`);
        if (response.ok) {
          const data = await response.json();

          console.log("下記が data です");
          console.log(data);

          setPost(data);

          console.log(`${post}`);

          setRating(data.rating); // レーティングを設定
        } else {
          console.error("投稿詳細の取得に失敗しました:", response.statusText);
          setPost(null);
        }
      } catch (error) {
        console.error("エラー発生:", error);
      }
    };

    fetchPost();
  }, []);

  //削除ボタンがクリックされた時の処理
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("投稿を削除しました");
        router.push("/");
      } else {
        alert("投稿の削除に失敗しました");
      }
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  if (!post) return <div className="p-4">読み込み中...</div>;

  return (
    <div className="w-fit mx-auto pt-32 flex-grow">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#02a38a]">{post.title}</h1>

        <div className="flex justify-center mb-4">
          <Image
            // src={`/no-image.png`}
            src={post.imgUrl ? `http://localhost:5000/${post.imgUrl}` : `/no-image.png`}
            alt={post.title}
            width={500}
            height={300}
            className="rounded-lg shadow-md"
            unoptimized // 開発環境で最適化を無効にする場合に使用
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#03c1ab]">住所</h2>
          <p className="text-gray-700">{post.address}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#03c1ab]">投稿者コメント</h2>
          <p className="text-gray-700">{post.comment}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#03c1ab]">評価</h2>
          <ReactStars
            count={5}
            value={rating}
            size={24}
            activeColor="#ffd700"
            isHalf={true}
            edit={false} // ユーザーが評価を変更できないようにする
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#03c1ab]">投稿者</h2>
          {post.postingUserId === currentUser.user.id ? (
            <p className="text-gray-700">自分</p>
          ) : (
            <p className="text-gray-700">{post.postingUserName}</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          {currentUser?.user?.id === post.postingUserId && (
            <button
              className="mt-4 w-2/6 py-2 bg-gradient-to-r from-[#03c1ab] to-[#02a38a] text-white font-bold rounded-lg shadow-lg hover:opacity-80"
              onClick={() => alert("編集ボタンがクリックされました")}
            >
              編集する
            </button>
          )}

          {currentUser?.user?.id === post.postingUserId && (
            <button
              className="mt-4 w-2/6 py-2 bg-gradient-to-r from-[#d9534f] to-[#c9302c] text-white font-bold rounded-lg shadow-lg hover:opacity-80"
              onClick={handleDelete}
            >
              削除する
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;