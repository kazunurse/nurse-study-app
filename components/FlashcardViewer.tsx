"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Card = { term: string; definition: string };

export default function FlashcardViewer({
  cards,
  postId,
}: {
  cards: Card[];
  postId: number;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);

  const card = cards[index];
  const progress = Math.round(((index + 1) / cards.length) * 100);

  function handleMastered() {
    const next = new Set(mastered);
    next.add(index);
    setMastered(next);
    goNext();
  }

  function goNext() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    } else {
      setFinished(true);
    }
  }

  function goPrev() {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  }

  function restart() {
    setIndex(0);
    setFlipped(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">全部終わったで！</h2>
        <p className="text-gray-500 mb-2">
          {mastered.size}枚 / {cards.length}枚 覚えた！
        </p>
        {mastered.size === cards.length ? (
          <p className="text-green-600 font-bold mb-6">全部マスターや！すごいな〜！</p>
        ) : (
          <p className="text-orange-500 font-bold mb-6">惜しいな〜！もう一回やってみよ！</p>
        )}
        <button
          onClick={restart}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> もう一回
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* プログレスバー */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 shrink-0">
          {index + 1} / {cards.length}
        </span>
      </div>

      {/* カード */}
      <div
        onClick={() => setFlipped(!flipped)}
        className={`cursor-pointer rounded-3xl p-8 min-h-52 flex flex-col items-center justify-center text-center shadow-md transition-all select-none ${
          flipped
            ? "bg-blue-600 text-white"
            : "bg-white border-2 border-gray-100 text-gray-800"
        }`}
      >
        {!flipped ? (
          <>
            <div className="text-xs text-gray-400 mb-4 font-medium">タップして答えを見る</div>
            <div className="text-2xl font-bold">{card.term}</div>
          </>
        ) : (
          <>
            <div className="text-xs text-blue-200 mb-4 font-medium">答え</div>
            <div className="text-lg leading-relaxed">{card.definition}</div>
          </>
        )}
      </div>

      {/* ナビゲーション */}
      <div className="flex gap-3 mt-6 justify-center">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> 前へ
        </button>

        {flipped && (
          <button
            onClick={handleMastered}
            className="flex items-center gap-1 px-5 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600"
          >
            覚えた！✓
          </button>
        )}

        <button
          onClick={goNext}
          className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50"
        >
          次へ <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        ✓ 覚えた：{mastered.size}枚 / {cards.length}枚
      </p>
    </div>
  );
}
