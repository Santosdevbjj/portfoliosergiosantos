import { MetadataRoute } from "next";
import { type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app/"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"]; // mesmo array usado em lib/mdx.ts

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  return langs.map((lang) => ({
    url: `${baseUrl}/${lang}/sitemap.xml`,
    lastModified: new Date(),
  }));
}
