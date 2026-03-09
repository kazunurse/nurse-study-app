"use client";
import { useState } from "react";
import { RotateCcw, ChevronRight } from "lucide-react";

type Quiz = { question: string; answer: string; choices: string[] };

export default function QuizViewer({
  quizzes,
  postId,
}: {
  quizzes: Quiz[];
  postId: number;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = quizzes[index];

  function handleAnswer(choice: string) {
    if (selected) return;
    setSelected(choice);
    if (choice === quiz.answer) setScore((s) => s + 1);
  }

  function goNext() {
    if (index < quizzes.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / quizzes.length) * 100);
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm max-w-xl mx-auto">
        <div className="text-6xl mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "😊" : "💪"}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">クイズ終了！</h2>
        <p className="text-gray-500 mb-4">
          {quizzes.length}問中 <span className="font-bold text-blue-600 text-2xl">{score}</span> 問正解！
        </p>
        <div className="bg-gray-100 rounded-2xl py-4 px-6 mb-6">
          <div className="text-4xl font-bold text-blue-600">{pct}%</div>
          <div className="text-sm text-gray-500 mt-1">
            {pct >= 80 ? "完璧やで！次の記事もやってみよ！" : pct >= 50 ? "惜しいな〜！もう一回チャレンジしてみよ！" : "まだまだこれから！一緒にがんばろ！"}
          </div>
        </div>
        <button
          onClick={restart}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> もう一回チャレンジ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* プログレス */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${((index + 1) / quizzes.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 shrink-0">
          {index + 1} / {quizzes.length}
        </span>
      </div>

      {/* 問題 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
        <div className="text-xs text-gray-400 mb-3 font-medium">問題 {index + 1}</div>
        <p className="text-gray-800 font-medium leading-relaxed text-lg">{quiz.question}</p>
      </div>

      {/* 選択肢 */}
      <div className="flex flex-col gap-3">
        {quiz.choices.map((choice) => {
          let style = "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
          if (selected) {
            if (choice === quiz.answer) {
              style = "bg-green-50 border-2 border-green-400 text-green-700 font-bold";
            } else if (choice === selected) {
              style = "bg-red-50 border-2 border-red-400 text-red-700";
            } else {
              style = "bg-white border-2 border-gray-100 text-gray-400";
            }
          }
          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              className={`${style} rounded-xl px-5 py-4 text-left transition-all`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* 正誤フィードバック */}
      {selected && (
        <div className={`mt-5 rounded-xl px-5 py-4 ${selected === quiz.answer ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          <p className="font-bold text-lg mb-1">
            {selected === quiz.answer ? "正解やで！ 🎉" : "惜しいな〜！ 💪"}
          </p>
          <p className="text-sm">正解：<span className="font-bold">{quiz.answer}</span></p>
        </div>
      )}

      {selected && (
        <button
          onClick={goNext}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 mt-5 mx-auto"
        >
          {index < quizzes.length - 1 ? "次の問題" : "結果を見る"}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
