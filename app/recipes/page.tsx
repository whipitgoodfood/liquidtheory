import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function RecipesPage() {
  const sb = supabaseServer();
  const { data } = await sb
    .from("recipes")
    .select("id, slug, title, description, hero_image_url")
    .eq("published", true)
    .order("title");

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">All Recipes</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {(data || []).map((r) => (
          <li key={r.id} className="border rounded-xl p-4">
            <Link href={`/recipes/${r.slug}`} className="font-medium underline">{r.title}</Link>
            <p className="text-sm text-gray-600 mt-1">{r.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
