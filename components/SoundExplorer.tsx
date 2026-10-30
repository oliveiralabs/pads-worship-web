"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale, PadSound } from "@/lib/types";
import { PadPlayer } from "./PadPlayer";

export function SoundExplorer({ sounds, locale }: { sounds: PadSound[]; locale: Locale }) {
  const [selected, setSelected] = useState(sounds[0]);
  return (
    <div className="sound-explorer">
      <div className="sound-tabs" role="tablist" aria-label="Pad sound">
        {sounds.map((sound) => (
          <button key={sound.id} type="button" role="tab" aria-selected={selected.id === sound.id} onClick={() => setSelected(sound)}>
            <Image src={sound.cover} alt="" width={52} height={32} /><span>{sound.name}</span>
          </button>
        ))}
      </div>
      <PadPlayer key={selected.id} items={selected.items} locale={locale} />
    </div>
  );
}
