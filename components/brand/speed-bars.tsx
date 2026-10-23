import { cn } from "@/lib/utils";

/* ≡ motif: three forward-leaning bars, 3px tall with a 3px gap. */
export function SpeedBars({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex flex-none flex-col gap-[3px]", className)}>
      {[16, 12, 8].map((w) => (
        <span key={w} className="block h-[3px] bg-current slant-box" style={{ width: w, ["--h" as string]: "3px" }} />
      ))}
    </span>
  );
}
