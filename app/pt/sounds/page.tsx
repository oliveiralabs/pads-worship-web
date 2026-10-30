import { PageShell } from "@/components/AppShell";
import { CatalogGrid } from "@/components/CatalogPage";
import { getAllSounds } from "@/lib/catalog";
import { getCopy } from "@/lib/copy";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Biblioteca de sons de pad ambiente", description: "Explore e ouça todos os sons de pad ambiente oficiais do Pads Worship.", path: "/pt/sounds/", locale: "pt" });
export default function Page() { const t = getCopy("pt").catalog; return <PageShell locale="pt"><main id="main"><section className="page-hero"><div className="shell"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="lead">{t.body}</p></div></section><section className="section catalog-section"><div className="shell"><CatalogGrid sounds={getAllSounds()} locale="pt" /></div></section></main></PageShell>; }
