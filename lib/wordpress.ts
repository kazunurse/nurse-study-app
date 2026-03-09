const WP_API = process.env.NEXT_PUBLIC_WP_API_URL;

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  date: string;
};

export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${WP_API}/categories?per_page=20&hide_empty=true`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getPostsByCategory(
  categoryId: number,
  page = 1
): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_API}/posts?categories=${categoryId}&per_page=20&page=${page}&_fields=id,slug,title,excerpt,categories,date`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_fields=id,slug,title,content,categories,date`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts[0] ?? null;
}

// 記事のHTMLから太字・見出し・リストを抽出してフラッシュカードを生成
export function extractFlashcards(html: string): { term: string; definition: string }[] {
  const cards: { term: string; definition: string }[] = [];

  // <strong> タグ → 用語として抽出
  const strongRegex = /<strong>([^<]{2,30})<\/strong>([^<]{5,150})/g;
  let match;
  while ((match = strongRegex.exec(html)) !== null) {
    const term = match[1].trim();
    const def = match[2].replace(/<[^>]+>/g, "").trim();
    if (term && def) {
      cards.push({ term, definition: def.slice(0, 120) });
    }
  }

  return cards;
}

// 記事のHTMLから見出しを抽出してアウトラインを生成
export function extractOutline(html: string): { level: number; text: string }[] {
  const outline: { level: number; text: string }[] = [];
  const headingRegex = /<h([2-4])[^>]*>([^<]+)<\/h\1>/g;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    outline.push({
      level: parseInt(match[1]),
      text: match[2].trim(),
    });
  }
  return outline;
}

// 記事から穴埋めクイズを生成
export function extractQuizzes(html: string): { question: string; answer: string; choices: string[] }[] {
  const quizzes: { question: string; answer: string; choices: string[] }[] = [];
  const strongMatches: string[] = [];

  const strongRegex = /<strong>([^<]{2,20})<\/strong>/g;
  let match;
  while ((match = strongRegex.exec(html)) !== null) {
    strongMatches.push(match[1].trim());
  }

  // 文章中の太字を穴埋めにする
  const sentenceRegex = /([^。！？]{10,60}<strong>[^<]{2,20}<\/strong>[^。！？]{0,60}[。！？])/g;
  let sMatch;
  while ((sMatch = sentenceRegex.exec(html)) !== null && quizzes.length < 10) {
    const raw = sMatch[1];
    const answerMatch = /<strong>([^<]+)<\/strong>/.exec(raw);
    if (!answerMatch) continue;
    const answer = answerMatch[1].trim();
    const question = raw
      .replace(/<strong>[^<]+<\/strong>/, "【　　　】")
      .replace(/<[^>]+>/g, "")
      .trim();

    // ダミー選択肢（同じ記事内の他の太字から）
    const otherChoices = strongMatches
      .filter((s) => s !== answer)
      .slice(0, 3);

    if (otherChoices.length >= 2) {
      const choices = [answer, ...otherChoices].sort(() => Math.random() - 0.5);
      quizzes.push({ question, answer, choices });
    }
  }

  return quizzes;
}

// カテゴリIDと名前のマッピング
export const CATEGORY_MAP: Record<number, { name: string; emoji: string; color: string }> = {
  14: { name: "解剖学", emoji: "🫀", color: "bg-red-50 border-red-200 text-red-700" },
  12: { name: "実習系", emoji: "🏥", color: "bg-blue-50 border-blue-200 text-blue-700" },
  13: { name: "看護学生", emoji: "📚", color: "bg-green-50 border-green-200 text-green-700" },
  15: { name: "看護師系", emoji: "💉", color: "bg-purple-50 border-purple-200 text-purple-700" },
};
