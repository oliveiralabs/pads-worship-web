import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { localizedPath } from "@/lib/site";
import type { Locale, PadSound } from "@/lib/types";
import { PageShell } from "./AppShell";
import { SoundCard } from "./SoundCard";
import { StoreButtons } from "./StoreButton";

export function HomePage({ locale, featured }: { locale: Locale; featured: PadSound[] }) {
  const t = getCopy(locale);
  return (
    <PageShell locale={locale}>
      <main id="main">
        <section className="hero">
          <div className="hero-glow" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.body}</p>
              <div className="hero-actions">
                <StoreButtons locale={locale} />
                <Link className="text-link" href={localizedPath("/sounds/", locale)}>{t.hero.explore}<span>↗</span></Link>
              </div>
            </div>
            <div className="hero-art" aria-label="Pads Worship app preview">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="phone-frame">
                <div className="phone-top"><Image src="/brand/pads-worship-icon.png" alt="" width={36} height={36} /><span>Pads Worship</span><b>•••</b></div>
                <div className="phone-cover"><Image src={featured[0].cover} alt={`${featured[0].name} cover`} fill sizes="460px" /></div>
                <div className="phone-now"><small>{locale === "pt" ? "TOCANDO AGORA" : "NOW PLAYING"}</small><strong>{featured[0].name}</strong><span>C major · 70 BPM</span></div>
                <div className="phone-pads">{["C", "D", "E", "F", "G", "A"].map((note, index) => <span key={note} className={index === 0 ? "active" : ""}>{note}</span>)}</div>
                <div className="phone-wave">{Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ height: `${14 + ((i * 17) % 34)}px` }} />)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section feature-section" id="features">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">{t.features.eyebrow}</p><h2>{t.features.title}</h2></div></div>
            <div className="feature-grid">
              <article className="feature-card feature-card-large"><span className="feature-number">01</span><div className="feature-visual pad-rings"><i /><i /><i /></div><h3>{t.features.padsTitle}</h3><p>{t.features.padsBody}</p></article>
              <article className="feature-card"><span className="feature-number">02</span><div className="sequence-visual">{["C", "Am", "F", "G"].map((note, i) => <span key={note} className={i === 1 ? "minor" : ""}>{note}<i /></span>)}</div><h3>{t.features.sequenceTitle}</h3><p>{t.features.sequenceBody}</p></article>
              <article className="feature-card"><span className="feature-number">03</span><div className="metronome-visual"><span>72</span><small>BPM</small><i /></div><h3>{t.features.rhythmTitle}</h3><p>{t.features.rhythmBody}</p></article>
            </div>
          </div>
        </section>

        <section className="section catalog-preview">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">{t.catalog.eyebrow}</p><h2>{t.catalog.title}</h2></div><Link className="section-link" href={localizedPath("/sounds/", locale)}>{t.hero.explore}<span>→</span></Link></div>
            <div className="sound-grid">{featured.slice(0, 6).map((sound) => <SoundCard key={sound.id} sound={sound} locale={locale} />)}</div>
          </div>
        </section>

        <section className="download-band">
          <div className="shell download-grid">
            <div><p className="eyebrow">{t.download.eyebrow}</p><h2>{t.download.title}</h2><p className="lead">{t.download.body}</p><StoreButtons locale={locale} /></div>
            <div className="infinity-mark"><Image src="/brand/pads-worship-icon.png" alt="Pads Worship" width={310} height={310} /></div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
