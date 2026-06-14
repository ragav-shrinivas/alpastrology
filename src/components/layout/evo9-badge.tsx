"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Phase 14 — hidden admin access.
 * A tiny, elegant "EVO9" mark in the footer. Five clicks within a short
 * window navigate to /admin. Visually unobtrusive by design.
 */
export function Evo9Badge() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    if (timer.current) clearTimeout(timer.current);
    const next = count + 1;
    setCount(next);

    if (next >= 5) {
      setCount(0);
      router.push("/admin");
      return;
    }
    // Reset the streak if clicks slow down.
    timer.current = setTimeout(() => setCount(0), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="EVO9"
      title="EVO9"
      className="text-muted/30 hover:text-primary/60 cursor-default text-[10px] font-semibold tracking-[0.3em] transition-colors select-none"
    >
      EVO9
    </button>
  );
}
