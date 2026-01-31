-- DISABLE ROW LEVEL SECURITY COMPLETELY FOR DEBUGGING
-- This ensures that no permission issues are hiding products.
-- Run this in Supabase SQL Editor.

alter table products disable row level security;
alter table categories disable row level security;

-- If you prefer keeping RLS enabled but want to fix policies:
-- alter table products enable row level security;
-- drop policy if exists "Public read" on products;
-- drop policy if exists "Anon write" on products;
-- drop policy if exists "Allow all operations for anon" on products;
-- create policy "Allow all" on products for all using (true) with check (true);
