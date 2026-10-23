import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./product-card";
import { SectionHead } from "./section-head";

export function WorkPreview() {
  return (
    <section aria-labelledby="work-title" className="section-y bg-white">
      <div className="container-site">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
          <SectionHead
            className="md:col-span-8"
            id="work-title"
            title="Products people open every day"
            lead="Two products. Each one started with a single group of people and one job that was taking too long."
          />
          <div className="md:col-span-4 md:justify-self-end">
            <Button asChild variant="outline" className="group">
              <Link href="/work">
                All our work
                <ArrowRight strokeWidth={1.5} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {PRODUCTS.map((p, i) => <ProductCard key={p.slug} product={p} feature flip={i % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}
