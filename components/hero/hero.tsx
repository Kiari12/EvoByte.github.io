import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/eyebrow";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* EB pattern crop on the right half, faded into the navy. No text sits on it. */}
      <div aria-hidden className="hero-in hero-field absolute inset-y-0 right-0 left-[52%] -z-10 hidden sm:block" style={d(500)}>
        <div className="bg-pattern absolute inset-0" />
        <div className="bg-pattern-fade absolute inset-0" />
      </div>

      <div className="container-site flex flex-col items-start pt-24 pb-28 md:pt-[120px] md:pb-32">
        <Eyebrow tone="inverse" className="hero-in hero-eyebrow mb-7" style={d(120)}>
          EvoByte Tech · Brunei
        </Eyebrow>

        <h1 id="hero-title" className="max-w-[12ch] text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] font-black tracking-[-0.02em]">
          <span className="hero-in hero-line" style={d(180)}>Humble code.</span>
          <span className="hero-in hero-line text-honey-400" style={d(250)}>Powerful workflows.</span>
        </h1>

        <p className="hero-in hero-sub mt-7 max-w-[520px] text-[1.1875rem] leading-[1.55] text-mist" style={d(380)}>
          We build health and business software that people actually use, for care teams and small businesses in Brunei.
        </p>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button asChild variant="brand" size="lg" className="hero-in hero-cta font-bold" style={d(480)}>
            <Link href="/contact">Start a project</Link>
          </Button>
          <Button asChild variant="outline-inverse" size="lg" className="hero-in hero-cta group" style={d(530)}>
            <Link href="/work">
              See our products
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="transition-transform ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
