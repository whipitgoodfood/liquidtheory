import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <article className="border rounded-xl p-4">
      <h3 className="text-lg font-medium">
        <Link href={`/recipes/${recipe.slug}`} className="underline">{recipe.title}</Link>
      </h3>
      {recipe.description && <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>}
    </article>
  );
}
