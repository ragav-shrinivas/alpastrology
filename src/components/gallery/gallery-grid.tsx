"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/database";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active);

  if (!items.length) {
    return (
      <p className="text-muted border-border bg-surface/40 rounded-2xl border border-dashed p-12 text-center">
        Gallery media will appear here once uploaded in Admin.
      </p>
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === c
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted hover:border-primary/50 hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group border-border relative break-inside-avoid overflow-hidden rounded-2xl border"
            >
              {item.type === "video" ? (
                <div className="relative aspect-video">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title ?? "Video"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-radial-glow absolute inset-0" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <PlayCircle className="text-white size-12" />
                  </div>
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={item.title ?? "Gallery image"}
                  width={600}
                  height={800}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {item.title && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                  {item.title}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
