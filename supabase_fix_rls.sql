-- Remove restrictive policies
drop policy if exists "Authenticated users can modify products" on products;
drop policy if exists "Authenticated users can modify categories" on categories;
drop policy if exists "Public products are viewable by everyone" on products;
drop policy if exists "Public categories are viewable by everyone" on categories;

-- Allow public read access (essential for the store to work)
create policy "Public read access" on products
  for select using (true);
create policy "Public read access" on categories
  for select using (true);

-- Allow ALL operations for anyone (since we are handling auth via custom AdminAuthGuard in the app)
-- WARNING: This makes your DB writable by anyone with the anon key. 
-- Ensure your credentials are not leaked or move to true Supabase Auth later.
create policy "Allow all operations for anon" on products
  for all using (true);

create policy "Allow all operations for anon" on categories
  for all using (true);
