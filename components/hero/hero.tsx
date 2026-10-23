import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/eyebrow";
import { PatternBand } from "@/components/brand/pattern-band";
import { HeroVisual } from "./hero-visual";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy-950 text-white"
    >
      <div className="container-site grid items-center gap-12 pt-20 pb-44 md:grid-cols-12 md:pt-28 md:pb-52">
        <div className="md:col-span-7">
          <Eyebrow tone="inverse" barsClassName="text-white/50" className="hero-in hero-eyebrow mb-6" style={d(120)}>
            EvoByte Tech · Brunei
          </Eyebrow>

          <h1 id="hero-title" className="text-hero">
            <span className="hero-in hero-line" style={d(180)}>Humble code.</span>
            <span className="hero-in hero-line" style={d(250)}>
              Powerful <span className="slant-underline">workflows.</span>
            </span>
          </h1>

          <p className="hero-in hero-sub mt-6 max-w-[48ch] text-lead text-white/75" style={d(380)}>
            We build health and business software that people actually use.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg" className="hero-in hero-cta" style={d(480)}>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="ghost-inverse" size="lg" className="hero-in hero-cta group" style={d(530)}>
              <Link href="/work">
                See our work
                <ArrowRight
                  strokeWidth={1.5}
                  aria-hidden
                  className="transition-transform ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mark stays inside the container: its right edge lines up with the nav */}
        <div className="relative hidden md:col-span-5 md:block">
          <HeroVisual />
        </div>
      </div>

      <div className="hero-in hero-band absolute inset-x-0 bottom-8 -z-10" style={d(700)}>
        <PatternBand tone="inverse" drift />
      </div>
    </section>
  );
}
