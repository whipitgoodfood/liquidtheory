export function amazonLink(params: { asin?: string; keywords?: string; tag?: string }) {
  const tag = params.tag || process.env.NEXT_PUBLIC_AMAZON_ASSOC_TAG || "";
  if (params.asin) return `https://www.amazon.com/dp/${params.asin}?tag=${encodeURIComponent(tag)}`;
  if (params.keywords) return `https://www.amazon.com/s?k=${encodeURIComponent(params.keywords)}&tag=${encodeURIComponent(tag)}`;
  return `https://www.amazon.com/?tag=${encodeURIComponent(tag)}`;
}
