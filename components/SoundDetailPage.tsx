import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { relatedSounds } from "@/lib/catalog";
import { localizedPath } from "@/lib/site";
import type { Locale, PadSound } from "@/lib/types";
import { PageShell } from "./AppShell";
import { PadPlayer } from "./PadPlayer";
import { SoundCard } from "./SoundCard";
import { StoreButton } from "./StoreButton";

export function SoundDetailPage({ sound, locale }: { sound: PadSound; locale: Locale }) {
  const t = getCopy(locale);
  const related = relatedSounds(sound);
  return (
    <PageShell locale={locale}>
      <main>
        <div className="shell breadcrumbs"><Link href={locale === "pt" ? "/pt/" : "/"}>{t.sound.home}</Link><span>/</span><Link href={localizedPath("/sounds/", locale)}>{t.sound.sounds}</Link><span>/</span><b>{sound.name}</b></div>
        <section className="shell detail-hero">
          <div className="detail-cover"><Image src={sound.cover} alt={`${sound.name} pad sound cover`} fill priority sizes="(max-width: 900px) 100vw, 56vw" /><span className={`access-pill access-${sound.access}`}>{t.access[sound.access]}</span></div>
          <div className="detail-copy"><p className="eyebrow">{t.sound.official}</p><h1>{sound.name}</h1><p className="lead">{locale === "pt" ? sound.descriptionPt : sound.description}</p><dl><div><dt>{t.sound.access}</dt><dd>{t.access[sound.access]}</dd></div><div><dt>{t.sound.notes}</dt><dd>{sound.items.map((item) => item.name).join(" · ")}</dd></div></dl></div>
        </section>
        <section className="detail-player-section">
          <div className="shell detail-player-grid"><div><p className="eyebrow">{t.sound.preview}</p><h2>{locale === "pt" ? `Toque ${sound.name}` : `Play ${sound.name}`}</h2><p>{t.sound.previewHelp}</p></div><PadPlayer items={sound.items} locale={locale} compact /></div>
        </section>
        <section className="section detail-cta"><div className="shell detail-cta-inner"><div><p className="eyebrow">{t.sound.available}</p><h2>{t.sound.use}</h2><p>{t.sound.note}</p></div><StoreButton label={t.download.button} /></div></section>
        <section className="section related-section"><div className="shell"><div className="section-heading"><h2>{t.sound.more}</h2><Link className="section-link" href={localizedPath("/sounds/", locale)}>{t.sound.viewAll}<span>→</span></Link></div><div className="sound-grid">{related.map((item) => <SoundCard key={item.id} sound={item} locale={locale} />)}</div></div></section>
      </main>
    </PageShell>
  );
}
