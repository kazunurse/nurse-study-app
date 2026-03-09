import Link from "next/link";
import { getPostsByCategory, CATEGORY_MAP } from "@/lib/wordpress";
import { BookOpen, Brain, CheckCircle } from "lucide-react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const id = parseInt(categoryId);
  const posts = await getPostsByCategory(id);
  const meta = CATEGORY_MAP[id];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/study" className="text-gray-400 hover:text-gray-600 text-sm">
            ← カテゴリ一覧
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium text-sm">
            {meta?.emoji} {meta?.name}
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">{meta?.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{meta?.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{posts.length}記事 · 各記事でフラッシュカード・クイズが使えるで</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const title = post.title.rendered.replace(/<[^>]+>/g, "");
            const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 80);
            return (
              <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all">
                <Link href={`/article/${post.slug}`}>
                  <h2 className="font-bold text-gray-800 text-lg hover:text-blue-600 transition-colors mb-2">
                    {title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{excerpt}…</p>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/article/${post.slug}`}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100"
                  >
                    <BookOpen className="w-3 h-3" /> 記事を読む
                  </Link>
                  <Link
                    href={`/article/${post.slug}?mode=flashcard`}
                    className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-100"
                  >
                    <Brain className="w-3 h-3" /> フラッシュカード
                  </Link>
                  <Link
                    href={`/article/${post.slug}?mode=quiz`}
                    className="flex items-center gap-1 text-xs bg-green-50 text-green-600 border border-green-200 rounded-full px-3 py-1 hover:bg-green-100"
                  >
                    <CheckCircle className="w-3 h-3" /> クイズ
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
