import Link from "next/link";
import { BookOpen, Brain, CheckCircle, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="font-bold text-xl text-blue-700">ナースStudy</span>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="text-sm text-blue-600 hover:underline px-3 py-1">
              ログイン
            </Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white rounded-full px-4 py-1 hover:bg-blue-700">
              無料登録
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-blue-500 font-medium mb-2">看護学生・看護師向け学習アプリ</p>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          国試合格、<span className="text-blue-600">一緒にがんばろ！</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          解剖学・実習・国試対策まで、フラッシュカードとクイズで楽しく学べるで。
          毎日少しずつ続けたら、きっと合格できる！
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-blue-600 text-white rounded-full px-8 py-3 font-bold hover:bg-blue-700 text-lg">
            無料で始める →
          </Link>
          <Link href="/study" className="border-2 border-blue-300 text-blue-600 rounded-full px-8 py-3 font-bold hover:bg-blue-50 text-lg">
            ゲストで見てみる
          </Link>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">こんな機能があるで！</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BookOpen className="w-8 h-8 text-blue-500" />,
              title: "学習記事",
              desc: "解剖学・実習系など、記事のポイントをわかりやすく整理してあるで",
              color: "bg-blue-50 border-blue-100",
            },
            {
              icon: <Brain className="w-8 h-8 text-purple-500" />,
              title: "フラッシュカード",
              desc: "重要用語をカードでスキマ時間にサクサク覚えられる！",
              color: "bg-purple-50 border-purple-100",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-green-500" />,
              title: "クイズ",
              desc: "穴埋め・4択で理解度チェック。間違えたところを重点復習！",
              color: "bg-green-50 border-green-100",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
              title: "進捗管理",
              desc: "どこまで学んだか一目でわかる。毎日の積み重ねを可視化！",
              color: "bg-orange-50 border-orange-100",
            },
          ].map((f) => (
            <div key={f.title} className={`${f.color} border rounded-2xl p-6 flex flex-col items-center text-center gap-3`}>
              {f.icon}
              <h3 className="font-bold text-gray-700 text-lg">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* カテゴリ */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">学習カテゴリ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { emoji: "🫀", name: "解剖学", id: 14, count: 19 },
            { emoji: "🏥", name: "実習系", id: 12, count: 26 },
            { emoji: "📚", name: "看護学生", id: 13, count: 35 },
            { emoji: "💉", name: "看護師系", id: 15, count: 5 },
          ].map((cat) => (
            <Link
              key={cat.id}
              href={`/study/${cat.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <div className="font-bold text-gray-700">{cat.name}</div>
              <div className="text-xs text-gray-400 mt-1">{cat.count}記事</div>
            </Link>
          ))}
        </div>
      </section>

      {/* フッター */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2025 ナースStudy | コンテンツ提供：<a href="https://nurse-kazu.com" className="text-blue-400 hover:underline">nurse-kazu.com</a></p>
      </footer>
    </main>
  );
}
