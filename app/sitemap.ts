import type { MetadataRoute } from "next";
import { getAllSounds, soundRoute } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const fixed = ["/", "/sounds/", "/download/", "/help/", "/privacy/", "/terms/", "/pt/", "/pt/sounds/", "/pt/download/", "/pt/help/", "/pt/privacy/", "/pt/terms/"]; return [...fixed.map((path) => ({ url: absoluteUrl(path), lastModified: new Date("2026-10-30"), changeFrequency: path.includes("sounds") ? "weekly" as const : "monthly" as const })), ...getAllSounds().flatMap((sound) => (["en", "pt"] as const).map((locale) => ({ url: absoluteUrl(soundRoute(sound, locale)), lastModified: new Date("2026-10-30"), changeFrequency: "weekly" as const })))]; }
