import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { CONTACT } from "@/lib/site";

const NEXT = [
  "We read your message and reply by email.",
  "If it's a fit, we ask to watch the work being done, at your clinic or office.",
  "We build a small working slice first, so you can try it before anything bigger.",
];

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell us who does the work and what takes too long. Someone on the team reads every message and writes back.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title="Tell us where the time goes"
        lead="A few lines is enough: who does the job today, and which part takes longer than it should. Someone on the team reads every message and writes back."
      />

      <section aria-label="Contact form" className="section-y bg-white">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-4">
            <h2 className="text-h3 text-navy-900">Prefer email?</h2>
            <p className="mt-3 max-w-[36ch] text-ink-muted">
              Write to us directly. A short note is fine: who does the work, and what slows them down.
            </p>
            <dl className="mt-8 grid gap-5">
              <div>
                <dt className="text-eyebrow text-ink-muted">Email</dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex min-h-11 items-center rounded-sm font-semibold text-navy-900 underline decoration-navy-900/25 underline-offset-4 transition-colors hover:decoration-navy-900"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-ink-muted">Studio</dt>
                <dd className="mt-2 text-ink">{CONTACT.place}</dd>
              </div>
            </dl>

            <h2 className="mt-12 text-h3 text-navy-900">What happens next</h2>
            <ol className="mt-4 grid gap-4">
              {NEXT.map((step, i) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 text-ink-muted">
                  <span className="font-mono text-sm font-semibold tabular-nums text-navy-700" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>

          <div className="md:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
