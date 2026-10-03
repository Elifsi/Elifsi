-- ==============================================================================
-- Elifsi Technologies Private Limited — Core Database Migration
-- Target: Supabase (PostgreSQL)
-- Safe to execute once in Supabase SQL Editor (Database -> SQL Editor)
-- ==============================================================================

-- 1. JOBS TABLE (Dynamic hiring positions managed via Admin Console)
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  department text not null,
  location text not null default 'Janakpur, Nepal / Hybrid',
  employment_type text not null default 'Full-time',
  status text not null default 'open' check (status in ('open', 'upcoming', 'archived')),
  summary text not null,
  responsibilities jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  nice_to_have jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. JOB APPLICATIONS TABLE (Direct candidate submissions with resume metadata)
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  job_slug text not null,
  job_title text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  cover_letter text,
  additional_message text,
  resume_filename text,
  resume_data text, -- Base64 encoded resume file or storage URI
  status text not null default 'new' check (status in ('new', 'reviewing', 'interviewed', 'accepted', 'archived')),
  notes text,
  resend_status text default 'dispatched',
  created_at timestamptz not null default now()
);

-- 3. CONTACT INQUIRIES TABLE (Corporate leads and partnership proposals)
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  name text not null,
  email text not null,
  phone text,
  organization text,
  topic text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'replied', 'archived')),
  notes text,
  resend_status text default 'dispatched',
  created_at timestamptz not null default now()
);

-- 4. PERFORMANCE INDEXES
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_jobs_department on public.jobs(department);
create index if not exists idx_job_applications_job_slug on public.job_applications(job_slug);
create index if not exists idx_job_applications_status on public.job_applications(status);
create index if not exists idx_job_applications_created_at on public.job_applications(created_at desc);
create index if not exists idx_contact_inquiries_topic on public.contact_inquiries(topic);
create index if not exists idx_contact_inquiries_status on public.contact_inquiries(status);
create index if not exists idx_contact_inquiries_created_at on public.contact_inquiries(created_at desc);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.contact_inquiries enable row level security;

-- Public read access for published jobs on the corporate website
create policy "Allow public read access for open jobs"
  on public.jobs
  for select
  to public
  using (status = 'open' or status = 'upcoming');

-- Public insert policy for candidate applications
create policy "Allow public insert for candidate applications"
  on public.job_applications
  for insert
  to public
  with check (true);

-- Public insert policy for contact inquiries
create policy "Allow public insert for contact inquiries"
  on public.contact_inquiries
  for insert
  to public
  with check (true);

-- Service role bypasses RLS automatically for the Admin Panel
