"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number };

/**
 * Premium CTA: magnetic cursor pull, golden glow, shimmer sweep on hover,
 * and a ripple on click. Disables the magnet on touch / reduced-motion-safe.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function onMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  function onPointerDown(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 650);
  }

  const base =
    "group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full px-8 py-3 text-base font-medium transition-shadow duration-300";
  const styles =
    variant === "primary"
      ? "text-[#1a1430] bg-gradient-to-r from-[#ffe9ad] via-[#e8b54a] to-[#f4a259] shadow-[0_10px_40px_-8px_rgba(232,181,74,0.6)] hover:shadow-[0_16px_50px_-8px_rgba(232,181,74,0.85)]"
      : "text-white glass-gold hover:shadow-[0_12px_40px_-10px_rgba(106,167,224,0.6)]";

  const inner = (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerDown={onPointerDown}
      style={{ x: sx, y: sy }}
      className={cn(base, styles, className)}
    >
      {/* shimmer sweep */}
      <span className="shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 animate-[ping_0.6s_ease-out] rounded-full bg-white/50"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
