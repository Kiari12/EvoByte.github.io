import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { WorkPreview } from "@/components/sections/work-preview";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WorkPreview />
      <About />
    </>
  );
}
