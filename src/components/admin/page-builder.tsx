"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import {
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ChevronDown,
  Plus,
  Save,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  addSection,
  updateSection,
  duplicateSection,
  deleteSection,
  reorderSections,
  updatePage,
} from "@/app/admin/actions";
import type { Page, Section } from "@/types/database";

const SECTION_TYPES = [
  "hero",
  "zodiac_journey",
  "page_header",
  "who_we_are",
  "about_alp",
  "mission",
  "consultation",
  "video",
  "founder",
  "services",
  "courses",
  "consultants",
  "events",
  "blog",
  "testimonials",
  "cta",
  "legal",
];

export function PageBuilder({
  page,
  sections: initial,
}: {
  page: Page;
  sections: Section[];
}) {
  const router = useRouter();
  const [sections, setSections] = useState(initial);
  const [, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function refresh() {
    router.refresh();
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const next = arrayMove(sections, oldIndex, newIndex);
    setSections(next);
    startTransition(async () => {
      await reorderSections(next.map((s) => s.id));
      toast.success("Order saved");
    });
  }

  function onAdd(type: string) {
    startTransition(async () => {
      const res = await addSection(page.id, type, type);
      if (res.ok) {
        toast.success("Section added");
        refresh();
      } else toast.error(res.error ?? "Failed");
    });
  }

  async function togglePublish() {
    const next = page.status === "published" ? "draft" : "published";
    const res = await updatePage(page.id, { status: next });
    if (res.ok) {
      toast.success(`Page ${next}`);
      refresh();
    } else toast.error(res.error ?? "Failed");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">{page.title}</h1>
          <p className="text-muted mt-1 text-sm">/{page.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={page.status === "published" ? "default" : "muted"}>
            {page.status}
          </Badge>
          <Button variant="secondary" size="sm" onClick={togglePublish}>
            {page.status === "published" ? "Unpublish" : "Publish"}
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a
              href={`/${page.slug === "home" ? "" : page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" /> Preview
            </a>
          </Button>
        </div>
      </div>

      {/* Add section */}
      <div className="border-border bg-surface mt-6 rounded-xl border p-4">
        <p className="text-muted mb-3 flex items-center gap-2 text-sm">
          <Plus className="size-4" /> Add a section
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTION_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onAdd(t)}
              className="border-border hover:border-primary/60 hover:text-primary rounded-full border px-3 py-1 text-xs transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Sortable list */}
      <div className="mt-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sections.map((s) => (
                <SectionRow key={s.id} section={s} onChanged={refresh} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {sections.length === 0 && (
          <p className="text-muted border-border rounded-xl border border-dashed p-10 text-center text-sm">
            No sections yet. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}

function SectionRow({
  section,
  onChanged,
}: {
  section: Section;
  onChanged: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(section.name ?? section.type);
  const [content, setContent] = useState(
    JSON.stringify(section.content, null, 2),
  );
  const [pending, startTransition] = useTransition();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function save() {
    let parsed;
    try {
      parsed = JSON.parse(content || "{}");
    } catch {
      return toast.error("Content is not valid JSON");
    }
    startTransition(async () => {
      const res = await updateSection(section.id, { content: parsed, name });
      if (res.ok) {
        toast.success("Section saved");
        onChanged();
      } else toast.error(res.error ?? "Failed");
    });
  }

  function act(fn: () => Promise<{ ok: boolean; error?: string }>, msg: string) {
    startTransition(async () => {
      const res = await fn();
      if (res.ok) {
        toast.success(msg);
        onChanged();
      } else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-border bg-surface rounded-xl border"
    >
      <div className="flex items-center gap-3 p-4">
        <button
          {...attributes}
          {...listeners}
          className="text-muted hover:text-white cursor-grab touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="size-5" />
        </button>
        <div className="flex-1">
          <p className="font-medium">{section.name ?? section.type}</p>
          <p className="text-muted text-xs">{section.type}</p>
        </div>
        {!section.is_visible && <Badge variant="muted">hidden</Badge>}
        <button
          onClick={() =>
            act(
              () =>
                updateSection(section.id, { is_visible: !section.is_visible }),
              "Visibility updated",
            )
          }
          className="text-muted hover:text-white"
          title="Toggle visibility"
        >
          {section.is_visible ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </button>
        <button
          onClick={() => act(() => duplicateSection(section.id), "Duplicated")}
          className="text-muted hover:text-white"
          title="Duplicate"
        >
          <Copy className="size-4" />
        </button>
        <button
          onClick={() => {
            if (confirm("Delete this section?"))
              act(() => deleteSection(section.id), "Deleted");
          }}
          className="text-muted hover:text-secondary-500"
          title="Delete"
        >
          <Trash2 className="size-4" />
        </button>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-muted hover:text-white"
          title="Edit content"
        >
          <ChevronDown
            className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {expanded && (
        <div className="border-border space-y-3 border-t p-4">
          <div>
            <label className="text-muted mb-1 block text-xs">Section name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-muted mb-1 block text-xs">
              Content (JSON) — every field here renders on the live site
            </label>
            <Textarea
              rows={12}
              className="font-mono text-xs"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button onClick={save} size="sm" disabled={pending}>
            <Save className="size-4" /> {pending ? "Saving…" : "Save section"}
          </Button>
        </div>
      )}
    </div>
  );
}
