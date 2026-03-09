import Link from "next/link";
import { getCategories } from "@/lib/wordpress";
import { CATEGORY_MAP } from "@/lib/wordpress";
import { BookOpen } from "lucide-react";

const TARGET_CATEGORY_IDS = [14, 12, 13, 15];

export default async function StudyPage() {
  const categories = await getCategories();
  const filtered = categories.filter((c) => TARGET_CATEGORY_IDS.includes(c.id));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="font-bold text-xl text-blue-700">ナースStudy</span>
          </Link>
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            ログイン
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">カテゴリを選んでな</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((cat) => {
            const meta = CATEGORY_MAP[cat.id];
            if (!meta) return null;
            return (
              <Link
                key={cat.id}
                href={`/study/${cat.id}`}
                className={`${meta.color} border-2 rounded-2xl p-6 flex items-center gap-5 hover:shadow-md transition-all`}
              >
                <span className="text-5xl">{meta.emoji}</span>
                <div>
                  <div className="font-bold text-lg">{meta.name}</div>
                  <div className="text-sm opacity-70 mt-1">{cat.count}記事 · フラッシュカード・クイズあり</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
