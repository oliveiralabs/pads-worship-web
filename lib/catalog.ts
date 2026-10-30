import catalogData from "@/data/generated/catalog.json";
import type { Locale, PadSound } from "./types";

const sounds = catalogData as PadSound[];

export function getAllSounds() { return sounds; }
export function getFeaturedSounds() { return sounds.filter((sound) => sound.featured); }
export function getSound(id: string) { return sounds.find((sound) => sound.id === id); }

export function soundRoute(sound: PadSound, locale: Locale = "en") {
  const prefix = locale === "pt" ? "/pt" : "";
  return `${prefix}/sound/${sound.id}/${sound.slug}/`;
}

export function relatedSounds(sound: PadSound, limit = 3) {
  return sounds
    .filter((candidate) => candidate.id !== sound.id)
    .sort((a, b) => Math.abs(a.sortOrder - sound.sortOrder) - Math.abs(b.sortOrder - sound.sortOrder))
    .slice(0, limit);
}
