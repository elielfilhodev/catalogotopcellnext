-- Create the products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  price numeric not null,
  promo_price numeric,
  images text[]
);

-- Create the categories table
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique
);

-- Insert dummy data for products
insert into products (title, slug, description, price, promo_price, images) values
(
  'Fone Headset Bluetooth JBL',
  'cadeira-slim-comfort',
  'Cadeira ergonômica com revestimento em tecido e encosto respirável.',
  499.9,
  429.9,
  ARRAY['/products/chair-1.svg', '/products/chair-2.svg']
),
(
  'Video Game Playstation 5 Bundle Fortnite Mídia Física',
  'mesa-nordic-120cm',
  'Divirta-se com tecnologia de ponta, o vídeo game playstation, proporciona o máximo dos gráficos dos jogos atuais, jogue online com seus amigos e com a sua família.',
  3999.90,
  null,
  ARRAY['/products/table-1.svg']
),
(
  'Luminária Orbit',
  'luminaria-orbit',
  'Luminária pendente com design moderno e LED integrado.',
  249.0,
  199.0,
  ARRAY['/products/lamp-1.svg', '/products/lamp-2.svg']
);

-- Insert dummy data for categories
insert into categories (name, slug) values
('Móveis', 'moveis'),
('Iluminação', 'iluminacao'),
('Decoração', 'decoracao'),
('Organização', 'organizacao');
