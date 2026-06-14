import { Check } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Service } from "@/types/database";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <TiltCard className="h-full" backgroundImage="/service-card-bg.png">
      <div className="bg-primary/10 ring-primary/20 mb-5 flex size-12 items-center justify-center rounded-xl ring-1">
        <DynamicIcon name={service.icon} className="text-primary size-6" />
      </div>
      <h3 className="text-xl font-semibold">{service.title}</h3>
      {service.description && (
        <p className="text-muted mt-2 text-sm leading-relaxed">
          {service.description}
        </p>
      )}
      {service.features?.length > 0 && (
        <ul className="mt-5 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/80">
              <Check className="text-accent size-4 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </TiltCard>
  );
}
