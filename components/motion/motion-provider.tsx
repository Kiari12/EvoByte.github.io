"use client";
import { useEffect } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { installInputModality } from "@/lib/input-modality";

/* LazyMotion + m components keep the Motion bundle small.
   Use `import * as m from "motion/react-m"` in components, not `motion`.
   domMax (not domAnimation) because the nav indicator uses layoutId;
   it loads as its own chunk so it stays off the critical path. */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(installInputModality, []);
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
