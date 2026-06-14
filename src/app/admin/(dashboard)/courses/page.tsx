import { adminList } from "@/lib/admin/queries";
import { ResourceManager, type FieldDef } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "course-slug" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "level", label: "Level", type: "select", options: ["basic", "advanced", "master", "other"] },
  { name: "duration", label: "Duration", type: "text" },
  { name: "price", label: "Price", type: "text" },
  { name: "instructor", label: "Instructor", type: "text" },
  { name: "image_url", label: "Image", type: "image" },
  { name: "syllabus", label: "Syllabus (one item per line)", type: "lines" },
  { name: "pdf_url", label: "Syllabus PDF", type: "pdf" },
  { name: "languages", label: "Languages", type: "tags" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft", "archived"] },
];

export default async function AdminCourses() {
  const items = await adminList("courses");
  return (
    <ResourceManager
      table="courses"
      title="Courses"
      singular="course"
      titleField="title"
      fields={fields}
      items={items as Record<string, unknown>[]}
    />
  );
}
