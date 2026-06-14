import {
  Sparkles,
  GraduationCap,
  Monitor,
  Star,
  Heart,
  Briefcase,
  Compass,
  Moon,
  Sun,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "graduation-cap": GraduationCap,
  monitor: Monitor,
  star: Star,
  heart: Heart,
  briefcase: Briefcase,
  compass: Compass,
  moon: Moon,
  sun: Sun,
  "book-open": BookOpen,
};

export function DynamicIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && map[name]) || Sparkles;
  return <Icon className={className} />;
}
