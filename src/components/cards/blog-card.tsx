import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "./tilt-card";
import { formatDate, stripHtml } from "@/lib/utils";
import { EditableImage } from "@/components/editor/editable-image";
import type { Blog } from "@/types/database";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full">
      <TiltCard className="flex h-full flex-col p-0">
        <div className="from-secondary/20 to-primary/20 relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-gradient-to-br">
          {!blog.featured_image && (
            <div className="bg-radial-glow absolute inset-0" />
          )}
          <EditableImage
            target={{ table: "blogs", rowId: blog.id, column: "featured_image" }}
            url={blog.featured_image}
            alt={blog.title}
            folder="Blog"
            fill
            imgClassName="transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-muted text-xs">{formatDate(blog.published_at)}</p>
          <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-primary-300">
            {blog.title}
          </h3>
          <p className="text-muted mt-2 line-clamp-3 text-sm leading-relaxed">
            {blog.excerpt || stripHtml(blog.content)}
          </p>
          <span className="text-primary mt-4 flex items-center gap-1 text-sm font-medium">
            Read article <ArrowUpRight className="size-4" />
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}
