import Link from "next/link";
import { EvoLogo } from "@/components/brand/evo-logo";
import { CONTACT } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

const linkCls = "inline-flex min-h-11 items-center rounded-sm text-mist transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-navy-900 text-mist">
      <div className="container-site grid gap-12 pt-20 pb-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label="EvoByte home" className="inline-block rounded-sm">
            <EvoLogo tone="inverse" className="w-[240px]" />
          </Link>
          <p className="mt-4 text-sm text-white/70">Humble code. Powerful workflows.</p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-8 inline-flex min-h-11 items-center rounded-sm text-lg font-semibold text-honey-400 transition-colors hover:text-honey-100"
          >
            {CONTACT.email}
          </a>
          <p className="text-mist">{CONTACT.place}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-[auto_auto] md:justify-end md:gap-20">
          <div>
            <h2 className="text-eyebrow text-honey-400">Products</h2>
            <ul className="mt-3 grid">
              {PRODUCTS.map((p) => (
                <li key={p.slug}><Link className={linkCls} href={`/work#${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-eyebrow text-honey-400">EvoByte</h2>
            <ul className="mt-3 grid">
              <li><Link className={linkCls} href="/work">Work</Link></li>
              <li><Link className={linkCls} href="/studio">Studio</Link></li>
              <li><Link className={linkCls} href="/contact">Start a project</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-wrap justify-between gap-4 py-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} EvoByte. Humble code. Powerful workflows.</p>
          <p>Made in Brunei</p>
        </div>
      </div>
    </footer>
  );
}
