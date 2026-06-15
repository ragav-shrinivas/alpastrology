"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type MediaRow = {
  id: string;
  url: string;
  title: string | null;
  folder: string | null;
  created_at: string;
};

const FOLDERS = [
  "All",
  "Hero Images",
  "Consultants",
  "Courses",
  "Gallery",
  "Events",
  "Blog",
  "General Assets",
];

export function MediaLibrary({
  folder,
  onPick,
  onClose,
}: {
  folder?: string;
  onPick: (url: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>(folder ?? "All");
  const [q, setQ] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("media")
      .select("id,url,title,folder,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as MediaRow[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (active === "All" || m.folder === active) &&
          (!q || (m.title ?? "").toLowerCase().includes(q.toLowerCase())),
      ),
    [items, active, q],
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0e1330] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <h3 className="font-cinzel text-lg">Media Library</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5">
            <Search className="size-4 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search assets…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside className="w-44 shrink-0 space-y-1 overflow-y-auto border-r border-white/10 p-3">
            {FOLDERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                  active === f
                    ? "bg-[#e8b54a] text-[#1a1430]"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </aside>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <p className="text-center text-sm text-white/50">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="mt-10 text-center text-sm text-white/50">
                No assets here yet. Upload one with the Upload button.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {filtered.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onPick(m.url)}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-[#e8b54a]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.url}
                      alt={m.title ?? ""}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
