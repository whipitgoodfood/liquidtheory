alter table public.recipes enable row level security;
alter table public.ingredients enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.instructions enable row level security;
alter table public.tags enable row level security;
alter table public.recipe_tags enable row level security;
alter table public.images enable row level security;
alter table public.profiles enable row level security;

create policy "Public can read published recipes" on public.recipes for select using (published = true);
create policy "Public can read instructions" on public.instructions for select using (true);
create policy "Public can read recipe_ingredients" on public.recipe_ingredients for select using (true);
create policy "Public can read ingredients" on public.ingredients for select using (true);
create policy "Public can read tags" on public.tags for select using (true);
create policy "Public can read recipe_tags" on public.recipe_tags for select using (true);
create policy "Public can read images" on public.images for select using (true);

create policy "Admins recipes all" on public.recipes for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins ingredients all" on public.ingredients for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins recipe_ingredients all" on public.recipe_ingredients for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins instructions all" on public.instructions for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins tags all" on public.tags for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins recipe_tags all" on public.recipe_tags for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins images all" on public.images for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Users read own profile" on public.profiles for select using (id = auth.uid());
create policy "Admins read all profiles" on public.profiles for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Users update own profile" on public.profiles for update using (id = auth.uid());
