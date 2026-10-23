import { cn } from "@/lib/utils";
import { MARK, MARK_VIEWBOX, WORDMARK_BYTE, WORDMARK_EVO, WORDMARK_VIEWBOX } from "./paths";

type Tone = "light" | "inverse";
const ink = (tone: Tone) => (tone === "inverse" ? "text-white" : "text-navy-900");

/* Primary horizontal lockup. Min width 120px; below that use <EvoSymbol/>. */
export function EvoLogo({
  tone = "light",
  tagline = false,
  className,
}: {
  tone?: Tone;
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col gap-2", ink(tone), className)}>
      <svg viewBox={WORDMARK_VIEWBOX} className="block h-auto w-full min-w-[120px]" aria-hidden focusable="false">
        <g fill="currentColor">{WORDMARK_EVO.map((d) => <path key={d} d={d} fillRule="evenodd" />)}</g>
        <g fill="var(--brand-honey)">{WORDMARK_BYTE.map((d) => <path key={d} d={d} />)}</g>
      </svg>
      {tagline && (
        <span className={cn("text-sm font-normal", tone === "inverse" ? "text-white/70" : "text-ink-muted")}>
          Humble code. Powerful workflows.
        </span>
      )}
      <span className="sr-only">EvoByte</span>
    </span>
  );
}

/* Symbol: E in navy (or white), B in honey. Min 24px tall. */
export function EvoSymbol({ tone = "light", className }: { tone?: Tone; className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={cn("min-h-6", ink(tone), className)} role="img" aria-label="EvoByte">
      <path d={MARK.e1 + MARK.e2 + MARK.e3} fill="currentColor" />
      <path d={MARK.bStem + MARK.bBowl} fill="var(--brand-honey)" />
    </svg>
  );
}
