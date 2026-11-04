import Image from "next/image";
import Link from "next/link";
import { soundRoute } from "@/lib/catalog";
import type { Locale, PadSound } from "@/lib/types";

export function SoundCard({ sound, locale }: { sound: PadSound; locale: Locale }) {
  return (
    <Link className="sound-card" href={soundRoute(sound, locale)}>
      <span className="sound-cover">
        <Image src={sound.cover} alt={`${sound.name} pad sound cover`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
      </span>
      <span className="sound-card-copy">
        <span><small>{sound.items.length} {locale === "pt" ? "notas" : "notes"}</small><strong>{sound.name}</strong></span>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}
