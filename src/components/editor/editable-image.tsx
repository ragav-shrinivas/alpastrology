"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, ImageIcon, Trash2, Library, Loader2 } from "lucide-react";
import { useEditor } from "@/lib/editor/store";
import { createClient } from "@/lib/supabase/client";
import {
  saveSectionField,
  saveCollectionField,
  saveSettingValue,
  recordMedia,
} from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Database } from "@/types/database";
import { MediaLibrary } from "./media-library";

type TableName = keyof Database["public"]["Tables"];

export type ImageTarget =
  | { sectionId: string; path: string }
  | { table: TableName; rowId: string; column: string }
  | { settingKey: string };

type Props = {
  target: ImageTarget;
  url?: string | null;
  alt?: string;
  folder?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

const ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml,image/gif";

export function EditableImage({
  target,
  url,
  alt = "",
  folder = "General Assets",
  fill,
  width,
  height,
  sizes,
  className,
  imgClassName,
}: Props) {
  const active = useEditor((s) => s.editing && s.isStaff);
  const [current, setCurrent] = useState<string | null>(url ?? null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const img = current ? (
    fill ? (
      <Image
        src={current}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
    ) : (
      <Image
        src={current}
        alt={alt}
        width={width ?? 400}
        height={height ?? 400}
        className={imgClassName}
      />
    )
  ) : null;

  // ---- non-editing: just the image (or nothing) ----
  if (!active) {
    return img;
  }

  const saveUrl = async (u: string | null) => {
    const { startSave, endSave } = useEditor.getState();
    startSave();
    let res;
    if ("sectionId" in target)
      res = await saveSectionField(target.sectionId, target.path, u);
    else if ("table" in target)
      res = await saveCollectionField(target.table, target.rowId, target.column, u);
    else res = await saveSettingValue(target.settingKey, u ?? "");
    endSave();
    if (!res?.ok) toast.error(res?.error || "Save failed");
    return res?.ok;
  };

  const upload = async (file: File) => {
    if (!ACCEPT.split(",").includes(file.type)) {
      toast.error("Unsupported file type");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "png").toLowerCase();
      const path = `${folder.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        toast.error(error.message);
        setBusy(false);
        return;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(path);
      const ok = await saveUrl(publicUrl);
      if (ok) {
        setCurrent(publicUrl);
        recordMedia({ url: publicUrl, folder, title: file.name, type: "image" });
        toast.success("Image updated", { duration: 900 });
      }
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <>
      <div
        className={cn(
          fill ? "absolute inset-0" : "relative inline-block",
          "group/img",
          className,
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        {img}

        {!current && (
          <div className="bg-radial-glow absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
            <ImageIcon className="size-10" />
            <span className="text-xs">Click to add image</span>
          </div>
        )}

        {/* Hover / drag overlay */}
        <div
          className={cn(
            "absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-black/55 backdrop-blur-[1px] transition-opacity",
            dragOver
              ? "opacity-100 ring-2 ring-[#e8b54a]"
              : "opacity-0 group-hover/img:opacity-100",
          )}
        >
          {busy ? (
            <div className="flex items-center gap-2 text-white">
              <Loader2 className="size-5 animate-spin" /> Uploading…
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 px-2">
              <OverlayBtn onClick={() => inputRef.current?.click()}>
                <Upload className="size-4" /> {current ? "Replace" : "Upload"}
              </OverlayBtn>
              <OverlayBtn onClick={() => setLibOpen(true)}>
                <Library className="size-4" /> Library
              </OverlayBtn>
              {current && (
                <OverlayBtn
                  danger
                  onClick={async () => {
                    if (await saveUrl(null)) setCurrent(null);
                  }}
                >
                  <Trash2 className="size-4" /> Delete
                </OverlayBtn>
              )}
            </div>
          )}
          <p className="px-3 text-center text-[10px] text-white/60">
            or drag &amp; drop an image here
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>

      {libOpen && (
        <MediaLibrary
          folder={folder}
          onClose={() => setLibOpen(false)}
          onPick={async (u) => {
            setLibOpen(false);
            if (await saveUrl(u)) setCurrent(u);
          }}
        />
      )}
    </>
  );
}

function OverlayBtn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors",
        danger
          ? "border-red-400/40 bg-red-950/70 text-red-200 hover:bg-red-900"
          : "border-white/20 bg-white/10 text-white hover:bg-white/20",
      )}
    >
      {children}
    </button>
  );
}
