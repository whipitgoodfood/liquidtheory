import { supabaseServer } from "@/lib/supabaseServer";

export default async function sitemap() {
  const sb = supabaseServer();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { data } = await sb.from("recipes").select("slug").eq("published", true);
  const recipeEntries = (data || []).map((r) => ({
    url: `${base}/recipes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7
  }));
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/recipes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...recipeEntries
  ];
}
