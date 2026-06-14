"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./cosmic-background-scene"), {
  ssr: false,
});

/**
 * Global, fixed, multi-layer cosmic atmosphere rendered behind all content.
 *   1 deep cosmic base   2 blue-purple nebula   3 golden sunrise glow
 *   4 animated light rays   5 Three.js parallax stars + particles + lines
 *   6 vignette for depth
 */
export function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1 — deep cosmic base */}
      <div className="absolute inset-0 bg-[#070a1c]" />

      {/* 2 — blue-purple nebula */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 18% 12%, rgba(106,167,224,0.16) 0%, transparent 70%), radial-gradient(60% 55% at 82% 18%, rgba(90,72,170,0.18) 0%, transparent 72%)",
        }}
      />

      {/* 3 — golden sunrise glow rising from the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 55% at 50% 116%, rgba(244,162,89,0.28) 0%, rgba(232,181,74,0.12) 35%, transparent 70%)",
        }}
      />

      {/* 4 — slow rotating divine light rays */}
      <div
        className="animate-spin-slower absolute left-1/2 top-[78%] h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(255,233,173,0.9) 0deg 1.2deg, transparent 1.2deg 9deg)",
          maskImage:
            "radial-gradient(closest-side, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 0%, transparent 75%)",
        }}
      />

      {/* 5 — animated stars / particles / constellations */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* 6 — vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 35%, transparent 55%, rgba(7,10,28,0.7) 100%)",
        }}
      />
    </div>
  );
}
