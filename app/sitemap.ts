import type { MetadataRoute } from "next";

const BASE = "https://evobyte.bn";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/studio", "/contact"].map((path) => ({ url: `${BASE}${path}` }));
}
