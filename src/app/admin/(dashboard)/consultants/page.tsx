import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
  { name: "experience", label: "Experience", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "specialization", label: "Specialization", type: "tags" },
  { name: "languages", label: "Languages", type: "tags" },
  { name: "photo_url", label: "Photo", type: "image" },
  { name: "whatsapp", label: "WhatsApp", type: "text" },
  { name: "booking_link", label: "Booking Link", type: "url" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminConsultants() {
  const items = await adminList("consultants");
  return (
    <ResourceManager
      table="consultants"
      title="Consultants"
      singular="consultant"
      titleField="name"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
