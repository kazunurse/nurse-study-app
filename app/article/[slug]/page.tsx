import { getPost, extractFlashcards, extractOutline, extractQuizzes } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import FlashcardViewer from "@/components/FlashcardViewer";
import QuizViewer from "@/components/QuizViewer";
import OutlineNav from "@/components/OutlineNav";

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const post = await getPost(slug);

  if (!post) return notFound();

  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const flashcards = extractFlashcards(post.content.rendered);
  const outline = extractOutline(post.content.rendered);
  const quizzes = extractQuizzes(post.content.rendered);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/study" className="text-gray-400 hover:text-gray-600 text-sm">
            ← 一覧へ
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

        {/* モード切替タブ */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { label: "📖 記事", value: undefined },
            { label: "🃏 フラッシュカード", value: "flashcard" },
            { label: "✅ クイズ", value: "quiz" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={`/article/${slug}${tab.value ? `?mode=${tab.value}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                mode === tab.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* 記事モード */}
        {!mode && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 本文 */}
            <div className="flex-1">
              <div
                className="bg-white rounded-2xl p-6 prose prose-blue max-w-none shadow-sm"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
            {/* アウトライン（PC） */}
            {outline.length > 0 && (
              <div className="lg:w-64 shrink-0">
                <div className="sticky top-20">
                  <OutlineNav outline={outline} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* フラッシュカードモード */}
        {mode === "flashcard" && (
          <div>
            {flashcards.length > 0 ? (
              <FlashcardViewer cards={flashcards} postId={post.id} />
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                <div className="text-4xl mb-3">🃏</div>
                <p>この記事はフラッシュカードを生成できへんかった。</p>
                <p className="text-sm mt-1">記事を読んで学習してみてな！</p>
              </div>
            )}
          </div>
        )}

        {/* クイズモード */}
        {mode === "quiz" && (
          <div>
            {quizzes.length > 0 ? (
              <QuizViewer quizzes={quizzes} postId={post.id} />
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                <div className="text-4xl mb-3">✅</div>
                <p>この記事はクイズを生成できへんかった。</p>
                <p className="text-sm mt-1">フラッシュカードで用語を覚えてみてな！</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
