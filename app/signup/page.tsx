"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) {
      setError("登録できへんかった。もう一回試してみて！");
    } else {
      setDone(true);
    }
    setLoading(false);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">登録完了やで！</h2>
          <p className="text-gray-500 mb-6">
            確認メールを送ったで。メールのリンクをクリックしたらログインできるようになるよ！
          </p>
          <Link href="/login" className="bg-blue-600 text-white rounded-xl px-6 py-3 font-bold hover:bg-blue-700 inline-block">
            ログインページへ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">📝</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">無料で始めよう！</h1>
          <p className="text-gray-500 mt-1">アカウント作って学習スタート</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">ニックネーム</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="看護太郎"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">パスワード（6文字以上）</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700 disabled:opacity-50 mt-2"
          >
            {loading ? "登録中..." : "無料で登録する"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          すでにアカウントある？{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            ログインはこちら
          </Link>
        </p>
      </div>
    </main>
  );
}
