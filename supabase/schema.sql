create extension if not exists "uuid-ossp";

create table if not exists public.recipes (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  author text default 'Liquid Theory',
  hero_image_url text,
  prep_minutes int default 0,
  cook_minutes int default 0,
  servings int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published boolean default true
);

create table if not exists public.ingredients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.recipe_ingredients (
  recipe_id uuid references public.recipes(id) on delete cascade,
  ingredient_id uuid references public.ingredients(id) on delete restrict,
  quantity text,
  note text,
  position int default 0,
  primary key (recipe_id, ingredient_id)
);

create table if not exists public.instructions (
  id uuid primary key default uuid_generate_v4(),
  recipe_id uuid references public.recipes(id) on delete cascade,
  step_number int not null,
  text text not null
);

create table if not exists public.tags (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null
);

create table if not exists public.recipe_tags (
  recipe_id uuid references public.recipes(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (recipe_id, tag_id)
);

create table if not exists public.images (
  id uuid primary key default uuid_generate_v4(),
  recipe_id uuid references public.recipes(id) on delete cascade,
  path text not null,
  alt text,
  position int default 0,
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  role text default 'user' check (role in ('user','admin')),
  display_name text,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists recipes_set_updated_at on public.recipes;
create trigger recipes_set_updated_at before update on public.recipes
for each row execute function public.set_updated_at();
