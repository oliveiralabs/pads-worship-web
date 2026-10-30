"use client";

import { useMemo, useState } from "react";
import type { Locale, PadSound } from "@/lib/types";
import { getCopy } from "@/lib/copy";
import { SoundCard } from "./SoundCard";

type Filter = "all" | "free" | "premium";

export function CatalogGrid({ sounds, locale }: { sounds: PadSound[]; locale: Locale }) {
  const t = getCopy(locale).catalog;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => sounds.filter((sound) => {
    const queryMatch = sound.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    const filterMatch = filter === "all" || (filter === "premium" ? sound.isPremium : !sound.isPremium);
    return queryMatch && filterMatch;
  }), [sounds, query, filter]);
  return <>
    <div className="catalog-controls">
      <label><span className="sr-only">{t.filter}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.filter} /></label>
      <div className="filter-tabs">
        {(["all", "free", "premium"] as Filter[]).map((value) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)} type="button">{t[value]}</button>)}
      </div>
    </div>
    <p className="result-count">{visible.length} {t.count}</p>
    {visible.length ? <div className="sound-grid">{visible.map((sound) => <SoundCard key={sound.id} sound={sound} locale={locale} />)}</div> : <div className="empty-state">{t.noResults}</div>}
  </>;
}
