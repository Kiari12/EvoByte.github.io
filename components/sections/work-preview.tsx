import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/brand/chip";
import { Eyebrow } from "@/components/brand/eyebrow";
import { PRODUCTS, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductShot } from "./product-shot";
import { SectionHead } from "./section-head";

const VIEWS: Record<Product["slug"], string> = {
  geritrack: "Dashboard",
  bebaswork: "Profile",
};

/* Text beside a navy pattern panel holding the real screen. */
function ProductFeature({ product, flip }: { product: Product; flip: boolean }) {
  const phone = product.screenshot?.device === "phone";
  return (
    <article id={product.slug} className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div className={cn("flex flex-col items-start gap-4", flip && "md:order-2")}>
        <Eyebrow>{product.sector}</Eyebrow>
        <h3 className="text-h1 text-navy-900">{product.name}</h3>
        <p className="max-w-[48ch] text-lead text-ink-muted">
          <span className="font-semibold text-ink">{product.value}</span> {product.does[0]}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Platforms">
          {product.platforms.map((p) => <li key={p}><Chip>{p}</Chip></li>)}
        </ul>
        <Button asChild className="group mt-2">
          <Link href={`/work#${product.slug}`}>
            View {product.name}
            <ArrowRight strokeWidth={1.5} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
      <div className="bg-pattern flex min-h-[340px] items-center justify-center rounded-xl p-6 sm:p-10">
        <ProductShot
          slug={product.slug}
          title={`${product.name} · ${VIEWS[product.slug]}`}
          screenshot={product.screenshot}
          sizes={phone ? "220px" : undefined}
          className={cn(
            "w-full shadow-[0_20px_50px_rgb(0_0_0/0.35)]",
            phone ? "max-w-[220px] border-white" : "max-w-[520px]",
          )}
        />
      </div>
    </article>
  );
}

export function WorkPreview() {
  return (
    <section id="products" aria-labelledby="work-title" className="section-y bg-cream">
      <div className="container-site">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-12">
          <SectionHead
            className="md:col-span-8"
            eyebrow="Our products"
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

        <div className="grid gap-20">
          {PRODUCTS.map((p, i) => <ProductFeature key={p.slug} product={p} flip={i % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}
