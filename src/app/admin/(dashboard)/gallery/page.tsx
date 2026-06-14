import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "type", label: "Type", type: "select", options: ["image", "video"] },
  { name: "url", label: "Media URL", type: "image" },
  { name: "thumbnail", label: "Thumbnail (for videos)", type: "image" },
  { name: "category", label: "Category", type: "text" },
  { name: "is_featured", label: "Featured", type: "switch" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminGallery() {
  const items = await adminList("gallery");
  return (
    <ResourceManager
      table="gallery"
      title="Gallery"
      singular="media item"
      titleField="title"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
