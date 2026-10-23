"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 2, label: "products in daily use: GeriTrack and BebasWork", key: true },
  { value: 1, label: "team you call directly, not a ticket queue" },
];

/* Renders the final number on the server; counts up once on first view.
   Single digits stay static: counting from 0 to 3 reads as a glitch, not a reveal. */
function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || value < 10 || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 0.8,
      ease: EASE_OUT,
      onUpdate: (v) => { el.textContent = String(Math.round(v)); },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}

export function StatsBand() {
  return (
    <section aria-label="EvoByte in numbers" className="bg-navy-900 text-white">
      <dl className="container-site grid gap-10 py-[clamp(56px,6vw,96px)] sm:grid-cols-2 sm:gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-3 border-t border-white/15 pt-6">
            <dt className="max-w-[28ch] text-white/70">{s.label}</dt>
            <dd
              className={cn(
                "text-stat tabular-nums",
                s.key ? "text-honey-400" : "text-white",
              )}
            >
              <Count value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
