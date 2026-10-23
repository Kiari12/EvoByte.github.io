import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", axes: ["opsz"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://evobyte.bn"),
  title: { default: "EvoByte · Humble code. Powerful workflows.", template: "%s · EvoByte" },
  description:
    "EvoByte is a small software studio in Brunei. We build the health and business software people open every day: GeriTrack and BebasWork.",
  openGraph: { siteName: "EvoByte", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0e3051" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* Without JS, Motion never runs: show the mark in its final state. */}
        <noscript>
          <style>{`.evo-mark-anim path{opacity:1!important;transform:none!important}.evo-mark-anim path[aria-hidden]{opacity:0!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "!rounded-md !border-line !font-sans !text-ink !shadow-popover",
              title: "!font-semibold !text-navy-900",
              description: "!text-ink-muted",
            },
          }}
        />
      </body>
    </html>
  );
}
