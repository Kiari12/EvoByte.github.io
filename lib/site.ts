export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONTACT = {
  email: "hello@evobyte.bn",
  place: "Bandar Seri Begawan, Brunei",
} as const;

/* Set to a real team photo in /public to show the team section on /studio,
   e.g. { src: "/team/evobyte-team.jpg", alt: "…", width: 1600, height: 1000 }.
   It stays hidden until then: no stand-in photos. */
export const TEAM_PHOTO: { src: string; alt: string; width: number; height: number } | null = null;
