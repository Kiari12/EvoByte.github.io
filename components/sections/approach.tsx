import { cn } from "@/lib/utils";

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
