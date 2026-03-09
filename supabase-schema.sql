-- ユーザープロフィール
create table if not exists public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- 学習進捗（記事単位）
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id integer not null,
  category_id integer not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, post_id)
);

-- クイズ結果
create table if not exists public.quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id integer not null,
  score integer not null,
  total integer not null,
  created_at timestamptz default now()
);

-- フラッシュカード習熟度
create table if not exists public.flashcard_status (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id integer not null,
  card_index integer not null,
  mastered boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, post_id, card_index)
);

-- RLS（行レベルセキュリティ）有効化
alter table public.user_profiles enable row level security;
alter table public.progress enable row level security;
alter table public.quiz_results enable row level security;
alter table public.flashcard_status enable row level security;

-- ポリシー（自分のデータだけ読み書き可能）
create policy "自分のプロフィールのみ" on public.user_profiles for all using (auth.uid() = id);
create policy "自分の進捗のみ" on public.progress for all using (auth.uid() = user_id);
create policy "自分のクイズ結果のみ" on public.quiz_results for all using (auth.uid() = user_id);
create policy "自分のカード状態のみ" on public.flashcard_status for all using (auth.uid() = user_id);

-- ユーザー登録時に自動でプロフィール作成
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, display_name)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
