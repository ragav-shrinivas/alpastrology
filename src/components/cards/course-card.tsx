import Link from "next/link";
import { Clock, Globe, ArrowRight } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { Badge } from "@/components/ui/badge";
import { EditableImage } from "@/components/editor/editable-image";
import type { Course } from "@/types/database";

export function CourseCard({ course }: { course: Course }) {
  return (
    <TiltCard className="flex h-full flex-col p-0">
      <div className="from-primary/20 to-secondary/20 relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-br">
        {!course.image_url && <div className="bg-radial-glow absolute inset-0" />}
        <EditableImage
          target={{ table: "courses", rowId: course.id, column: "image_url" }}
          url={course.image_url}
          alt={course.title}
          folder="Courses"
          fill
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        {course.level && (
          <Badge className="absolute top-3 left-3 capitalize">
            {course.level}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        {course.description && (
          <p className="text-muted mt-2 line-clamp-3 text-sm leading-relaxed">
            {course.description}
          </p>
        )}
        <div className="text-muted mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {course.duration}
            </span>
          )}
          {course.languages?.length > 0 && (
            <span className="flex items-center gap-1">
              <Globe className="size-3.5" /> {course.languages.join(", ")}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-accent font-semibold">
            {course.price || "Enquire"}
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="text-primary hover:text-primary-300 flex items-center gap-1 text-sm font-medium"
          >
            Details <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
