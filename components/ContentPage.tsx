import type { Locale } from "@/lib/types";
import { PageShell } from "./AppShell";

export function ContentPage({ locale, eyebrow, title, lead, children }: { locale: Locale; eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <PageShell locale={locale}><main className="content-page"><article className="shell narrow"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{lead}</p>{children}</article></main></PageShell>;
}
