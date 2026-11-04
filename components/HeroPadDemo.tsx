"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale, PadSound, SoundItem } from "@/lib/types";

type PlayerState = "idle" | "loading" | "playing" | "error";

export function HeroPadDemo({ sound, locale, downloadHref }: { sound: PadSound; locale: Locale; downloadHref: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [state, setState] = useState<PlayerState>("idle");
  const playableIds = useMemo(() => {
    const preferredNotes = new Set(["C", "G"]);
    const preferred = sound.items.filter((item) => preferredNotes.has(item.name.toUpperCase()));
    return new Set((preferred.length >= 2 ? preferred.slice(0, 2) : [sound.items[0], sound.items[7] ?? sound.items[1]]).filter(Boolean).map((item) => item.id));
  }, [sound.items]);

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setActiveId(null);
    setState("idle");
  };

  const play = async (item: SoundItem) => {
    if (activeId === item.id && state === "playing") {
      stop();
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(item.audioUrl);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.78;
    audioRef.current = audio;
    setActiveId(item.id);
    setState("loading");
    audio.addEventListener("playing", () => setState("playing"), { once: true });
    audio.addEventListener("error", () => setState("error"), { once: true });

    try {
      await audio.play();
    } catch {
      setState("error");
    }
  };

  const text = locale === "pt"
    ? {
        eyebrow: "EXPERIMENTE AGORA",
        title: "Atmosphere, direto do app",
        body: "Toque C ou G para ouvir o pad contínuo. As outras notas estão disponíveis no Pads Worship.",
        free: "Toque para ouvir",
        locked: "Abrir no app",
        playing: "Tocando continuamente",
        loading: "Carregando o som…",
        error: "Não foi possível tocar agora.",
        stop: "Parar",
      }
    : {
        eyebrow: "TRY IT NOW",
        title: "Atmosphere, straight from the app",
        body: "Play C or G to hear the continuous pad. The other notes are waiting in Pads Worship.",
        free: "Tap to play",
        locked: "Open in the app",
        playing: "Playing continuously",
        loading: "Loading sound…",
        error: "Unable to play right now.",
        stop: "Stop",
      };

  const status = state === "loading" ? text.loading : state === "error" ? text.error : state === "playing" ? text.playing : text.free;

  return (
    <div className="hero-demo" aria-label={text.title}>
      <div className="demo-heading">
        <div className="demo-cover"><Image src={sound.cover} alt="" fill sizes="88px" priority /></div>
        <div><small>{text.eyebrow}</small><h2>{text.title}</h2></div>
        {state === "playing" && <button className="demo-stop" type="button" onClick={stop}>{text.stop}</button>}
      </div>
      <p>{text.body}</p>
      <div className="demo-keys">
        {sound.items.map((item) => {
          const playable = playableIds.has(item.id);
          const isActive = activeId === item.id;
          return playable ? (
            <button
              className={`demo-key is-playable${isActive ? " is-active" : ""}`}
              type="button"
              key={item.id}
              onClick={() => play(item)}
              aria-pressed={isActive && state === "playing"}
            >
              <strong>{item.name}</strong><span>{isActive ? status : text.free}</span>
            </button>
          ) : (
            <Link className="demo-key is-locked" href={downloadHref} key={item.id} aria-label={`${item.name}: ${text.locked}`}>
              <strong>{item.name}</strong><span>{text.locked}</span><i aria-hidden="true">↗</i>
            </Link>
          );
        })}
      </div>
      <div className="demo-status" aria-live="polite"><span className={state === "playing" ? "is-live" : ""} />{activeId ? status : text.free}</div>
    </div>
  );
}
