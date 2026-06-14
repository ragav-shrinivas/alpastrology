"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium glass card: 3D tilt, cursor-following golden glow, subtle magnetic
 * pull, and an optional background image. Pointer-driven (degrades gracefully
 * on touch / reduced-motion).
 */
export function TiltCard({
  children,
  className,
  backgroundImage,
}: {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [9, -9]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-9, 9]), {
    stiffness: 200,
    damping: 20,
  });
  // Magnetic pull
  const tx = useSpring(useTransform(x, [0, 1], [-6, 6]), {
    stiffness: 180,
    damping: 18,
  });
  const ty = useSpring(useTransform(y, [0, 1], [-6, 6]), {
    stiffness: 180,
    damping: 18,
  });
  const glowX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(y, [0, 1], ["0%", "100%"]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, x: tx, y: ty, transformPerspective: 900 }}
      className={cn(
        "card-glow group glass-gold relative overflow-hidden rounded-2xl p-6 [transform-style:preserve-3d]",
        className,
      )}
    >
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 -z-[1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          />
          <div className="from-surface/80 to-surface/40 absolute inset-0 bg-gradient-to-b" />
        </div>
      )}

      {/* gold ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-[rgba(232,181,74,0.4)] transition-opacity duration-300 group-hover:opacity-100" />

      {/* cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(300px circle at ${gx} ${gy}, rgba(232,181,74,0.2), transparent 65%)`,
          ),
        }}
      />
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
