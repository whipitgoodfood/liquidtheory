# Liquid Theory — Next.js + Supabase + Vercel Starter

## Quick start
1. Copy `.env.example` to `.env.local` and fill values.
2. In Supabase, create a project and Storage bucket named `images` (public).
3. Run SQL in `supabase/schema.sql` then `supabase/policies.sql`.
4. Seed with `scripts/seed.sql` (SQL Editor) or paste a few recipes in the Admin later.
5. `npm i` then `npm run dev`.
6. Push to GitHub, import on Vercel, add env vars, deploy.
7. Point `liquidtheory.co` at Vercel.

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE` (server only)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4)
- `NEXT_PUBLIC_AMAZON_ASSOC_TAG` (set to `gdb25-20` already in `.env.example`)
- `OPENAI_API_KEY` (server only)

## Admin
- Sign up via Supabase Auth in the app, then mark yourself admin:
```sql
insert into public.profiles (id, role, display_name) values ('<auth_user_id>', 'admin', 'Ricky');
```
