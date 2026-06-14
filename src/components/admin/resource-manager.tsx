"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { upsertRecord, deleteRecord, reorderRecords } from "@/app/admin/actions";
import type { Database } from "@/types/database";

type TableName = keyof Database["public"]["Tables"];

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "url"
  | "image"
  | "pdf"
  | "tags"
  | "lines"
  | "select"
  | "switch";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  fullWidth?: boolean;
};

type Row = Record<string, unknown>;

export function ResourceManager({
  table,
  title,
  singular,
  fields,
  items: initialItems,
  titleField = "title",
  reorderable = true,
}: {
  table: TableName;
  title: string;
  singular: string;
  fields: FieldDef[];
  items: Row[];
  titleField?: string;
  reorderable?: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<Row[]>(initialItems);
  const [editing, setEditing] = useState<Row | null>(null);
  const [, startTransition] = useTransition();

  function refresh() {
    router.refresh();
  }

  function emptyDraft(): Row {
    const d: Row = {};
    for (const f of fields) {
      d[f.name] =
        f.type === "tags" || f.type === "lines"
          ? []
          : f.type === "switch"
            ? true
            : f.type === "number"
              ? 0
              : f.type === "select"
                ? (f.options?.[0] ?? "")
                : "";
    }
    return d;
  }

  function onDelete(id: string) {
    if (!confirm(`Delete this ${singular}?`)) return;
    startTransition(async () => {
      const res = await deleteRecord(table, id);
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        toast.success("Deleted");
        refresh();
      } else toast.error(res.error ?? "Failed");
    });
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    startTransition(async () => {
      await reorderRecords(
        table,
        next.map((i) => i.id as string),
      );
      toast.success("Order saved");
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="text-muted mt-1 text-sm">
            {items.length} {items.length === 1 ? singular : `${singular}s`}
          </p>
        </div>
        <Button onClick={() => setEditing(emptyDraft())}>
          <Plus className="size-4" /> Add {singular}
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {items.map((item, i) => (
          <div
            key={(item.id as string) ?? i}
            className="border-border bg-surface flex items-center gap-3 rounded-xl border p-4"
          >
            {reorderable && (
              <div className="flex flex-col">
                <button
                  onClick={() => move(i, -1)}
                  className="text-muted hover:text-white"
                  aria-label="Move up"
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  className="text-muted hover:text-white"
                  aria-label="Move down"
                >
                  <ArrowDown className="size-4" />
                </button>
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium">
                {(item[titleField] as string) || `Untitled ${singular}`}
              </p>
              {"status" in item && (
                <Badge
                  variant={item.status === "published" ? "default" : "muted"}
                  className="mt-1"
                >
                  {item.status as string}
                </Badge>
              )}
            </div>
            <button
              onClick={() => setEditing(item)}
              className="text-muted hover:text-primary"
              aria-label="Edit"
            >
              <Pencil className="size-4" />
            </button>
            <button
              onClick={() => onDelete(item.id as string)}
              className="text-muted hover:text-secondary-500"
              aria-label="Delete"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-muted border-border rounded-xl border border-dashed p-10 text-center text-sm">
            No {singular}s yet. Click “Add {singular}”.
          </p>
        )}
      </div>

      {editing && (
        <EditDrawer
          table={table}
          singular={singular}
          fields={fields}
          row={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

function EditDrawer({
  table,
  singular,
  fields,
  row,
  onClose,
  onSaved,
}: {
  table: TableName;
  singular: string;
  fields: FieldDef[];
  row: Row;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Row>(() => ({ ...row }));
  const [pending, startTransition] = useTransition();

  function set(name: string, v: unknown) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  function save() {
    const payload: Row = {};
    if (values.id) payload.id = values.id;
    for (const f of fields) {
      const v = values[f.name];
      // Coerce empty strings to null so timestamp/optional columns accept them.
      payload[f.name] = v === "" ? null : (v ?? null);
    }
    startTransition(async () => {
      const res = await upsertRecord(table, payload);
      if (res.ok) {
        toast.success("Saved");
        onSaved();
      } else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border-border h-full w-full max-w-xl overflow-y-auto border-l p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {values.id ? "Edit" : "New"} {singular}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-white">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((f) => (
            <Field
              key={f.name}
              field={f}
              value={values[f.name]}
              onChange={(v) => set(f.name, v)}
            />
          ))}
        </div>

        <div className="mt-8 flex gap-2">
          <Button onClick={save} disabled={pending}>
            <Save className="size-4" /> {pending ? "Saving…" : "Save"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const { type, label, name, placeholder, options } = field;

  if (type === "switch") {
    return (
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-primary size-4"
        />
        <span className="text-sm">{label}</span>
      </label>
    );
  }

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" || type === "richtext" ? (
        <Textarea
          id={name}
          rows={type === "richtext" ? 8 : 3}
          placeholder={placeholder ?? (type === "richtext" ? "<p>HTML content…</p>" : "")}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "select" ? (
        <select
          id={name}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-border bg-surface-2/60 h-11 w-full rounded-xl border px-3 text-sm"
        >
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : type === "tags" || type === "lines" ? (
        <Textarea
          id={name}
          rows={type === "lines" ? 5 : 2}
          placeholder={
            type === "tags" ? "Comma-separated values" : "One item per line"
          }
          value={
            Array.isArray(value)
              ? (value as string[]).join(type === "tags" ? ", " : "\n")
              : ""
          }
          onChange={(e) =>
            onChange(
              e.target.value
                .split(type === "tags" ? "," : "\n")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      ) : type === "number" ? (
        <Input
          id={name}
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      ) : type === "image" || type === "pdf" ? (
        <div className="space-y-2">
          <Input
            id={name}
            placeholder={placeholder ?? "Paste a URL or upload"}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <CloudinaryUpload
            resourceType={type === "pdf" ? "raw" : "image"}
            onUploaded={(url) => onChange(url)}
          />
        </div>
      ) : (
        <Input
          id={name}
          placeholder={placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
