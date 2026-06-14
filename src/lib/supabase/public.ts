import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Cookieless anon client for reading public (RLS-readable) content.
 * Safe to call during static generation, sitemap, and generateStaticParams
 * where the request-scoped cookie client is unavailable.
 */
let cached: ReturnType<typeof createClient<Database>> | null = null;

export function createPublicClient() {
  if (cached) return cached;
  cached = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return cached;
}
