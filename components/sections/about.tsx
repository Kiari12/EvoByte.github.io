import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EvoMark } from "@/components/brand/evo-mark";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-white">
      <div className="container-site flex flex-wrap items-center gap-12 md:flex-nowrap md:gap-16">
        <EvoMark animate className="w-[220px] flex-none text-navy-900 md:w-[280px]" />
        <div className="flex max-w-[60ch] flex-col items-start gap-4">
          <h2 id="about-title" className="text-h1 text-navy-900">A mark that moves forward</h2>
          <p className="text-lead text-ink-muted">
            The EvoByte mark breaks the letters E and B into geometric strokes. Every bar leans the same way: a forward
            lean that stands for progress, built on a focus on code and digital solutions.
          </p>
          <Link
            href="/studio"
            className="group mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-navy-900"
          >
            About the studio
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
