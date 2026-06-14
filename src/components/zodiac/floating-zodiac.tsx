"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Subtle, slowly drifting zodiac glyphs scattered across a fixed background
 * layer. Each glyph floats gently and parallaxes as the page scrolls.
 * Sits above the cosmic background (-z-10) and behind page content.
 */

type Cfg = {
  sign: string;
  left: string;
  top: string;
  size: number;
  drift: number; // scroll-parallax distance in px
  dur: number; // float loop duration (s)
  rotate: number;
};

const SIGNS: Cfg[] = [
  { sign: "aries", left: "6%", top: "10%", size: 52, drift: -120, dur: 11, rotate: -8 },
  { sign: "taurus", left: "85%", top: "7%", size: 44, drift: 90, dur: 13, rotate: 6 },
  { sign: "gemini", left: "19%", top: "28%", size: 38, drift: -70, dur: 12, rotate: 10 },
  { sign: "cancer", left: "72%", top: "24%", size: 56, drift: 140, dur: 15, rotate: -6 },
  { sign: "leo", left: "45%", top: "15%", size: 42, drift: -100, dur: 12, rotate: 4 },
  { sign: "virgo", left: "90%", top: "43%", size: 48, drift: 110, dur: 16, rotate: -10 },
  { sign: "libra", left: "9%", top: "54%", size: 46, drift: -130, dur: 13, rotate: 8 },
  { sign: "scorpio", left: "61%", top: "58%", size: 40, drift: 80, dur: 12, rotate: -4 },
  { sign: "sagittarius", left: "29%", top: "70%", size: 54, drift: -90, dur: 14, rotate: 6 },
  { sign: "capricorn", left: "83%", top: "73%", size: 42, drift: 120, dur: 13, rotate: -8 },
  { sign: "aquarius", left: "15%", top: "86%", size: 48, drift: -110, dur: 15, rotate: 10 },
  { sign: "pisces", left: "53%", top: "88%", size: 44, drift: 100, dur: 12, rotate: -6 },
];

function FloatingSign({
  cfg,
  progress,
}: {
  cfg: Cfg;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, cfg.drift]);
  return (
    <motion.div
      className="absolute"
      style={{ left: cfg.left, top: cfg.top, y }}
    >
      <motion.div
        animate={{
          y: [0, -16, 0],
          rotate: [cfg.rotate, cfg.rotate + 5, cfg.rotate],
        }}
        transition={{ duration: cfg.dur, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={`/zodiac/${cfg.sign}.png`}
          alt=""
          aria-hidden
          width={cfg.size}
          height={cfg.size}
          className="select-none opacity-[0.10] mix-blend-screen drop-shadow-[0_0_10px_rgba(232,181,74,0.25)]"
          style={{ width: cfg.size, height: "auto" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FloatingZodiac() {
  const { scrollYProgress } = useScroll();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] hidden overflow-hidden sm:block"
    >
      {SIGNS.map((cfg) => (
        <FloatingSign key={cfg.sign} cfg={cfg} progress={scrollYProgress} />
      ))}
    </div>
  );
}
