"use client";

import { FC, memo } from "react";

const Footer: FC = memo(() => {
  return (
    <footer className="bg-gray-100">
      <div className="p-8 max-w-[1024px] mx-auto">
        <div className="md:flex">
          <div className="text-gray-600 mb-8 mr-12 md:mb-0">
            <p>アプリについて</p>
            <p>プレスリリース</p>
            <p>利用規約・ポリシー</p>
            <p>採用情報</p>
            <p>安心・安全の取り組み</p>
          </div>
          <div className="text-gray-600 mb-8 mr-12 md:mb-0">
            <p>お問い合わせ</p>
            <p>アクセシビリティ情報</p>
            <p>口コミを投稿する</p>
            <p>施設を追加する</p>
            <p>おすすめトイレ</p>
          </div>
          <div className="text-gray-600 mb-8 mr-12 md:mb-0">
            <p>エコトイレ認証</p>
            <p>サポートセンター</p>
            <p>トイレの豆知識</p>
            <p>ビジネス向けツール</p>
            <p>施設管理者様へ</p>
          </div>
          <div className="text-gray-600 mb-8 mr-12 md:mb-0">
            <p>ビジネスプラン</p>
            <p>広告掲載について</p>
            <p>コンテンツAPIのご案内</p>
            <p>アプリをダウンロード</p>
            <p>iPhone アプリ</p>
            <p>Android アプリ</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex">
            <div className="w-12 mr-4 pt-1">
              <img className="rounded-full" src="/favicon.png" alt="トイレのアイコン画像" />
            </div>
            <div className=" basis-11/12">
              <p className="text-gray-500 text-xs md:text-sm">&copy; 2024 Tripadvisor LLC All rights reserved.</p>
              <p className="font-bold md:text-lg mt-1 md:mt-0">
                利用規約 プライバシーおよびクッキーに関する声明 Cookie に関する承認 サイト
                マップサイトの仕組み お問い合わせ
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            弊社サイトの現バージョンは、日本の日本語の利用者を対象としています。
            別の国や地域にお住まいの場合は、ドロップダウンメニューから、国または地域別のサイトを選択してください。
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
