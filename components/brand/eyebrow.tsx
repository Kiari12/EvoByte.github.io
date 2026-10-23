import { cn } from "@/lib/utils";

/* Small uppercase label above a heading. Honey on navy, dark honey on white and cream. */
export function Eyebrow({
  children,
  tone = "light",
  className,
  style,
}: {
  children: React.ReactNode;
  tone?: "light" | "inverse";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={cn("text-eyebrow", tone === "inverse" ? "text-honey-400" : "text-honey-700", className)} style={style}>
      {children}
    </p>
  );
}
