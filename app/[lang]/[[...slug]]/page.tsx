import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "../../components/SitePage";
import { articles, corePages, findPage, services, type Lang } from "../../content";

const SITE = "https://demlogct.com";
const articleDescriptions: Record<string, [string, string]> = {
  "how-commercial-customs-clearance-works-canada": ["Understand the main steps in Canadian commercial customs clearance, from document review and release to accounting and post-entry obligations.", "Comprenez les principales étapes du dédouanement commercial au Canada, de la révision des documents jusqu’à la déclaration en détail et aux obligations après l’importation."],
  "documents-needed-import-commercial-goods-canada": ["Review the commercial invoice, transportation, product and regulatory documents commonly needed to import commercial goods into Canada.", "Passez en revue les documents commerciaux, de transport, de produit et réglementaires généralement requis pour importer des marchandises commerciales au Canada."],
  "understanding-pars-status-border-delays": ["Learn what a PARS status means, why a Canadian border shipment may be delayed and what information to verify before arrival.", "Comprenez le statut PARS, les causes possibles d’un retard à la frontière canadienne et les renseignements à vérifier avant l’arrivée."],
};

export function generateStaticParams() {
  const sharedSlugs = [...corePages.map((page) => page[0]), ...services.map((page) => page[0]), ...articles.map((article) => article[0])];
  return [
    { lang: "en", slug: [] },
    { lang: "fr", slug: [] },
    ...(["en", "fr"] as const).flatMap((lang) => sharedSlugs.map((slug) => ({ lang, slug: [slug] }))),
    { lang: "en", slug: ["international-trade"] },
    { lang: "fr", slug: ["commerce-international"] },
  ];
}
const special: Record<string, [string,string,string,string]> = {
  services: ["Customs Brokerage Services", "Services de courtage en douane", "Canadian customs clearance, classification, CARM and regulated-goods support.", "Dédouanement canadien, classement, GCRA et soutien aux marchandises réglementées."],
  privacy: ["Privacy Policy", "Politique de confidentialité", "How Demlog handles personal information, cookies and enquiries.", "Comment Demlog traite les renseignements personnels, les témoins et les demandes."],
  terms: ["Terms of Use", "Conditions d’utilisation", "Terms governing use of the Demlog website.", "Conditions régissant l’utilisation du site Web de Demlog."],
  accessibility: ["Accessibility Statement", "Déclaration d’accessibilité", "Demlog’s commitment to an accessible website.", "Engagement de Demlog envers un site Web accessible."],
  disclaimer: ["Customs Services Disclaimer", "Avis relatif aux services douaniers", "Important limitations applying to customs and trade information.", "Limites importantes applicables aux renseignements douaniers et commerciaux."],
  sitemap: ["HTML Sitemap", "Plan du site HTML", "Browse the Demlog website structure.", "Parcourir la structure du site Web de Demlog."],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }): Promise<Metadata> {
  const p = await params; const lang: Lang = p.lang === "fr" ? "fr" : "en"; const slug = p.slug?.join("/") || "home";
  const isTrade = (lang === "en" && slug === "international-trade") || (lang === "fr" && slug === "commerce-international");
  if (isTrade) {
    const englishUrl = `${SITE}/en/international-trade`;
    const frenchUrl = `${SITE}/fr/commerce-international`;
    const title = lang === "en" ? "Canadian Lentils & Pulses for International Markets | Demlog" : "Lentilles et légumineuses canadiennes à l’international | Demlog";
    const description = lang === "en" ? "Explore selected Canadian lentil, pulse and agricultural commodity opportunities for qualified international buyers. Submit your commercial requirements to Demlog." : "Découvrez des possibilités sélectionnées d’approvisionnement en lentilles, légumineuses et produits agricoles canadiens pour les acheteurs commerciaux internationaux.";
    const url = lang === "en" ? englishUrl : frenchUrl;
    return { title: { absolute: title }, description, alternates: { canonical: url, languages: { "en-CA": englishUrl, "fr-CA": frenchUrl, "x-default": englishUrl } }, openGraph: { title, description, url, siteName: "Demlog Customs & Trade Inc.", locale: lang === "en" ? "en_CA" : "fr_CA", type: "website", images: ["/og-image.png"] }, robots: { index: true, follow: true } };
  }
  const found = slug === "home" ? { title: lang === "en" ? "Canadian Customs Broker" : "Courtier en douane canadien", description: lang === "en" ? "Licensed Canadian customs broker providing Canada-wide customs clearance for commercial imports by highway, air, ocean and courier." : "Courtier en douane canadien agréé offrant le dédouanement partout au Canada pour les importations commerciales par route, air, mer et messagerie." } : findPage(slug, lang);
  const sp = special[slug]; const title = found?.title || (sp ? sp[lang === "en" ? 0 : 1] : "Demlog"); const description = articleDescriptions[slug]?.[lang === "en" ? 0 : 1] || found?.description || (sp ? sp[lang === "en" ? 2 : 3] : "Demlog Customs & Trade Inc."); const suffix = slug === "home" ? "" : `/${slug}`; const path = `/${lang}${suffix}`;
  return { title: `${title} | Demlog Customs & Trade`, description, alternates: { canonical: `${SITE}${path}`, languages: { "en-CA": `${SITE}/en${suffix}`, "fr-CA": `${SITE}/fr${suffix}`, "x-default": `${SITE}/en${suffix}` } }, openGraph: { title, description, url: `${SITE}${path}`, siteName: "Demlog Customs & Trade Inc.", locale: lang === "en" ? "en_CA" : "fr_CA", type: "website", images: ["/og-image.png"] }, robots: { index: true, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const p = await params;
  if (p.lang !== "en" && p.lang !== "fr") notFound();
  const slug = p.slug?.join("/") || "home";
  const isTrade = (p.lang === "en" && slug === "international-trade") || (p.lang === "fr" && slug === "commerce-international");
  if (slug !== "home" && !isTrade && !findPage(slug, p.lang)) notFound();
  return <SitePage lang={p.lang} slug={slug} />;
}
