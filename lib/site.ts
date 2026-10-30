import type { Locale } from "./types";

export const siteUrl = "https://padsworship.com";
export const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.oliveiralabs.padsworship";
export const appStoreUrl =
  "https://apps.apple.com/us/app/pads-worship/id6763444385";
export const supportEmail = "antonio.filho128@gmail.com";
export const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || "";
export const isProductionIndexing =
  process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function localizedPath(path: string, locale: Locale) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "pt" ? `/pt${normalized}` : normalized;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
