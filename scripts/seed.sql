insert into public.tags (name) values
  ('classic'), ('whiskey'), ('gin'), ('citrus'), ('summer')
on conflict (name) do nothing;

with ing as (
  insert into public.ingredients (name) values
    ('Bourbon'), ('Simple Syrup'), ('Angostura Bitters'), ('Orange Peel'),
    ('Gin'), ('Lime Juice'), ('Soda Water'),
    ('Tequila Blanco'), ('Triple Sec'), ('Salt')
  on conflict do nothing
  returning id, name
)
select * from ing;

insert into public.recipes (slug, title, description, hero_image_url, prep_minutes, servings, published)
values ('old-fashioned', 'Old Fashioned', 'Bourbon, sugar, bitters. Stirred and aromatic.', null, 2, 1, true)
returning id \gset

insert into public.instructions (recipe_id, step_number, text) values
  (:'id', 1, 'Add 2 oz bourbon, 0.25 oz simple syrup, and 2 dashes Angostura bitters to a mixing glass with ice.'),
  (:'id', 2, 'Stir until chilled.'),
  (:'id', 3, 'Strain over a large cube in a rocks glass.'),
  (:'id', 4, 'Express an orange peel over the drink and garnish.');

insert into public.recipe_tags (recipe_id, tag_id)
select :'id', t.id from public.tags t where t.name in ('classic','whiskey');

insert into public.recipe_ingredients (recipe_id, ingredient_id, quantity, position)
select :'id', i.id, q.qty, q.pos
from public.ingredients i
join (values
  ('Bourbon','2 oz',1),
  ('Simple Syrup','0.25 oz',2),
  ('Angostura Bitters','2 dashes',3),
  ('Orange Peel', null, 4)
) as q(name, qty, pos) on q.name = i.name;

insert into public.recipes (slug, title, description, prep_minutes, servings, published)
values ('gin-rickey', 'Gin Rickey', 'Dry, fizzy gin highball with lime.', 2, 1, true)
returning id \gset

insert into public.instructions (recipe_id, step_number, text) values
  (:'id', 1, 'Build 2 oz gin and 0.75 oz lime juice in a highball with ice.'),
  (:'id', 2, 'Top with soda water and gently stir.');

insert into public.recipe_tags (recipe_id, tag_id)
select :'id', t.id from public.tags t where t.name in ('classic','gin','summer');

insert into public.recipes (slug, title, description, prep_minutes, servings, published)
values ('classic-margarita', 'Classic Margarita', 'Balanced sour on the rocks with salt rim.', 3, 1, true)
returning id \gset

insert into public.instructions (recipe_id, step_number, text) values
  (:'id', 1, 'Shake 2 oz tequila, 1 oz triple sec, 1 oz lime with ice.'),
  (:'id', 2, 'Strain over fresh ice in a salt-rimmed rocks glass.');

insert into public.recipe_tags (recipe_id, tag_id)
select :'id', t.id from public.tags t where t.name in ('classic','citrus');
