-- Create exam sessions table to track user study sessions
create table if not exists public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  exam_type text not null, -- 'practice', 'mock', 'review'
  status text not null default 'active', -- 'active', 'completed', 'archived'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.exam_sessions enable row level security;

-- RLS policies for exam sessions
create policy "exam_sessions_select_own"
  on public.exam_sessions for select
  using (auth.uid() = user_id);

create policy "exam_sessions_insert_own"
  on public.exam_sessions for insert
  with check (auth.uid() = user_id);

create policy "exam_sessions_update_own"
  on public.exam_sessions for update
  using (auth.uid() = user_id);

create policy "exam_sessions_delete_own"
  on public.exam_sessions for delete
  using (auth.uid() = user_id);
