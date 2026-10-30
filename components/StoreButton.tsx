import Image from "next/image";
import { appStoreUrl, googlePlayUrl } from "@/lib/site";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/types";

export function StoreButtons({ locale, soundId, compact = false }: { locale: Locale; soundId?: string; compact?: boolean }) {
  const text = getCopy(locale).stores;
  const referrer = soundId
    ? `&referrer=utm_source%3Dpadsworship.com%26utm_medium%3Dsound_page%26utm_content%3Dsound_${soundId}`
    : "";

  return (
    <div className={`store-buttons${compact ? " store-buttons-compact" : ""}`}>
      <a className="store-button store-button-apple" href={appStoreUrl} target="_blank" rel="noreferrer" aria-label={text.apple} data-event="click_app_store" data-sound-id={soundId}>
        <Image src="/brand/app-store-en.svg" alt={text.apple} width={120} height={40} />
      </a>
      <a className="store-button store-button-google" href={`${googlePlayUrl}${referrer}`} target="_blank" rel="noreferrer" aria-label={text.google} data-event="click_google_play" data-sound-id={soundId}>
        <Image src="/brand/google-play-en.png" alt={text.google} width={206} height={80} />
      </a>
    </div>
  );
}
