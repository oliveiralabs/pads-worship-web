"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, SoundItem } from "@/lib/types";
import { getCopy } from "@/lib/copy";

const keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "."];

export function PadPlayer({ items, locale, compact = false }: { items: SoundItem[]; locale: Locale; compact?: boolean }) {
  const t = getCopy(locale).player;
  const audio = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const stop = useCallback(() => {
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current = null;
    }
    setActiveId(null);
  }, []);

  const play = useCallback((item: SoundItem) => {
    if (activeId === item.id) { stop(); return; }
    if (audio.current) audio.current.pause();
    const next = new Audio(item.audioUrl);
    next.loop = true;
    next.volume = 0.86;
    next.play().then(() => { audio.current = next; setActiveId(item.id); }).catch(() => setActiveId(null));
  }, [activeId, stop]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      const index = keys.findIndex((key) => key.toLowerCase() === event.key.toLowerCase());
      if (index >= 0 && items[index]) play(items[index]);
      if (event.key === "Escape") stop();
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); stop(); };
  }, [items, play, stop]);

  const active = items.find((item) => item.id === activeId);
  return (
    <div className={`pad-player${compact ? " pad-player-compact" : ""}`}>
      <div className="player-status" aria-live="polite">
        <span className={active ? "status-light is-playing" : "status-light"} />
        <span><small>{active ? t.playing : t.stopped}</small><strong>{active?.name ?? "Pads Worship"}</strong></span>
        {active ? <button type="button" onClick={stop}>{t.stop}</button> : null}
      </div>
      <div className="pad-grid">
        {items.map((item, index) => (
          <button key={item.id} type="button" className={activeId === item.id ? "pad-key is-active" : "pad-key"} onClick={() => play(item)} aria-pressed={activeId === item.id}>
            <span>{item.name}</span><kbd>{keys[index] ?? ""}</kbd>
          </button>
        ))}
      </div>
      {!compact ? <p className="keyboard-hint"><span>⌨</span> {t.keyboard}: A—{keys[Math.min(items.length - 1, keys.length - 1)]} · Esc</p> : null}
    </div>
  );
}
