import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-primary mb-3 inline-block text-xs font-semibold tracking-[0.25em] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted mt-4 text-base leading-relaxed text-pretty md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
