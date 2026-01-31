-- Create admins table
create table if not exists admins (
  id uuid default gen_random_uuid() primary key,
  username text not null unique,
  password text not null, -- Storing as plain text per request (Not recommended for production)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table admins enable row level security;

-- Policy: Allow public read/write to admins for login check (simplified)
-- In a real app, you'd use a stricter policy or Supabase Auth.
-- For this custom implementation:
create policy "Enable read access for all users" on admins for select using (true);

-- Insert the admin user
insert into admins (username, password) values
('topcelladmin', 'top251545Jr@')
on conflict (username) do nothing;
