import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/page-header";
import { SectionHead } from "@/components/sections/section-head";
import { Habits } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
import { TEAM_PHOTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description: "EvoByte is a small software studio in Bandar Seri Begawan. Here's how we work.",
};

const SECTORS = [
  {
    name: "Health",
    body: "Geriatric assessment for outpatient clinics: sarcopenia, frailty and falls risk across every patient.",
    products: "GeriTrack",
  },
  {
    name: "Business",
    body: "Small tools for freelancers and the businesses that hire them: posting work, tracking it and getting paid.",
    products: "BebasWork",
  },
]

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title="A small team that stays for the boring part"
        lead="We're based in Bandar Seri Begawan. We build software for the care teams and small businesses around us, and we keep maintaining it after launch."
      />

      <section aria-labelledby="sectors-title" className="section-y bg-white">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <SectionHead
            className="md:col-span-5"
            id="sectors-title"
            title="Health and business software"
            lead="Two kinds of work, one habit: start with the person doing the job."
          />
          <ul className="md:col-span-7">
            {SECTORS.map((s) => (
              <li key={s.name} className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[10rem_1fr] sm:gap-6">
                <h3 className="text-h3 text-navy-900">{s.name}</h3>
                <div>
                  <p className="text-ink-muted">{s.body}</p>
                  <p className="mt-2 text-sm font-semibold text-navy-900">{s.products}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {TEAM_PHOTO && (
        <section aria-labelledby="team-title" className="section-y bg-white pt-0">
          <div className="container-site">
            <h2 id="team-title" className="sr-only">The team</h2>
            <Image
              src={TEAM_PHOTO.src}
              alt={TEAM_PHOTO.alt}
              width={TEAM_PHOTO.width}
              height={TEAM_PHOTO.height}
              sizes="(min-width: 1264px) 1200px, 100vw"
              className="h-auto w-full rounded-md"
            />
          </div>
        </section>
      )}

      <section aria-labelledby="habits-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHead
            className="mb-12"
            id="habits-title"
            title="How a project runs"
            lead="Four habits, in the order a project meets them. They're why the products above are still in use."
          />
          <Habits />
        </div>
      </section>

      <section aria-label="Our promise" className="bg-navy-900 text-white">
        <div className="container-site py-[clamp(64px,8vw,112px)]">
          <p className="max-w-[24ch] text-h1">
            Most software fails after launch. We stay for{" "}
            <span className="text-honey-400">the boring part</span>: the updates, the fixes, and a person you can call.
          </p>
        </div>
      </section>

      <CtaBand title="Got a job that takes longer than it should?" />
    </>
  );
}
