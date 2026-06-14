"use client";

import { useRef } from "react";
import { useEditor } from "@/lib/editor/store";
import { saveSectionField, saveCollectionField } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type Tag = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "li";
type TableName = keyof Database["public"]["Tables"];

type Source =
  | { sectionId: string; path: string } // page-builder section JSON
  | { table: TableName; rowId: string; column: string }; // collection row

type Props = Source & {
  value: string;
  as?: Tag;
  className?: string;
};

export function EditableText({ value, as = "span", className, ...src }: Props) {
  const active = useEditor((s) => s.editing && s.isStaff);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = as as any;

  if (!active) {
    return <Comp className={className}>{value}</Comp>;
  }

  const persist = (text: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const { startSave, endSave } = useEditor.getState();
      startSave();
      const res =
        "sectionId" in src
          ? await saveSectionField(src.sectionId, src.path, text)
          : await saveCollectionField(src.table, src.rowId, src.column, text);
      endSave();
      if (!res?.ok) toast.error(res?.error || "Save failed");
    }, 600);
  };

  return (
    <Comp
      className={cn("alp-editable", className)}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onClick={(e: React.MouseEvent) => e.preventDefault()}
      onInput={(e: React.FormEvent<HTMLElement>) =>
        persist(e.currentTarget.textContent ?? "")
      }
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        clearTimeout(timer.current);
        const { startSave, endSave } = useEditor.getState();
        const text = e.currentTarget.textContent ?? "";
        startSave();
        const p =
          "sectionId" in src
            ? saveSectionField(src.sectionId, src.path, text)
            : saveCollectionField(src.table, src.rowId, src.column, text);
        Promise.resolve(p).then((res) => {
          endSave();
          if (res?.ok) toast.success("Saved", { duration: 700 });
          else toast.error(res?.error || "Save failed");
        });
      }}
    >
      {value}
    </Comp>
  );
}
