import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful cocktail writer." },
      { role: "user", content: "Write a seasonal cocktail description with ingredients." }
    ],
    temperature: 0.7
  });

  const text = completion.choices[0]?.message?.content?.trim() || "";
  if (!text) return NextResponse.json({ error: "No content" }, { status: 500 });

  const sb = supabaseServer();
  const slug = `draft-${Date.now()}`;
  const { error } = await sb.from("recipes").insert({ slug, title: "Draft: Seasonal Cocktail", description: text, published: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slug });
}
