import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "service-slug" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "icon",
    label: "Icon",
    type: "select",
    options: ["sparkles", "graduation-cap", "monitor", "star", "heart", "briefcase", "compass", "moon", "sun", "book-open"],
  },
  { name: "features", label: "Features", type: "lines" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminServices() {
  const items = await adminList("services");
  return (
    <ResourceManager
      table="services"
      title="Services"
      singular="service"
      titleField="title"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
