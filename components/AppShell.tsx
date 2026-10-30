import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { localizedPath, supportEmail } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { StoreButtons } from "./StoreButton";

export function Header({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const otherLocale = locale === "pt" ? "en" : "pt";
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href={locale === "pt" ? "/pt/" : "/"} aria-label="Pads Worship">
          <Image src="/brand/pads-worship-icon.png" alt="" width={46} height={46} priority />
          <span>Pads Worship</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href={localizedPath("/sounds/", locale)}>{t.nav.sounds}</Link>
          <Link href={`${locale === "pt" ? "/pt/" : "/"}#features`}>{t.nav.features}</Link>
          <Link href={localizedPath("/help/", locale)}>{t.nav.help}</Link>
        </nav>
        <div className="nav-actions">
          <Link className="language-link" href={otherLocale === "pt" ? "/pt/" : "/"} lang={otherLocale}>{t.nav.language}</Link>
          <StoreButtons locale={locale} compact />
        </div>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const home = locale === "pt" ? "/pt/" : "/";
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand" href={home}>
            <Image src="/brand/pads-worship-icon.png" alt="" width={46} height={46} />
            <span>Pads Worship</span>
          </Link>
          <p>{t.footer.line}</p>
        </div>
        <div>
          <h2>{t.footer.discover}</h2>
          <Link href={localizedPath("/sounds/", locale)}>{t.nav.sounds}</Link>
          <Link href={localizedPath("/download/", locale)}>{t.nav.download}</Link>
          <Link href={localizedPath("/help/", locale)}>{t.footer.help}</Link>
        </div>
        <div>
          <h2>{t.footer.legal}</h2>
          <Link href={localizedPath("/privacy/", locale)}>{t.footer.privacy}</Link>
          <Link href={localizedPath("/terms/", locale)}>{t.footer.terms}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{t.footer.rights}</span>
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
      </div>
    </footer>
  );
}

export function PageShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <><Header locale={locale} />{children}<Footer locale={locale} /></>;
}
