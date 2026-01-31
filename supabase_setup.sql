-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Table: Categories
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Table: Products
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  price numeric not null,
  promo_price numeric,
  images text[],
  category_id uuid references categories(id) on delete set null,
  featured boolean default false,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Row Level Security (RLS) Policies
-- Enable RLS
alter table categories enable row level security;
alter table products enable row level security;

-- Create policies for public read access (anyone can view products/categories)
create policy "Public categories are viewable by everyone" on categories
  for select using (true);

create policy "Public products are viewable by everyone" on products
  for select using (active = true);

-- Create policies for admin write access (authenticated users only)
-- Note: You need to set to "Authenticated" role or specific user logic. 
-- For now, allowing full access to authenticated users for simplicity.
create policy "Authenticated users can modify categories" on categories
  for all using (auth.role() = 'authenticated');

create policy "Authenticated users can modify products" on products
  for all using (auth.role() = 'authenticated');

-- 4. Initial Data (Seed)
insert into categories (name, slug) values
('Móveis', 'moveis'),
('Iluminação', 'iluminacao'),
('Decoração', 'decoracao'),
('Organização', 'organizacao')
on conflict (slug) do nothing;

-- Insert products (Using subquery to get category IDs would be ideal, but for static script matching slugs works if manual)
-- Here we'll just insert products without category_id for now to match current simple logic, 
-- or we can try to link them if we know the UUIDs. Since UUIDs are random, we will insert ignoring category_id for this mock data.
insert into products (title, slug, description, price, promo_price, images, featured, active) values
(
  'Fone Headset Bluetooth JBL',
  'cadeira-slim-comfort',
  'Cadeira ergonômica com revestimento em tecido e encosto respirável.',
  499.9,
  429.9,
  ARRAY['/products/chair-1.svg', '/products/chair-2.svg'],
  true,
  true
),
(
  'Video Game Playstation 5 Bundle Fortnite Mídia Física',
  'mesa-nordic-120cm',
  'Divirta-se com tecnologia de ponta, o vídeo game playstation, proporciona o máximo dos gráficos dos jogos atuais, jogue online com seus amigos e com a sua família.',
  3999.90,
  null,
  ARRAY['/products/table-1.svg'],
  true,
  true
),
(
  'Luminária Orbit',
  'luminaria-orbit',
  'Luminária pendente com design moderno e LED integrado.',
  249.0,
  199.0,
  ARRAY['/products/lamp-1.svg', '/products/lamp-2.svg'],
  true,
  true
)
on conflict (slug) do nothing;
