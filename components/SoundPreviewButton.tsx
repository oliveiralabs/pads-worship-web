"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale, SoundItem } from "@/lib/types";

type PreviewState = "idle" | "loading" | "playing" | "error";

export function SoundPreviewButton({ items, locale }: { items: SoundItem[]; locale: Locale }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastIndexRef = useRef(-1);
  const [state, setState] = useState<PreviewState>("idle");
  const [note, setNote] = useState("");

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  const playRandomNote = async () => {
    if (!items.length) return;

    audioRef.current?.pause();
    const offset = items.length > 1 ? 1 + Math.floor(Math.random() * (items.length - 1)) : 0;
    const index = items.length > 1 ? (lastIndexRef.current + offset + items.length) % items.length : 0;
    const item = items[index];
    lastIndexRef.current = index;
    setNote(item.name);
    setState("loading");

    const audio = new Audio(item.audioUrl);
    audio.preload = "auto";
    audioRef.current = audio;
    audio.addEventListener("playing", () => setState("playing"), { once: true });
    audio.addEventListener("ended", () => setState("idle"), { once: true });
    audio.addEventListener("error", () => setState("error"), { once: true });

    try {
      await audio.play();
    } catch {
      setState("error");
    }
  };

  const text = locale === "pt"
    ? {
        eyebrow: "PRÉVIA DO SOM",
        action: "Experimentar",
        loading: `Carregando ${note}…`,
        playing: `Tocando a nota ${note}`,
        idle: "Cada clique reproduz uma nota aleatória deste kit.",
        error: "Não foi possível reproduzir agora. Tente novamente.",
      }
    : {
        eyebrow: "SOUND PREVIEW",
        action: "Try this sound",
        loading: `Loading ${note}…`,
        playing: `Playing note ${note}`,
        idle: "Each click plays a random note from this pad kit.",
        error: "Unable to play right now. Please try again.",
      };

  const status = state === "loading" ? text.loading : state === "playing" ? text.playing : state === "error" ? text.error : text.idle;

  return (
    <div className={`sound-preview${state === "playing" ? " is-playing" : ""}`}>
      <button type="button" onClick={playRandomNote} aria-label={text.action}>
        <span className="preview-play-icon" aria-hidden="true">▶</span>
        <span><small>{text.eyebrow}</small><strong>{text.action}</strong></span>
      </button>
      <p aria-live="polite">{status}</p>
    </div>
  );
}
