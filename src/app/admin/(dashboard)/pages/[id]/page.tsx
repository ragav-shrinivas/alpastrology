import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageBuilder } from "@/components/admin/page-builder";
import type { Page, Section } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function PageBuilderRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!page) notFound();

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", id)
    .order("position");

  return (
    <div>
      <Link
        href="/admin/pages"
        className="text-muted hover:text-primary mb-6 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" /> All pages
      </Link>
      <PageBuilder page={page as Page} sections={(sections ?? []) as Section[]} />
    </div>
  );
}
