import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

/* A product screen. Shows the real screenshot when the product has one
   (lib/products.ts → screenshot), otherwise an illustrated stand-in of the UI.
   Framed whole inside its panel. */
export function ProductShot({
  slug,
  title,
  screenshot,
  sizes = "(min-width: 768px) 560px, 100vw",
  className,
}: {
  slug: Product["slug"];
  title: string;
  screenshot?: Product["screenshot"];
  /** Rendered width hint for the screenshot, so it isn't served too small */
  sizes?: string;
  className?: string;
}) {
  if (screenshot?.device === "phone") {
    return (
      <div className={cn("overflow-hidden rounded-[2rem] border-[6px] border-navy-900 bg-white", className)}>
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes={sizes}
          quality={90}
          className="block h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden={screenshot ? undefined : true}
      className={cn("overflow-hidden rounded-md bg-white text-ink", className)}
    >
      {/* Navy window chrome defines the screen's edge, so it needs no border of its own */}
      <div className="bg-navy-900 px-4 py-2.5 font-mono text-[11px] text-white/70">
        <span className="block truncate">{title}</span>
      </div>
      {screenshot ? (
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes={sizes}
          quality={90}
          className="block h-auto w-full"
        />
      ) : (
        <div className="p-4">{BODIES[slug]}</div>
      )}
    </div>
  );
}

const BODIES: Record<string, React.ReactNode> = {
  geritrack: (
    <ul className="text-sm">
      {[
        ["Falls risk", "2"],
        ["Mobility decline", "0"],
        ["Grip-strength decline", "0"],
        ["Bone protection", "0"],
      ].map(([l, v]) => (
        <li key={l} className="flex justify-between gap-3 border-b border-line py-2.5 last:border-0">
          <span>{l}</span>
          <b className="font-bold tabular-nums text-navy-900">{v}</b>
        </li>
      ))}
    </ul>
  ),
  bebaswork: (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Posted", gigs: [["Shop logo refresh", "B$120"], ["Product photos", "B$180"], ["Bazaar flyer", "B$60"]] },
        { label: "In progress", gigs: [["Wedding video edit", "B$350"], ["Website copy", "B$200"]], active: true },
        { label: "Paid", gigs: [["Menu translation", "B$80"], ["Café signage", "B$150"]], paid: true },
      ].map((col) => (
        <div key={col.label} className="grid content-start gap-1.5 rounded-[2px] bg-navy-50 p-1.5">
          <span className="truncate px-0.5 pb-0.5 font-mono text-[10px] font-semibold text-ink-muted">{col.label}</span>
          {col.gigs.map(([t, price]) => (
            <div
              key={t}
              className={cn(
                "grid gap-0.5 rounded-[2px] border px-2 py-1.5",
                col.paid ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white",
                col.active && "border-l-[3px] border-l-navy-900",
              )}
            >
              <span className={cn("truncate text-[11px] font-semibold", !col.paid && "text-navy-900")}>{t}</span>
              <span className={cn("font-mono text-[10px] tabular-nums", col.paid ? "text-white/70" : "text-ink-muted")}>{price}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
