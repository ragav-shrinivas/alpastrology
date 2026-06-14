"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EditableText } from "@/components/editor/editable-text";

type Btn = { label: string; href: string; variant?: "primary" | "secondary" };

export function HeroSection({
  content,
  sectionId,
}: {
  content: { title?: string; subtitle?: string; buttons?: Btn[] };
  sectionId: string;
}) {
  const buttons = content.buttons ?? [];
  const ref = useRef<HTMLElement>(null);

  // Scroll-driven: chakra zooms + fades into the stars on exit.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const chakraScale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const chakraOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse parallax for the chakra.
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  function onMove(e: React.PointerEvent) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    px.set((e.clientX / w - 0.5) * 40);
    py.set((e.clientY / h - 0.5) * 40);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Blended hero background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-[1]">
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          className="object-cover opacity-35 mix-blend-screen"
        />
        <div className="from-background via-background/30 absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="from-background absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
      </motion.div>

      {/* Divine rotating chakra */}
      <motion.div
        style={{ scale: chakraScale, opacity: chakraOpacity, x: px, y: py }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="animate-spin-slow">
          <div className="animate-breathe">
            <Image
              src="/hero-chakra.png"
              alt="ALP Astrology Chakra"
              width={680}
              height={680}
              priority
              className="animate-pulse-glow h-auto w-[78vw] max-w-[680px] opacity-90"
            />
          </div>
        </div>
      </motion.div>

      {/* Readability scrim behind the headline */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 58% 46% at 50% 54%, rgba(7,10,28,0.8) 0%, rgba(7,10,28,0.45) 45%, transparent 76%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-px relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cinzel border-primary/30 bg-primary/10 text-primary-300 mb-6 inline-block rounded-full border px-5 py-2 text-sm tracking-[0.25em] uppercase"
        >
          Akshaya Lagna Paddhati
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <EditableText
            as="span"
            className="text-gradient"
            sectionId={sectionId}
            path="title"
            value={content.title ?? ""}
          />
        </motion.h1>

        {content.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-muted mx-auto mt-6 max-w-2xl text-base text-pretty md:text-lg"
          >
            <EditableText
              as="span"
              sectionId={sectionId}
              path="subtitle"
              value={content.subtitle}
            />
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {buttons.map((b) => (
            <MagneticButton key={b.label} href={b.href} variant={b.variant ?? "primary"}>
              {b.label}
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="text-primary-300/70 absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
