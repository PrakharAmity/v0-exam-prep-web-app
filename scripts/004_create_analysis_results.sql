-- Create analysis results table to store AI analysis data
create table if not exists public.analysis_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.exam_sessions(id) on delete cascade,
  file_id uuid references public.uploaded_files(id) on delete cascade,
  analysis_type text not null, -- 'topic_priority', 'question_distribution', 'predictions'
  analysis_data jsonb not null,
  confidence_score decimal(3,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.analysis_results enable row level security;

-- RLS policies for analysis results
create policy "analysis_results_select_own"
  on public.analysis_results for select
  using (auth.uid() = user_id);

create policy "analysis_results_insert_own"
  on public.analysis_results for insert
  with check (auth.uid() = user_id);

create policy "analysis_results_update_own"
  on public.analysis_results for update
  using (auth.uid() = user_id);

create policy "analysis_results_delete_own"
  on public.analysis_results for delete
  using (auth.uid() = user_id);
