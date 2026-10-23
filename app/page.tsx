import { Hero } from "@/components/hero/hero";
import { WorkPreview } from "@/components/sections/work-preview";
import { Approach } from "@/components/sections/approach";
import { StatsBand } from "@/components/sections/stats-band";
import { CodeMoment } from "@/components/sections/code-moment";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <Approach />
      <StatsBand />
      <CodeMoment />
      <CtaBand />
    </>
  );
}
