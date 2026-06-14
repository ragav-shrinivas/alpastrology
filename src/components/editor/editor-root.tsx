"use client";

import { useEffect } from "react";
import { useEditor, DEVICE_WIDTH } from "@/lib/editor/store";
import { EditorBar } from "./editor-bar";

/** Wraps the site for staff: detects the session, toggles Edit Mode body class,
 *  frames the content for tablet/mobile preview, and mounts the editor bar.
 *  For public visitors this is an inert pass-through. */
export function EditorRoot({ children }: { children: React.ReactNode }) {
  const setStaff = useEditor((s) => s.setStaff);
  const isStaff = useEditor((s) => s.isStaff);
  const editing = useEditor((s) => s.editing);
  const device = useEditor((s) => s.device);

  useEffect(() => {
    let alive = true;
    fetch("/api/editor/me")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setStaff(!!d.staff);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [setStaff]);

  useEffect(() => {
    document.body.classList.toggle("alp-editing", editing && isStaff);
    return () => document.body.classList.remove("alp-editing");
  }, [editing, isStaff]);

  const width = editing ? DEVICE_WIDTH[device] : null;

  return (
    <>
      <div
        style={width ? { maxWidth: width } : undefined}
        className={
          width
            ? "mx-auto w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_0_0_100vmax_rgba(3,5,16,.6)] transition-[max-width] duration-300"
            : undefined
        }
      >
        {children}
      </div>
      <EditorBar />
    </>
  );
}
