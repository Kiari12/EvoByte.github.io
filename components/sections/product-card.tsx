import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/brand/chip";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductShot } from "./product-shot";

const VIEWS: Record<Product["slug"], string> = {
  geritrack: "Dashboard",
  bebaswork: "Gigs",
};

export function ProductCard({ product, feature = false, flip = false }: { product: Product; feature?: boolean; flip?: boolean }) {
  return (
    <article
      className={cn(
        "group relative grid overflow-hidden rounded-md border border-line bg-white transition-colors hover:border-navy-900",
        feature && "md:grid-cols-12",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-navy-50 p-6 sm:p-10",
          feature && "md:col-span-7 md:min-h-[340px] md:p-12",
          feature && flip && "md:order-2",
        )}
      >
        <ProductShot
          slug={product.slug}
          title={`${product.name} · ${VIEWS[product.slug]}`}
          screenshot={product.screenshot}
          sizes={product.screenshot?.device === "phone" ? "240px" : undefined}
          className={cn(
            "w-full transition-transform duration-(--dur-base) ease-out group-hover:-translate-y-0.5",
            product.screenshot?.device === "phone" ? "max-w-[240px]" : feature ? "max-w-[460px]" : "max-w-[380px]",
          )}
        />
      </div>
      <div className={cn("flex flex-col p-6 sm:p-8", feature && "justify-center md:col-span-5 md:p-12")}>
        <h3 className={cn("text-navy-900", feature ? "text-h2" : "text-h3")}>{product.name}</h3>
        <p className="mt-3 max-w-[48ch] text-ink-muted">
          <span className="font-semibold text-ink">{product.value}</span>{" "}
          {feature && product.does[0]}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Platforms">
          {product.platforms.map((p) => <li key={p}><Chip>{p}</Chip></li>)}
        </ul>
        <Link
          href={`/work#${product.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-navy-900 after:absolute after:inset-0"
        >
          View {product.name}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
