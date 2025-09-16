-- Create uploaded files table to track user uploads
create table if not exists public.uploaded_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.exam_sessions(id) on delete cascade,
  filename text not null,
  file_path text not null,
  file_size bigint not null,
  file_type text not null,
  upload_status text not null default 'processing', -- 'processing', 'completed', 'failed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.uploaded_files enable row level security;

-- RLS policies for uploaded files
create policy "uploaded_files_select_own"
  on public.uploaded_files for select
  using (auth.uid() = user_id);

create policy "uploaded_files_insert_own"
  on public.uploaded_files for insert
  with check (auth.uid() = user_id);

create policy "uploaded_files_update_own"
  on public.uploaded_files for update
  using (auth.uid() = user_id);

create policy "uploaded_files_delete_own"
  on public.uploaded_files for delete
  using (auth.uid() = user_id);
