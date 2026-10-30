import type { Metadata } from "next";
import { absoluteUrl, siteUrl } from "./site";
import type { Locale } from "./types";

type Input = { title: string; description: string; path: string; locale: Locale; image?: string };

export function pageMetadata({ title, description, path, locale, image = "/brand/pads-worship-icon.png" }: Input): Metadata {
  const url = absoluteUrl(path);
  const alternatePath = locale === "pt" ? path.replace(/^\/pt/, "") || "/" : `/pt${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: locale === "en" ? url : absoluteUrl(alternatePath), "pt-BR": locale === "pt" ? url : absoluteUrl(alternatePath), "x-default": siteUrl } },
    openGraph: { title, description, url, type: "website", locale: locale === "pt" ? "pt_BR" : "en_US", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
