import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TiltCard } from "./tilt-card";
import type { Testimonial } from "@/types/database";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <TiltCard className="flex h-full flex-col">
      <Quote className="text-primary/40 size-8" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">
        “{item.content}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="from-primary/30 to-secondary/30 relative size-11 overflow-hidden rounded-full bg-gradient-to-br">
          {item.avatar_url && (
            <Image
              src={item.avatar_url}
              alt={item.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          {item.role && <p className="text-muted text-xs">{item.role}</p>}
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
            <Star key={i} className="fill-accent text-accent size-3.5" />
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
