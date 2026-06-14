import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/types/database";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <TiltCard className="flex h-full flex-col p-0">
      <div className="from-accent/15 to-primary/15 relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-br">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="bg-radial-glow absolute inset-0" />
        )}
        <Badge
          variant={event.status === "upcoming" ? "accent" : "muted"}
          className="absolute top-3 left-3 capitalize"
        >
          {event.status}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {event.description && (
          <p className="text-muted mt-2 line-clamp-3 text-sm leading-relaxed">
            {event.description}
          </p>
        )}
        <div className="text-muted mt-4 space-y-1.5 text-xs">
          {event.event_date && (
            <p className="flex items-center gap-2">
              <Calendar className="size-3.5" /> {formatDate(event.event_date)}
            </p>
          )}
          {event.location && (
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5" /> {event.location}
            </p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
