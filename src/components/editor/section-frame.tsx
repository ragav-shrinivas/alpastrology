"use client";

import { useRouter } from "next/navigation";
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEditor } from "@/lib/editor/store";
import {
  reorderSections,
  duplicateSection,
  deleteSection,
  updateSection,
} from "@/app/admin/actions";
import { toast } from "sonner";

export function SectionFrame({
  sectionId,
  isVisible,
  siblingIds,
  children,
}: {
  sectionId: string;
  isVisible: boolean;
  siblingIds: string[];
  children: React.ReactNode;
}) {
  const active = useEditor((s) => s.editing && s.isStaff);
  const router = useRouter();

  if (!active) return <>{children}</>;

  const run = async (p: Promise<{ ok: boolean; error?: string }>, msg: string) => {
    useEditor.getState().startSave();
    const res = await p;
    useEditor.getState().endSave();
    if (res?.ok) {
      toast.success(msg, { duration: 800 });
      router.refresh();
    } else {
      toast.error(res?.error || "Action failed");
    }
  };

  const move = (dir: -1 | 1) => {
    const i = siblingIds.indexOf(sectionId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= siblingIds.length) return;
    const next = [...siblingIds];
    [next[i], next[j]] = [next[j], next[i]];
    run(reorderSections(next), "Reordered");
  };

  return (
    <div
      data-alp-section
      className={`group/sec relative ${isVisible ? "" : "opacity-50"}`}
    >
      <div className="pointer-events-none absolute right-3 top-3 z-40 flex gap-1 opacity-0 transition-opacity group-hover/sec:opacity-100">
        <FrameBtn title="Move up" onClick={() => move(-1)}>
          <ChevronUp className="size-4" />
        </FrameBtn>
        <FrameBtn title="Move down" onClick={() => move(1)}>
          <ChevronDown className="size-4" />
        </FrameBtn>
        <FrameBtn
          title={isVisible ? "Hide section" : "Show section"}
          onClick={() =>
            run(
              updateSection(sectionId, { is_visible: !isVisible }),
              isVisible ? "Hidden" : "Shown",
            )
          }
        >
          {isVisible ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </FrameBtn>
        <FrameBtn
          title="Duplicate"
          onClick={() => run(duplicateSection(sectionId), "Duplicated")}
        >
          <Copy className="size-4" />
        </FrameBtn>
        <FrameBtn
          title="Delete section"
          danger
          onClick={() => {
            if (confirm("Delete this section?"))
              run(deleteSection(sectionId), "Deleted");
          }}
        >
          <Trash2 className="size-4" />
        </FrameBtn>
      </div>
      {children}
    </div>
  );
}

function FrameBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`pointer-events-auto flex size-8 items-center justify-center rounded-lg border backdrop-blur-md transition-colors ${
        danger
          ? "border-red-500/40 bg-red-950/70 text-red-300 hover:bg-red-900"
          : "border-white/15 bg-black/70 text-white hover:bg-black"
      }`}
    >
      {children}
    </button>
  );
}
