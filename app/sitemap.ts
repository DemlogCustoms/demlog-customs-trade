import type { MetadataRoute } from "next";
import { articles, corePages, services } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = ["", ...corePages.map(p=>p[0]), ...services.map(p=>p[0]), ...articles.map(p=>p[0])];
  const existing = (["en","fr"] as const).flatMap(lang => slugs.map(slug => ({ url: `https://demlogct.com/${lang}${slug ? `/${slug}` : ""}`, lastModified: new Date("2026-07-14"), changeFrequency: slug ? "monthly" as const : "weekly" as const, priority: slug ? 0.7 : 1, alternates: { languages: { "en-CA": `https://demlogct.com/en${slug ? `/${slug}` : ""}`, "fr-CA": `https://demlogct.com/fr${slug ? `/${slug}` : ""}` } } })));
  return [...existing,
    { url: "https://demlogct.com/en/international-trade", lastModified: new Date("2026-07-14"), changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: { "en-CA": "https://demlogct.com/en/international-trade", "fr-CA": "https://demlogct.com/fr/commerce-international" } } },
    { url: "https://demlogct.com/fr/commerce-international", lastModified: new Date("2026-07-14"), changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: { "en-CA": "https://demlogct.com/en/international-trade", "fr-CA": "https://demlogct.com/fr/commerce-international" } } },
  ];
}
