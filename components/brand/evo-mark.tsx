"use client";
import * as m from "motion/react-m";
import { useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { MARK, MARK_VIEWBOX } from "./paths";

type Ctx = { i?: number; reduce: boolean };
const fade = { duration: 0.15 };

const eBar: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: ({ i = 0, reduce }: Ctx) => ({
    opacity: 1, x: 0,
    transition: reduce ? fade : { duration: 0.4, ease: EASE_OUT, delay: i * 0.06 },
  }),
};
const bStem: Variants = {
  hidden: { opacity: 0, x: 24, y: -12 },
  show: ({ reduce }: Ctx) => ({
    opacity: 1, x: 0, y: 0,
    transition: reduce ? fade : { duration: 0.4, ease: EASE_OUT, delay: 0.18 },
  }),
};
const bBowl: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: ({ reduce }: Ctx) => ({
    opacity: 1, x: 0,
    transition: reduce ? fade : { duration: 0.4, ease: EASE_OUT, delay: 0.26 },
  }),
};
/* A single glint as the bowl lands: opacity only, plays once. */
const glint: Variants = {
  hidden: { opacity: 0 },
  show: ({ reduce }: Ctx) =>
    reduce
      ? { opacity: 0 }
      : { opacity: [0, 0.5, 0], transition: { duration: 0.4, ease: EASE_OUT, delay: 0.62, times: [0, 0.35, 1] } },
};

export function EvoMark({ animate = false, className }: { animate?: boolean; className?: string }) {
  const reduce = !!useReducedMotion();
  return (
    <m.svg
      viewBox={MARK_VIEWBOX}
      className={`${animate ? "evo-mark-anim " : ""}${className ?? ""}`}
      role="img"
      aria-label="EvoByte"
      initial={animate ? "hidden" : false}
      // Builds in once, when most of it has scrolled into view
      {...(animate ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" })}
    >
      {[MARK.e1, MARK.e2, MARK.e3].map((d, i) => (
        <m.path key={i} id={`e-bar-${i + 1}`} d={d} fill="currentColor" custom={{ i, reduce }} variants={eBar} />
      ))}
      <m.path id="b-stem" d={MARK.bStem} fill="var(--brand-honey)" custom={{ reduce }} variants={bStem} />
      <m.path id="b-bowl" d={MARK.bBowl} fill="var(--brand-honey)" custom={{ reduce }} variants={bBowl} />
      {animate && <m.path d={MARK.bBowl} fill="white" aria-hidden custom={{ reduce }} variants={glint} />}
    </m.svg>
  );
}
