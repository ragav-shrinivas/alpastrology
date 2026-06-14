"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

type Sign = {
  slug: string;
  name: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  line: string;
};

const SIGNS: Sign[] = [
  { slug: "aries", name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", line: "The spark of beginnings and bold initiative." },
  { slug: "taurus", name: "Taurus", dates: "Apr 20 – May 20", element: "Earth", line: "Grounded strength, patience and devotion." },
  { slug: "gemini", name: "Gemini", dates: "May 21 – Jun 20", element: "Air", line: "Curiosity, duality and the gift of expression." },
  { slug: "cancer", name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", line: "Intuition, nurture and the depths of feeling." },
  { slug: "leo", name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", line: "Radiant courage and the warmth of the sun." },
  { slug: "virgo", name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", line: "Precision, service and quiet mastery." },
  { slug: "libra", name: "Libra", dates: "Sep 23 – Oct 22", element: "Air", line: "Balance, harmony and the art of relationship." },
  { slug: "scorpio", name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", line: "Transformation, depth and hidden power." },
  { slug: "sagittarius", name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", line: "The seeker's arrow toward truth and freedom." },
  { slug: "capricorn", name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", line: "Ambition, discipline and enduring legacy." },
  { slug: "aquarius", name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", line: "Vision, originality and the flow of ideas." },
  { slug: "pisces", name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", line: "Compassion, dreams and cosmic oneness." },
];

const ELEMENT_GLOW: Record<Sign["element"], string> = {
  Fire: "drop-shadow(0 0 50px rgba(244,162,89,0.65))",
  Earth: "drop-shadow(0 0 50px rgba(232,181,74,0.6))",
  Air: "drop-shadow(0 0 50px rgba(106,167,224,0.6))",
  Water: "drop-shadow(0 0 50px rgba(120,140,230,0.6))",
};

export function ZodiacJourney({
  content,
}: {
  content?: { title?: string; description?: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(SIGNS.length - 1, Math.floor(v * SIGNS.length));
    setIndex(i);
  });

  const sign = SIGNS[index];

  return (
    <section ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* heading */}
        <div className="container-px absolute top-[12%] z-10 text-center">
          <span className="text-primary font-cinzel text-xs tracking-[0.3em] uppercase">
            The Twelve Signs
          </span>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl lg:text-5xl">
            {content?.title || "Discover Your Cosmic Blueprint"}
          </h2>
        </div>

        {/* rotating zodiac glyph */}
        <div className="relative flex h-[42vh] w-full items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={sign.slug}
              initial={{ opacity: 0, scale: 0.6, rotate: -25, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.25, rotate: 25, filter: "blur(18px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute"
            >
              <Image
                src={`/zodiac/${sign.slug}.png`}
                alt={sign.name}
                width={300}
                height={300}
                style={{ filter: ELEMENT_GLOW[sign.element] }}
                className="h-[34vh] w-auto"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* sign info */}
        <div className="container-px relative z-10 mt-2 h-28 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={sign.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-cinzel text-3xl tracking-wide md:text-4xl">
                <span className="text-gold">{sign.name}</span>
              </h3>
              <p className="text-secondary-500 mt-1 text-xs tracking-widest uppercase">
                {sign.dates} · {sign.element}
              </p>
              <p className="text-muted mx-auto mt-3 max-w-md text-sm md:text-base">
                {sign.line}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* constellation progress */}
        <div className="absolute bottom-[10%] flex items-center gap-2">
          {SIGNS.map((s, i) => (
            <span
              key={s.slug}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-primary w-6"
                  : i < index
                    ? "bg-primary/50 w-1.5"
                    : "bg-white/15 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
