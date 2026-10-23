import Link from "next/link";
import { EvoLogo } from "@/components/brand/evo-logo";
import { PatternBand } from "@/components/brand/pattern-band";
import { CONTACT } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

const linkCls = "inline-flex min-h-11 items-center rounded-sm text-white/75 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-site grid gap-12 pt-20 pb-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label="EvoByte home" className="inline-block rounded-sm">
            <EvoLogo tone="inverse" className="w-[200px]" />
          </Link>
          <p className="mt-2 text-sm text-white/70">Humble code. Powerful workflows.</p>
          <p className="mt-6 max-w-[36ch] text-white/70">
            A small Brunei studio building software for real care teams and small businesses.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <h2 className="text-eyebrow text-white/60">Products</h2>
            <ul className="mt-2 grid">
              {PRODUCTS.map((p) => (
                <li key={p.slug}><Link className={linkCls} href={`/work#${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-eyebrow text-white/60">EvoByte</h2>
            <ul className="mt-2 grid">
              <li><Link className={linkCls} href="/work">Work</Link></li>
              <li><Link className={linkCls} href="/studio">Studio</Link></li>
              <li><Link className={linkCls} href="/contact">Start a project</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-eyebrow text-white/60">Contact</h2>
            <ul className="mt-2 grid">
              <li><a className={linkCls} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li className="py-2.5 text-white/75">{CONTACT.place}</li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Cropped frieze: large marks, only their top half shows. No text on it. */}
      <PatternBand tone="inverse" scale={2.2} align="top" className="h-[clamp(56px,7vw,104px)]" />

      <div className="border-t border-white/10">
        <div className="container-site flex flex-wrap justify-between gap-4 py-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} EvoByte. Humble code. Powerful workflows.</p>
          <p>Made in Brunei</p>
        </div>
      </div>
    </footer>
  );
}
