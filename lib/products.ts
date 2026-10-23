export type Product = {
  slug: "geritrack" | "bebaswork";
  name: string;
  sector: string;
  value: string;
  platforms: string[];
  forWho: string;
  before: string;
  does: string[];
  /** A real screenshot in /public. Until one exists, an illustration is shown. */
  screenshot?: { src: string; alt: string; width: number; height: number; device?: "desktop" | "phone" };
};

/* Order matters: GeriTrack is the lead product, BebasWork second. */
export const PRODUCTS: Product[] = [
  {
    slug: "geritrack",
    name: "GeriTrack",
    sector: "Geriatric assessment",
    value: "Every older outpatient's assessment and risks, in one view.",
    platforms: ["Web"],
    forWho: "Geriatric clinics and the clinicians who assess older outpatients.",
    before: "Assessments on paper and in spreadsheets, with falls and muscle-loss risks spotted one patient at a time.",
    does: [
      "Register patients and record each assessment in one place.",
      "Sarcopenia, sarcopenic obesity, poor muscle and fallers tracked across the whole clinic.",
      "Risk flags for falls, mobility decline, grip-strength decline and bone protection.",
      "A daily outpatient census, population graphs and one-click data export.",
    ],
    screenshot: {
      src: "/products/geritrack-dashboard.png",
      alt: "GeriTrack dashboard: outpatient census, rates of sarcopenia, sarcopenic obesity, poor muscle and fallers, risk flags by frequency, and a daily census chart.",
      width: 2770,
      height: 1648,
    },
  },
  {
    slug: "bebaswork",
    name: "BebasWork",
    sector: "Freelance work",
    value: "Short gigs for Brunei freelancers: post, track, get paid.",
    platforms: ["Web", "Mobile"],
    forWho: "Freelancers and the small businesses that hire them.",
    before: "Gigs agreed in chat, tracked in memory and chased for payment.",
    does: [
      "Post a short job with a clear scope and price, and track it through to paid.",
      "One profile to hire as a client or work as a freelancer, switching in a tap.",
      "Verified freelancers, and identity checks for clients posting in-person jobs.",
      "Upload a CV and turn on job-seeker mode so local businesses can find you.",
    ],
    screenshot: {
      src: "/products/bebaswork-profile.png",
      alt: "BebasWork profile screen on a phone: client and verified-freelancer modes, edit profile, CV upload, a job-seeker toggle and client identity verification.",
      width: 638,
      height: 1190,
      device: "phone",
    },
  },
];
