import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "content", label: "Testimonial", type: "textarea" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "avatar_url", label: "Avatar", type: "image" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminTestimonials() {
  const items = await adminList("testimonials");
  return (
    <ResourceManager
      table="testimonials"
      title="Testimonials"
      singular="testimonial"
      titleField="name"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
