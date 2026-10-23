import { cn } from "@/lib/utils";
import { SpeedBars } from "./speed-bars";

/* [≡] LABEL. Honey bars on navy, navy bars on white. */
export function Eyebrow({
  children,
  tone = "light",
  className,
  barsClassName,
  style,
}: {
  children: React.ReactNode;
  tone?: "light" | "inverse";
  className?: string;
  /** Override the bar colour, e.g. to stay within the honey budget (§4.4). */
  barsClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow",
        tone === "inverse" ? "text-white/80" : "text-ink-muted",
        className,
      )}
      style={style}
    >
      <SpeedBars className={barsClassName ?? (tone === "inverse" ? "text-honey-400" : "text-navy-900")} />
      {children}
    </p>
  );
}
