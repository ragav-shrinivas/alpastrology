import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "question", label: "Question", type: "text" },
  { name: "answer", label: "Answer", type: "textarea" },
  { name: "category", label: "Category", type: "text" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminFaq() {
  const items = await adminList("faq");
  return (
    <ResourceManager
      table="faq"
      title="FAQs"
      singular="FAQ"
      titleField="question"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
