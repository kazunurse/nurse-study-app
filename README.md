# 🏥 ナースStudy

看護学生・看護師向け学習Webアプリ

**🌐 公開URL:** https://willowy-licorice-3f1ba4.netlify.app/
**📦 GitHub:** https://github.com/kazunurse/nurse-study-app

---

## できること

| 機能 | 内容 |
|------|------|
| 📖 学習記事 | nurse-kazu.comの記事をカテゴリ別に表示 |
| 🃏 フラッシュカード | 重要用語をタップでめくって暗記 |
| ✅ クイズ | 4択問題で理解度チェック |
| 📝 ユーザー登録 | 進捗データを保存できる |
| 🗂 アウトライン | 記事の目次でサクッとナビゲーション |

---

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router) + Tailwind CSS
- **DB・認証**: Supabase
- **コンテンツ**: WordPress REST API（nurse-kazu.com）
- **デプロイ**: Netlify + GitHub

---

## 環境変数（.env.local）

```
NEXT_PUBLIC_SUPABASE_URL=https://fcamburkvksousebrguu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
NEXT_PUBLIC_WP_API_URL=https://nurse-kazu.com/wp-json/wp/v2
```

---

## ローカルで動かす

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 改良したときのデプロイ方法

```bash
git add .
git commit -m "変更内容"
git push
# → Netlifyが自動でデプロイされる！
```

---

## WordPressカテゴリID

| ID | カテゴリ | 記事数 |
|----|---------|--------|
| 14 | 解剖学 | 19 |
| 12 | 実習系 | 26 |
| 13 | 看護学生 | 35 |
| 15 | 看護師系 | 5 |

---

## 今後やりたいこと

- [ ] 進捗ダッシュボード
- [ ] WordPressと自動同期（Webhook）
- [ ] インタラクティブ解剖図
- [ ] Claude API連携（高精度問題生成）
- [ ] カスタムドメイン
