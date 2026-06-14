import Link from "next/link";
import { ArrowRight, FileEdit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { CreatePage } from "@/components/admin/create-page";
import type { Page } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminPagesList() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .order("position");
  const pages = (data ?? []) as Page[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Pages & Builder</h1>
          <p className="text-muted mt-1">
            Compose each page from drag-and-drop sections. Click a page to open
            the builder.
          </p>
        </div>
        <CreatePage />
      </div>

      <div className="mt-8 space-y-3">
        {pages.map((p) => (
          <Link
            key={p.id}
            href={`/admin/pages/${p.id}`}
            className="border-border bg-surface hover:border-primary/50 group flex items-center justify-between rounded-xl border p-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <FileEdit className="size-5" />
              </div>
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-muted text-xs">/{p.slug === "home" ? "" : p.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={p.status === "published" ? "default" : "muted"}>
                {p.status}
              </Badge>
              <ArrowRight className="text-muted group-hover:text-primary size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
