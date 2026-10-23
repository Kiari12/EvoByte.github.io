import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/brand/eyebrow";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* Compact navy header for inner pages. Same CSS entrance as the hero,
   shorter and without the mark or the pattern. */
export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <section className="bg-navy-950 text-white">
      <div className="container-site pt-20 pb-20 md:pt-24 md:pb-24">
        <Eyebrow tone="inverse" className="hero-in hero-eyebrow mb-6" style={d(60)}>{eyebrow}</Eyebrow>
        <h1 className="hero-in hero-line max-w-[18ch] text-display" style={d(120)}>
          {title}
        </h1>
        {lead && (
          <p className="hero-in hero-sub mt-6 max-w-[56ch] text-lead text-white/75" style={d(240)}>{lead}</p>
        )}
      </div>
    </section>
  );
}
