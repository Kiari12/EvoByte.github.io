import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/brand/chip";
import { SpeedBars } from "@/components/brand/speed-bars";
import { PageHeader } from "@/components/site/page-header";
import { ProductShot } from "@/components/sections/product-shot";
import { CtaBand } from "@/components/sections/cta-band";
import { PRODUCTS, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "GeriTrack and BebasWork: software built with the people who use it.",
};

const SHOT_TITLE: Record<Product["slug"], string> = {
  geritrack: "GeriTrack · Dashboard",
  bebaswork: "BebasWork · Gigs",
};

function Screen({ p, feature, wide, panel }: { p: Product; feature?: boolean; wide?: boolean; panel: "white" | "tint" }) {
  const phone = p.screenshot?.device === "phone";
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md",
        panel === "tint" ? "bg-navy-50" : "bg-white",
        wide ? "p-4 sm:p-8 md:p-14" : feature ? "min-h-[300px] p-6 sm:p-10 md:min-h-[420px] md:p-16" : "p-6 sm:p-10",
      )}
    >
      <ProductShot
        slug={p.slug}
        title={SHOT_TITLE[p.slug]}
        screenshot={p.screenshot}
        sizes={wide ? "(min-width: 1264px) 1120px, 100vw" : phone ? "300px" : undefined}
        className={cn("w-full", wide ? "max-w-none" : phone ? "max-w-[300px]" : feature ? "max-w-[520px]" : "max-w-[400px]")}
      />
    </div>
  );
}

function Intro({ p }: { p: Product }) {
  return (
    <>
      <p className="mt-4 text-lead font-semibold text-ink">{p.value}</p>
      <dl className="mt-5 grid gap-3 text-ink-muted">
        <div>
          <dt className="text-sm font-semibold text-navy-900">For</dt>
          <dd className="mt-0.5">{p.forWho}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-navy-900">Before</dt>
          <dd className="mt-0.5">{p.before}</dd>
        </div>
      </dl>
    </>
  );
}

function Facts({ p }: { p: Product }) {
  return (
    <>
      <ul className="grid gap-2.5">
        {p.does.map((line) => (
          <li key={line} className="flex gap-3">
            <SpeedBars className="mt-[7px] text-navy-900" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <ul className="flex flex-wrap gap-1.5" aria-label="Platforms">
          {p.platforms.map((pl) => <li key={pl}><Chip>{pl}</Chip></li>)}
        </ul>
        <Link
          href={`/contact?topic=${encodeURIComponent(p.name)}`}
          className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-900"
        >
          Ask about {p.name}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </>
  );
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Two products, each for one group of people"
        lead="Each one started by watching someone do a job that was taking too long. Both are in daily use."
      />

      {PRODUCTS.map((p, i) => {
        const flip = i % 2 === 1;
        const surface = flip ? "bg-navy-50" : "bg-white";
        const panel = flip ? "white" : "tint";
        const title = <h2 id={`${p.slug}-title`} className="text-h1 text-navy-900">{p.name}</h2>;

        return (
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-title`} className={cn("section-y scroll-mt-16", surface)}>
            {p.screenshot && p.screenshot.device !== "phone" ? (
              <div className="container-site">
                <div className="grid gap-x-14 gap-y-8 md:grid-cols-12">
                  <div className="md:col-span-5">{title}<Intro p={p} /></div>
                  <div className="md:col-span-7 md:pt-3"><Facts p={p} /></div>
                </div>
                <div className="mt-12">
                  <Screen p={p} wide panel={panel} />
                </div>
              </div>
            ) : (
              <div className="container-site grid items-center gap-10 md:grid-cols-12 md:gap-14">
                <div className={cn("md:col-span-7", flip && "md:order-2")}>
                  <Screen p={p} feature panel={panel} />
                </div>
                <div className="md:col-span-5">
                  {title}
                  <Intro p={p} />
                  <div className="mt-5"><Facts p={p} /></div>
                </div>
              </div>
            )}
          </section>
        );
      })}

      <CtaBand
        title="Want something like this for your team?"
        lead="Tell us who does the job and where the time goes. We'll say plainly whether we can help."
        surface="white"
      />
    </>
  );
}
