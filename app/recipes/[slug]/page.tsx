import { supabaseServer } from "@/lib/supabaseServer";
import Recipe from "@/components/Recipe";
import { amazonLink } from "@/lib/affiliate";

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const sb = supabaseServer();
  const { data: recipe } = await sb
    .from("recipes")
    .select(`
      id, title, description, hero_image_url, prep_minutes, cook_minutes, servings,
      instructions (step_number, text),
      recipe_ingredients (quantity, note, position, ingredients(name))
    `)
    .eq("slug", params.slug)
    .maybeSingle();

  if (!recipe) return <div className="p-8">Not found</div>;

  const ingredients = (recipe.recipe_ingredients || [])
    .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
    .map((ri: any) => ({ name: ri.ingredients.name, quantity: ri.quantity, note: ri.note }));

  const steps = (recipe.instructions || [])
    .sort((a: any, b: any) => a.step_number - b.step_number)
    .map((s: any) => s.text);

  return (
    <main className="container mx-auto px-4 py-8">
      <Recipe
        title={recipe.title}
        description={recipe.description}
        heroImageUrl={recipe.hero_image_url}
        servings={recipe.servings}
        prepMinutes={recipe.prep_minutes}
        cookMinutes={recipe.cook_minutes}
        ingredients={ingredients}
        steps={steps}
        tools={[
          { label: "Cocktail Shaker", amazonKeywords: "cocktail shaker set" },
          { label: "Hawthorne Strainer", amazonKeywords: "hawthorne strainer" }
        ]}
        affiliateLink={(opts) => amazonLink({ ...opts, tag: process.env.NEXT_PUBLIC_AMAZON_ASSOC_TAG })}
      />
    </main>
  );
}
