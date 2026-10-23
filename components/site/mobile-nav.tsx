"use client";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as m from "motion/react-m";
import { AnimatePresence, type Variants } from "motion/react";
import { X } from "lucide-react";
import { EvoSymbol } from "@/components/brand/evo-logo";
import { SlantBar } from "@/components/brand/slant-bar";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { EASE_DRAWER, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* Navy-950 full-screen sheet. Opens with --ease-drawer (320ms), closes
   faster (240ms) and leaves to the right. Keyboard-opened = instant. */
const sheet: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: (instant: boolean) => ({
    opacity: 1, x: 0,
    transition: instant ? { duration: 0 } : { duration: 0.32, ease: EASE_DRAWER, when: "beforeChildren" },
  }),
  exit: (instant: boolean) => ({
    opacity: 0, x: 24,
    transition: instant ? { duration: 0 } : { duration: 0.24, ease: EASE_DRAWER },
  }),
};
const list: Variants = {
  show: (instant: boolean) => ({ transition: { staggerChildren: instant ? 0 : 0.04, delayChildren: instant ? 0 : 0.04 } }),
};
const item: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: (instant: boolean) => ({ opacity: 1, x: 0, transition: instant ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT } }),
};

export function MobileNav({
  open,
  instant,
  onOpenChange,
  isActive,
}: {
  open: boolean;
  instant: boolean;
  onOpenChange: (open: boolean, viaKeyboard: boolean) => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => onOpenChange(o, false)}>
      <AnimatePresence custom={instant}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content
              forceMount
              asChild
              aria-describedby={undefined}
              onEscapeKeyDown={(e) => {
                e.preventDefault();
                onOpenChange(false, true);
              }}
            >
              <m.div
                id="mobile-nav"
                className="fixed inset-0 z-50 flex flex-col bg-navy-950 text-white md:hidden"
                custom={instant}
                variants={sheet}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="container-site flex h-[72px] items-center justify-between">
                  <EvoSymbol tone="inverse" className="h-7 w-auto" />
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost-inverse"
                      size="icon"
                      className="-mr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenChange(false, e.detail === 0);
                      }}
                    >
                      <X className="size-6" strokeWidth={1.5} aria-hidden />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="container-site flex flex-1 flex-col pt-10 pb-10">
                  <m.ul className="flex flex-col" custom={instant} variants={list}>
                    {[{ href: "/", label: "Home" }, ...NAV].map((l) => {
                      const active = l.href === "/" ? false : isActive(l.href);
                      return (
                        <m.li key={l.href} custom={instant} variants={item}>
                          <Link
                            href={l.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-4 border-b border-white/10 py-4 text-2xl font-bold tracking-[-0.02em]",
                              active ? "text-white" : "text-white/75",
                            )}
                          >
                            {l.label}
                            {active && <SlantBar className="w-8" />}
                          </Link>
                        </m.li>
                      );
                    })}
                  </m.ul>
                  <m.div className="mt-auto" custom={instant} variants={item}>
                    <Button asChild variant="brand" size="lg" className="w-full">
                      <Link href="/contact">Start a project</Link>
                    </Button>
                  </m.div>
                </nav>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
