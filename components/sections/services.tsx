import { BarChart3, Code2, Workflow, type LucideIcon } from "lucide-react";
import { SectionHead } from "./section-head";

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Code2,
    title: "Custom software",
    body: "Web and mobile apps built around how your team already works, not the other way round.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    body: "Paper forms, spreadsheets and chat threads replaced with one tool that does the repetitive steps for you.",
  },
  {
    icon: BarChart3,
    title: "Data & dashboards",
    body: "The records you already keep, turned into the census, risk flags and reports you check every morning.",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y bg-white">
      <div className="container-site">
        <SectionHead className="mb-12" eyebrow="What we do" id="services-title" title="Built to move work forward" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3.5 rounded-lg border border-line p-8">
              <Icon className="size-10 text-navy-900" strokeWidth={1.5} aria-hidden />
              <h3 className="text-h3 text-navy-900">{title}</h3>
              <p className="leading-relaxed text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
