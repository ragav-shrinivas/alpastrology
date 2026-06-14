import Image from "next/image";
import { PlayCircle } from "lucide-react";
import type { GalleryItem } from "@/types/database";

/** Grid of clickable video cards (links out to YouTube). */
export function VideoGrid({ items }: { items: GalleryItem[] }) {
  if (!items.length) {
    return (
      <p className="text-muted border-border bg-surface/40 rounded-2xl border border-dashed p-12 text-center">
        Videos will appear here once added in Admin.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-border bg-surface/40 hover:border-primary/50 relative overflow-hidden rounded-2xl border transition-colors"
        >
          <div className="relative aspect-video">
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title ?? "Video"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="bg-radial-glow absolute inset-0" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
              <PlayCircle className="size-14 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          {item.title && (
            <p className="p-4 text-sm font-medium leading-snug text-white/90">
              {item.title}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}
