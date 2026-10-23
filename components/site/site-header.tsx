"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { Menu } from "lucide-react";
import { EvoLogo } from "@/components/brand/evo-logo";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { useInputModality } from "@/lib/input-modality";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const modality = useInputModality();

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 4);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white transition-[border-color]",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <div className="container-site flex h-[72px] items-center gap-8">
        <Link href="/" aria-label="EvoByte home" className="-m-2 rounded-sm p-2">
          <EvoLogo className="w-[132px]" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-sm px-3 py-2 text-ui font-semibold transition-colors",
                      active ? "text-navy-900" : "text-ink-muted hover:text-navy-900",
                    )}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-bar"
                        className="absolute inset-x-3 bottom-0 h-[3px] bg-honey-400 slant-box"
                        style={{ ["--h" as string]: "3px" }}
                        transition={{ duration: modality === "keyboard" ? 0 : 0.22, ease: EASE_OUT }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link href="/contact">Start a project</Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="-mr-2 ml-auto md:hidden"
          aria-expanded={open}
          aria-controls={open ? "mobile-nav" : undefined}
          onClick={(e) => {
            setInstant(e.detail === 0); // detail 0 = keyboard activation
            setOpen(true);
          }}
        >
          <Menu className="size-6" strokeWidth={1.5} aria-hidden />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      <MobileNav
        open={open}
        instant={instant}
        onOpenChange={(next, viaKeyboard) => {
          if (!next) setInstant(viaKeyboard);
          setOpen(next);
        }}
        isActive={isActive}
      />
    </header>
  );
}
