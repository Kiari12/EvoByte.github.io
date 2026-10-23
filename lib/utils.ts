import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/* Teach tailwind-merge that the type-scale utilities (globals.css) are
   font sizes, so `text-h1 text-navy-900` keeps both. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "display", "h1", "h2", "h3", "lead", "eyebrow", "stat", "ui", "code"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
