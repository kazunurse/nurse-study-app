"use client";

type OutlineItem = { level: number; text: string };

export default function OutlineNav({ outline }: { outline: OutlineItem[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">目次</div>
      <ul className="flex flex-col gap-1">
        {outline.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => {
                const headings = document.querySelectorAll("h2, h3, h4");
                headings.forEach((h) => {
                  if (h.textContent?.trim() === item.text) {
                    h.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                });
              }}
              className={`text-left w-full text-sm hover:text-blue-600 transition-colors leading-relaxed ${
                item.level === 2
                  ? "text-gray-700 font-medium"
                  : item.level === 3
                  ? "text-gray-500 pl-3"
                  : "text-gray-400 pl-6 text-xs"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
