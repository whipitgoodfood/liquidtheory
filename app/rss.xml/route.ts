import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const sb = supabaseServer();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { data } = await sb
    .from("recipes")
    .select("title, description, slug, updated_at")
    .eq("published", true)
    .order("updated_at", { ascending: false })
    .limit(50);

  const items = (data || []).map((r) => `
    <item>
      <title><![CDATA[${r.title}]]></title>
      <link>${base}/recipes/${r.slug}</link>
      <guid>${base}/recipes/${r.slug}</guid>
      <description><![CDATA[${r.description || ""}]]></description>
      <pubDate>${new Date(r.updated_at).toUTCString()}</pubDate>
    </item>
  `).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Liquid Theory</title>
      <link>${base}</link>
      <description>Cocktails and craft by Liquid Theory</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
