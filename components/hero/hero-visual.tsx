"use client";
import { useEffect, useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { EvoMark } from "@/components/brand/evo-mark";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-out
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Pointer parallax: ≤ 6px, fine pointers only. Spring with no bounce.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 22, bounce: 0 });
  const sy = useSpring(py, { stiffness: 120, damping: 22, bounce: 0 });

  useEffect(() => {
    if (reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / innerWidth - 0.5) * 12);
      py.set((e.clientY / innerHeight - 0.5) * 12);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <m.div ref={ref} style={reduce ? undefined : { scale, opacity, y }} className="pointer-events-none relative">
      <m.div style={reduce ? undefined : { x: sx, y: sy }}>
        {/* Large, right-aligned to the container edge */}
        <EvoMark animate className="ml-auto block w-full max-w-[520px] text-white" />
      </m.div>
    </m.div>
  );
}
