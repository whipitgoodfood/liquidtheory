type Ingredient = { name: string; quantity?: string | null; note?: string | null };
type RecipeProps = {
  title: string;
  description?: string | null;
  heroImageUrl?: string | null;
  servings?: number | null;
  prepMinutes?: number | null;
  cookMinutes?: number | null;
  ingredients: Ingredient[];
  steps: string[];
  tools?: { label: string; amazonKeywords?: string; asin?: string }[];
  affiliateLink?: (opts: { asin?: string; keywords?: string }) => string;
};

export default function Recipe({
  title, description, heroImageUrl, servings, prepMinutes, cookMinutes,
  ingredients, steps, tools = [], affiliateLink
}: RecipeProps) {
  return (
    <article className="prose max-w-none">
      <header>
        <h1 className="mb-2">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
        <div className="text-sm mt-2">
          {servings ? <span>Servings: {servings}</span> : null}
          {prepMinutes ? <span className="ml-3">Prep: {prepMinutes} min</span> : null}
          {cookMinutes ? <span className="ml-3">Cook: {cookMinutes} min</span> : null}
        </div>
        {heroImageUrl && <img src={heroImageUrl} alt={title} className="rounded-xl mt-4 w-full h-auto" />}
      </header>

      <section className="mt-6">
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>
              {ing.quantity ? `${ing.quantity} ` : ""}{ing.name}{ing.note ? ` (${ing.note})` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2>Steps</h2>
        <ol>{steps.map((s, i) => (<li key={i}>{s}</li>))}</ol>
      </section>

      {tools.length > 0 && affiliateLink && (
        <section className="mt-6">
          <h2>Tools</h2>
          <ul>
            {tools.map((t, i) => {
              const href = t.asin ? affiliateLink({ asin: t.asin }) : affiliateLink({ keywords: t.amazonKeywords || t.label });
              return <li key={i}><a href={href} rel="nofollow sponsored noopener" target="_blank">{t.label}</a></li>;
            })}
          </ul>
          <p className="text-xs text-gray-500 mt-2">As an Amazon Associate, Liquid Theory earns from qualifying purchases.</p>
        </section>
      )}
    </article>
  );
}
