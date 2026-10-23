import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/eyebrow";

export default function NotFound() {
  return (
    <section className="section-y bg-white">
      <div className="container-site max-w-[44rem]">
        <Eyebrow className="mb-5">404</Eyebrow>
        <h1 className="text-h1 text-navy-900">This page doesn't exist</h1>
        <p className="mt-5 text-lead text-ink-muted">The link may be old, or the address may have a typo.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><Link href="/">Back to home</Link></Button>
          <Button asChild variant="ghost"><Link href="/work">See our work</Link></Button>
        </div>
      </div>
    </section>
  );
}
