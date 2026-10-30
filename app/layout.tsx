import type { Metadata, Viewport } from "next";
import "./globals.css";
import { isProductionIndexing, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Pads Worship — Ambient pads for worship and live music", template: "%s — Pads Worship" },
  description: "Ambient pads, sequences, drum kits, and metronome for worship, prayer, rehearsal, and live music.",
  applicationName: "Pads Worship",
  icons: { icon: "/brand/pads-worship-icon.png", apple: "/brand/pads-worship-icon.png" },
  robots: isProductionIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Pads Worship", images: [{ url: "/brand/pads-worship-social.png", width: 1200, height: 630, alt: "Pads Worship ambient pad player" }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#06142f", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
