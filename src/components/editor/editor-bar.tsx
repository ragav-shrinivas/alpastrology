"use client";

import Link from "next/link";
import Image from "next/image";
import { Monitor, Tablet, Smartphone, Check, Loader2, LayoutDashboard } from "lucide-react";
import { useEditor, type Device } from "@/lib/editor/store";

const DEVICES: { id: Device; icon: React.ReactNode; label: string }[] = [
  { id: "desktop", icon: <Monitor className="size-4" />, label: "Desktop" },
  { id: "tablet", icon: <Tablet className="size-4" />, label: "Tablet" },
  { id: "mobile", icon: <Smartphone className="size-4" />, label: "Mobile" },
];

export function EditorBar() {
  const isStaff = useEditor((s) => s.isStaff);
  const editing = useEditor((s) => s.editing);
  const device = useEditor((s) => s.device);
  const saving = useEditor((s) => s.saving);
  const setEditing = useEditor((s) => s.setEditing);
  const setDevice = useEditor((s) => s.setDevice);

  if (!isStaff) return null;

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        aria-label="Site management"
        title="Site management"
        className="fixed bottom-3 right-3 z-[100] flex size-9 items-center justify-center rounded-full opacity-25 transition-opacity duration-300 hover:opacity-70"
      >
        <Image src="/evo9.png" alt="" width={28} height={28} className="object-contain" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#0e1330]/95 px-3 py-2 text-white shadow-[0_10px_40px_-8px_rgba(0,0,0,.7)] backdrop-blur-md">
      <span className="px-2 text-xs font-semibold tracking-wide text-[#ffe9ad]">
        EDIT MODE
      </span>
      <div className="flex items-center gap-0.5 rounded-full bg-black/40 p-0.5">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            title={d.label}
            onClick={() => setDevice(d.id)}
            className={`flex size-8 items-center justify-center rounded-full transition-colors ${
              device === d.id
                ? "bg-[#e8b54a] text-[#1a1430]"
                : "text-white/70 hover:text-white"
            }`}
          >
            {d.icon}
          </button>
        ))}
      </div>

      <span className="flex w-20 items-center justify-center gap-1.5 text-xs text-white/70">
        {saving > 0 ? (
          <>
            <Loader2 className="size-3.5 animate-spin" /> Saving…
          </>
        ) : (
          <>
            <Check className="size-3.5 text-emerald-400" /> Saved
          </>
        )}
      </span>

      <Link
        href="/admin"
        title="Full dashboard"
        className="flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
      >
        <LayoutDashboard className="size-4" />
      </Link>
      <button
        onClick={() => setEditing(false)}
        className="rounded-full bg-[#e8b54a] px-4 py-1.5 text-sm font-semibold text-[#1a1430] transition hover:bg-[#ffe9ad]"
      >
        Done
      </button>
    </div>
  );
}
