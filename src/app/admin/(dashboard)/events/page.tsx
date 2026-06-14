import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "event-slug" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "location", label: "Location", type: "text" },
  { name: "event_date", label: "Date (YYYY-MM-DD or ISO)", type: "text" },
  { name: "status", label: "Status", type: "select", options: ["upcoming", "ongoing", "past"] },
  { name: "is_published", label: "Published", type: "switch" },
];

export default async function AdminEvents() {
  const items = await adminList("events");
  return (
    <ResourceManager
      table="events"
      title="Events"
      singular="event"
      titleField="title"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
