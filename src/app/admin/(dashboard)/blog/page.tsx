import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "post-slug" },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Content (HTML)", type: "richtext" },
  { name: "featured_image", label: "Featured Image", type: "image" },
  { name: "author", label: "Author", type: "text" },
  { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  { name: "published_at", label: "Publish Date (ISO)", type: "text" },
  { name: "meta_title", label: "Meta Title", type: "text" },
  { name: "meta_description", label: "Meta Description", type: "textarea" },
];

export default async function AdminBlog() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ResourceManager
      table="blogs"
      title="Blog"
      singular="post"
      titleField="title"
      fields={fields}
      reorderable={false}
      items={(data ?? []) as Record<string, unknown>[]}
    />
  );
}
