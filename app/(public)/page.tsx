import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import RecipeCard from "@/components/RecipeCard";

export default async function HomePage() {
  const sb = supabaseServer();
  const { data: recipes } = await sb
    .from("recipes")
    .select("id, slug, title, description, hero_image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold">Liquid Theory</h1>
      <p className="mt-2 text-gray-600">Cocktails, mocktails, and bar craft.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {(recipes || []).map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
      <div className="mt-8">
        <Link href="/recipes" className="underline">Browse all recipes →</Link>
      </div>
    </main>
  );
}
