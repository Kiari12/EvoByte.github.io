import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHead } from "./section-head";

export const HABITS = [
  {
    title: "Watch the work first",
    body: "Before we design anything, we sit with the clinician, carer or freelancer doing the job and note where the time actually goes.",
  },
  {
    title: "Ship something small",
    body: "A working slice in people's hands beats a long spec. We release early, watch it being used, then build the next piece.",
  },
  {
    title: "Say plainly what it does",
    body: "No “AI-powered solutions”. If it flags a patient's falls risk before the fall, that's what we call it, and that's what we test against.",
  },
  {
    title: "Stay for the boring part",
    body: "Most software fails after launch. We keep maintaining what we build, and you talk to the people who wrote it.",
  },
];

/* A ruled list, not a box grid. `compact` (home) shows the titles only;
   /studio carries the full text. */
export function Habits({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={cn("border-b border-line", compact && "sm:grid sm:grid-cols-2 sm:gap-x-10")}>
      {HABITS.map((h, i) => (
        <li
          key={h.title}
          className={cn(
            "grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line",
            compact ? "items-baseline py-5" : "py-7 md:grid-cols-[3rem_18rem_1fr] md:gap-x-8",
          )}
        >
          <span className="font-mono text-sm font-semibold tabular-nums text-navy-700" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-h3 text-navy-900">{h.title}</h3>
          {!compact && <p className="col-start-2 mt-2 max-w-[52ch] text-ink-muted md:col-start-3 md:mt-0">{h.body}</p>}
        </li>
      ))}
    </ol>
  );
}

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="section-y bg-navy-50">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionHead
            id="approach-title"
            title="Structure first. Decoration never."
            lead="We're a small team, so we keep the process small too. Four habits cover most of it."
          />
          <Link
            href="/studio"
            className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-900"
          >
            How a project runs
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        <div className="md:col-span-8 md:pt-2">
          <Habits compact />
        </div>
      </div>
    </section>
  );
}
