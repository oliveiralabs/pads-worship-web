import { PageShell } from "@/components/AppShell";
import { CatalogGrid } from "@/components/CatalogPage";
import { getAllSounds } from "@/lib/catalog";
import { getCopy } from "@/lib/copy";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Ambient pad sound library", description: "Explore every official ambient pad sound available in Pads Worship.", path: "/sounds/", locale: "en" });
export default function Page() { const t = getCopy("en").catalog; return <PageShell locale="en"><main id="main"><section className="page-hero"><div className="shell"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="lead">{t.body}</p></div></section><section className="section catalog-section"><div className="shell"><CatalogGrid sounds={getAllSounds()} locale="en" /></div></section></main></PageShell>; }
