import { cn } from "@/lib/utils";

/* Parallelogram chip for platform and stack tags. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center bg-navy-100 px-3 text-xs font-semibold text-navy-900 slant-box",
        className,
      )}
      style={{ ["--h" as string]: "22px" }}
    >
      {children}
    </span>
  );
}
