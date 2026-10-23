import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CtaBand({
  title = "Have a workflow that's slower than it should be?",
  lead = "Tell us who does the work and what takes too long. Someone on the team reads every message and writes back.",
  surface = "tint",
}: {
  title?: string;
  lead?: string;
  /** Alternate with the section above it (§4.5). */
  surface?: "tint" | "white";
}) {
  return (
    <section aria-labelledby="cta-title" className={cn("section-y", surface === "white" ? "bg-white" : "bg-cream")}>
      <div className="container-site grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <h2 id="cta-title" className="text-h1 text-navy-900">{title}</h2>
          <p className="mt-5 max-w-[56ch] text-lead text-ink-muted">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-self-end">
          <Button asChild size="lg">
            <Link href="/contact">Start a project</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={`mailto:${CONTACT.email}`}>Email us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
