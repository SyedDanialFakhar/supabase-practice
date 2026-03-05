-- =============================================================================
-- Run this SQL in the Supabase Dashboard: SQL Editor
-- =============================================================================
-- Supabase Auth uses the built-in auth.users table; no extra table is required
-- for email/password login. Below are optional profiles and RLS for customer.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Optional: profiles table (mirrors auth.users for display name, avatar, etc.)
-- Run only if you want a public profile per user.
-- -----------------------------------------------------------------------------
-- create table if not exists public.profiles (
--   id uuid primary key references auth.users(id) on delete cascade,
--   email text,
--   full_name text,
--   avatar_url text,
--   created_at timestamptz default now(),
--   updated_at timestamptz default now()
-- );

-- enable RLS
-- alter table public.profiles enable row level security;

-- users can read/update their own profile
-- create policy "Users can view own profile"
--   on public.profiles for select
--   using (auth.uid() = id);
-- create policy "Users can update own profile"
--   on public.profiles for update
--   using (auth.uid() = id);

-- trigger to create profile on signup (run after creating profiles table)
-- create or replace function public.handle_new_user()
-- returns trigger as $$
-- begin
--   insert into public.profiles (id, email)
--   values (new.id, new.email);
--   return new;
-- end;
-- $$ language plpgsql security definer;

-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Required: RLS on customer table so only logged-in users can read/insert
-- Assumes you already have table: customer (id, name, email, country, created_at)
-- -----------------------------------------------------------------------------
alter table public.customer enable row level security;

-- allow authenticated users to select all customers (adjust policy if you want per-user data)
create policy "Authenticated users can read customers"
  on public.customer for select
  to authenticated
  using (true);

-- allow authenticated users to insert customers
create policy "Authenticated users can insert customers"
  on public.customer for insert
  to authenticated
  with check (true);

-- optional: allow authenticated users to update/delete (uncomment if needed)
-- create policy "Authenticated users can update customers"
--   on public.customer for update to authenticated using (true);
-- create policy "Authenticated users can delete customers"
--   on public.customer for delete to authenticated using (true);

-- -----------------------------------------------------------------------------
-- If you never created the customer table, run this instead of the RLS block above:
-- -----------------------------------------------------------------------------
-- create table public.customer (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   country text not null,
--   created_at timestamptz default now()
-- );

-- alter table public.customer enable row level security;

-- create policy "Authenticated users can read customers"
--   on public.customer for select to authenticated using (true);

-- create policy "Authenticated users can insert customers"
--   on public.customer for insert to authenticated with check (true);
