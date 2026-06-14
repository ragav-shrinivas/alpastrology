"use client";

import { useEditor } from "@/lib/editor/store";
import { saveSectionField } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/** Rich-HTML editable region (for `legal` section bodies). Edits innerHTML. */
export function EditableHtml({
  sectionId,
  path = "body",
  html,
  className,
}: {
  sectionId: string;
  path?: string;
  html: string;
  className?: string;
}) {
  const active = useEditor((s) => s.editing && s.isStaff);

  if (!active) {
    return (
      <article
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <article
      className={cn("alp-editable", className)}
      contentEditable
      suppressContentEditableWarning
      onBlur={async (e) => {
        const { startSave, endSave } = useEditor.getState();
        startSave();
        const res = await saveSectionField(
          sectionId,
          path,
          e.currentTarget.innerHTML,
        );
        endSave();
        if (res?.ok) toast.success("Saved", { duration: 700 });
        else toast.error(res?.error || "Save failed");
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
