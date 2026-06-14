import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type TableName = keyof Database["public"]["Tables"];

/** Counts for the admin dashboard overview. */
export async function getDashboardStats() {
  const supabase = await createClient();
  const tables = [
    "pages",
    "courses",
    "consultants",
    "services",
    "blogs",
    "events",
    "gallery",
    "testimonials",
    "faq",
  ] as const;

  const counts: Record<string, number> = {};
  await Promise.all(
    tables.map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      counts[t] = count ?? 0;
    }),
  );

  const { count: newContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");
  counts.contacts_new = newContacts ?? 0;

  return counts;
}

/** Generic list fetch (admin sees all rows, including drafts). */
export async function adminList<T = unknown>(
  table: TableName,
  orderBy = "position",
  ascending = true,
): Promise<T[]> {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = supabase.from(table) as any;
  const { data } = await from.select("*").order(orderBy, { ascending });
  return (data ?? []) as T[];
}

export async function adminGet<T = unknown>(
  table: TableName,
  id: string,
): Promise<T | null> {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = supabase.from(table) as any;
  const { data } = await from.select("*").eq("id", id).maybeSingle();
  return (data as T) ?? null;
}
