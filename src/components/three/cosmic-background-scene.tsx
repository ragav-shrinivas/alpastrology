"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#e8b54a";
const SOFT = "#ffe9ad";
const SKY = "#6aa7e0";

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

/* Layered parallax starfield (two depths) */
function StarLayer({
  count,
  radius,
  size,
  color,
  speed,
  opacity,
}: {
  count: number;
  radius: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

/* Slow-drifting golden energy particles */
function GoldenParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.18; // drift upward
      if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={SOFT}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* Faint constellation lines that gently twinkle */
function Constellations() {
  const ref = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const pts: number[] = [];
    const nodes = 7;
    let prev = new THREE.Vector3(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      -3,
    );
    for (let i = 0; i < nodes; i++) {
      const next = new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 9,
        -3 - Math.random() * 2,
      );
      pts.push(prev.x, prev.y, prev.z, next.x, next.y, next.z);
      prev = next;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const m = ref.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={SKY} transparent opacity={0.12} />
    </lineSegments>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CosmicBackgroundScene() {
  const mobile = isMobile();
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, mobile ? 1.2 : 1.6]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#070a1c", 6, 16]} />
      <StarLayer
        count={mobile ? 500 : 1100}
        radius={11}
        size={0.03}
        color="#ffffff"
        speed={0.012}
        opacity={0.8}
      />
      <StarLayer
        count={mobile ? 220 : 500}
        radius={8}
        size={0.05}
        color={GOLD}
        speed={0.02}
        opacity={0.7}
      />
      {!mobile && <GoldenParticles count={70} />}
      <Constellations />
      <Rig />
    </Canvas>
  );
}
