"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabaseBrowser.from("recipes").select("*").order("updated_at", { ascending: false });
      setRecipes(data || []);
    })();
  }, []);

  async function createRecipe() {
    const res = await fetch("/api/recipes", { method: "POST", body: JSON.stringify({ title, slug, description, published }) });
    if (res.ok) {
      const r = await res.json();
      setRecipes([r, ...recipes]);
      setTitle(""); setSlug(""); setDescription(""); setPublished(false);
    } else {
      alert("Error creating recipe");
    }
  }

  return (
    <AdminGuard>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <section className="border rounded-xl p-4">
            <h2 className="font-medium">Create Recipe</h2>
            <div className="space-y-3 mt-3">
              <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
              <input className="border p-2 w-full" placeholder="slug" value={slug} onChange={e=>setSlug(e.target.value)} />
              <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
              <label className="flex items-center gap-2"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} /> Published</label>
              <button onClick={createRecipe} className="border px-4 py-2 rounded">Save</button>
            </div>
          </section>
          <section className="border rounded-xl p-4">
            <h2 className="font-medium">Existing</h2>
            <ul className="mt-3 space-y-2">
              {recipes.map((r) => (
                <li key={r.id} className="flex items-center justify-between">
                  <span>{r.title}</span>
                  <a href={`/recipes/${r.slug}`} className="underline">View</a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </AdminGuard>
  );
}
