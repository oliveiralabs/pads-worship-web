import Image from "next/image";
import { googlePlayUrl } from "@/lib/site";

export function StoreButton({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <a className={`store-button${compact ? " store-button-compact" : ""}`} href={googlePlayUrl} target="_blank" rel="noreferrer" aria-label={label}>
      <Image src="/brand/google-play-en.png" alt={label} width={206} height={80} />
    </a>
  );
}
