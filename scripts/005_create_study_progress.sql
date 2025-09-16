-- Create study progress table to track user learning progress
create table if not exists public.study_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.exam_sessions(id) on delete cascade,
  topic text not null,
  mastery_level decimal(3,2) not null default 0.0, -- 0.0 to 1.0
  time_spent_minutes integer not null default 0,
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  last_studied_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.study_progress enable row level security;

-- RLS policies for study progress
create policy "study_progress_select_own"
  on public.study_progress for select
  using (auth.uid() = user_id);

create policy "study_progress_insert_own"
  on public.study_progress for insert
  with check (auth.uid() = user_id);

create policy "study_progress_update_own"
  on public.study_progress for update
  using (auth.uid() = user_id);

create policy "study_progress_delete_own"
  on public.study_progress for delete
  using (auth.uid() = user_id);
