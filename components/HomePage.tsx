import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { localizedPath } from "@/lib/site";
import type { Locale, PadSound } from "@/lib/types";
import { PageShell } from "./AppShell";
import { HeroPadDemo } from "./HeroPadDemo";
import { SoundCard } from "./SoundCard";
import { StoreButtons } from "./StoreButton";

export function HomePage({ locale, sounds }: { locale: Locale; sounds: PadSound[] }) {
  const t = getCopy(locale);
  const demoSound = sounds.find((sound) => sound.slug === "atmosphere") ?? sounds[0];
  const downloadHref = localizedPath("/download/", locale);
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
            <div className="hero-art"><HeroPadDemo sound={demoSound} locale={locale} downloadHref={downloadHref} /></div>
          </div>
        </section>

        <section className="section feature-section" id="features">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">{t.features.eyebrow}</p><h2>{t.features.title}</h2></div></div>
            <div className="feature-grid">
              <article className="feature-card"><span className="feature-number">01</span><div className="feature-symbol">∞</div><h3>{t.features.padsTitle}</h3><p>{t.features.padsBody}</p></article>
              <article className="feature-card"><span className="feature-number">02</span><div className="feature-symbol feature-chords"><span>C</span><i>→</i><span>Am</span><i>→</i><span>F</span></div><h3>{t.features.sequenceTitle}</h3><p>{t.features.sequenceBody}</p></article>
              <article className="feature-card"><span className="feature-number">03</span><div className="feature-symbol feature-tempo"><b>72</b><small>BPM</small></div><h3>{t.features.rhythmTitle}</h3><p>{t.features.rhythmBody}</p></article>
            </div>
          </div>
        </section>

        <section className="section catalog-preview">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">{t.catalog.eyebrow}</p><h2>{t.catalog.title}</h2><p className="section-intro">{t.catalog.body}</p></div></div>
            <div className="sound-grid">{sounds.map((sound) => <SoundCard key={sound.id} sound={sound} locale={locale} />)}</div>
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
