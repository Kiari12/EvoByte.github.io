import { SectionHead } from "./section-head";

const K = ({ children }: { children: React.ReactNode }) => <span className="text-honey-400">{children}</span>;

export function CodeMoment() {
  return (
    <section aria-labelledby="code-title" className="section-y bg-white">
      <div className="container-site grid items-center gap-12 md:grid-cols-12">
        <SectionHead
          className="md:col-span-5"
          id="code-title"
          eyebrow="Humble code"
          title="No framework theatre. Just the thing that works."
          lead="We pick the stack that ships fastest for the problem in front of us, keep it readable, and stay around to maintain it."
        />
        <figure className="min-w-0 overflow-hidden rounded-md bg-navy-950 text-white md:col-span-7">
          <figcaption className="flex justify-between gap-4 border-b border-white/10 px-5 py-3 font-mono text-xs text-white/60">
            <span className="truncate">geritrack/risk-flags.ts</span>
            <span>TypeScript</span>
          </figcaption>
          <pre
            tabIndex={0}
            aria-label="Code sample: geritrack/risk-flags.ts"
            className="overflow-x-auto rounded-none p-5 font-mono text-code leading-[1.75] focus-visible:outline-offset-[-2px] sm:p-6 sm:text-sm"
          >
            <code>
              <K>export function</K> riskFlags(patient: Patient) {"{\n"}
              {"  "}<K>const</K> hits = RULES.filter((rule) =&gt; rule.applies(patient));{"\n"}
              {"  "}<K>return</K> hits.map((rule) =&gt; rule.flag);{"\n"}
              {"}\n\n"}
              <span className="text-white/55">{"// Falls risk spotted at the visit, not after the fall."}</span>
            </code>
          </pre>
          <div className="border-t border-white/10 px-5 py-4 font-mono text-code sm:px-6 sm:text-sm">
            <p><K>$</K> npm run deploy</p>
            <p className="text-white/70">✓ geritrack is live</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
