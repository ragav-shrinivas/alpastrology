import Image from "next/image";
import { MessageCircle, Calendar, Globe, Award } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/utils";
import type { Consultant } from "@/types/database";

export function ConsultantCard({ consultant }: { consultant: Consultant }) {
  return (
    <TiltCard className="flex h-full flex-col">
      <div className="flex items-center gap-4">
        <div className="from-primary/30 to-secondary/30 relative size-16 overflow-hidden rounded-full bg-gradient-to-br">
          {consultant.photo_url && (
            <Image
              src={consultant.photo_url}
              alt={consultant.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{consultant.name}</h3>
          {consultant.designation && (
            <p className="text-primary-300 text-sm">{consultant.designation}</p>
          )}
        </div>
      </div>

      {consultant.experience && (
        <p className="text-muted mt-4 flex items-center gap-2 text-sm">
          <Award className="text-accent size-4" /> {consultant.experience}
        </p>
      )}
      {consultant.description && (
        <p className="text-muted mt-2 line-clamp-3 text-sm leading-relaxed">
          {consultant.description}
        </p>
      )}

      {consultant.specialization?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {consultant.specialization.map((s) => (
            <Badge key={s} variant="muted">
              {s}
            </Badge>
          ))}
        </div>
      )}

      {consultant.languages?.length > 0 && (
        <p className="text-muted mt-3 flex items-center gap-2 text-xs">
          <Globe className="size-3.5" /> {consultant.languages.join(", ")}
        </p>
      )}

      <div className="mt-auto flex gap-2 pt-5">
        {consultant.whatsapp && (
          <Button asChild variant="secondary" size="sm" className="flex-1">
            <a
              href={whatsappLink(consultant.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </Button>
        )}
        {consultant.booking_link && (
          <Button asChild size="sm" className="flex-1">
            <a
              href={consultant.booking_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="size-4" /> Book
            </a>
          </Button>
        )}
      </div>
    </TiltCard>
  );
}
