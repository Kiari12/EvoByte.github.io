import { Eyebrow } from "@/components/brand/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  tone?: "light" | "inverse";
  className?: string;
}) {
  return (
    <header className={cn("max-w-[40rem]", className)}>
      {eyebrow && <Eyebrow tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("text-h1", tone === "inverse" ? "text-white" : "text-navy-900")}>{title}</h2>
      {lead && (
        <p className={cn("mt-5 max-w-[60ch] text-lead", tone === "inverse" ? "text-white/75" : "text-ink-muted")}>
          {lead}
        </p>
      )}
    </header>
  );
}
