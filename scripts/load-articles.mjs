// Reproducible loader for the original ALP Astrology articles.
// Verbatim titles + full bodies extracted from the original site
// (alpastrology.co.in/articles_view.php) into supabase/data/articles.json.
//
// Usage (requires the service role key, which bypasses RLS):
//   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/load-articles.mjs
//
// It clears the blogs table and reinserts every article.
import fs from "fs";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://mdkpubknjwacszrpkogj.supabase.co";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!key) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY in the environment.");
  process.exit(1);
}

const arts = JSON.parse(
  fs.readFileSync(new URL("../supabase/data/articles.json", import.meta.url)),
);
const now = Date.now();
const rows = arts.map((a, i) => ({
  ...a,
  published_at: new Date(now - i * 3600 * 1000).toISOString(),
}));

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};

// Clear existing blogs
await fetch(`${url}/rest/v1/blogs?id=not.is.null`, {
  method: "DELETE",
  headers,
});

for (let i = 0; i < rows.length; i += 20) {
  const batch = rows.slice(i, i + 20);
  const res = await fetch(`${url}/rest/v1/blogs`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify(batch),
  });
  if (!res.ok) {
    console.error("ERROR at batch", i, res.status, await res.text());
    process.exit(1);
  }
  console.log("inserted", i + batch.length, "/", rows.length);
}
console.log("DONE — loaded", rows.length, "articles");
