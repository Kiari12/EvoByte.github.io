import { cn } from "@/lib/utils";

/* Honey parallelogram under a label: active nav item, tab indicator. */
export function SlantBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block h-[3px] bg-honey-400 slant-box", className)}
      style={{ ["--h" as string]: "3px" }}
    />
  );
}
