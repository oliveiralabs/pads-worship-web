import { ContentPage } from "@/components/ContentPage";
import { StoreButton } from "@/components/StoreButton";
import { getCopy } from "@/lib/copy";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({ title: "Baixe o aplicativo", description: "Baixe o Pads Worship para Android.", path: "/pt/download/", locale: "pt" });
export default function Page() { const t = getCopy("pt").download; return <ContentPage locale="pt" eyebrow={t.eyebrow} title={t.title} lead={t.body}><StoreButton label={t.button} /></ContentPage>; }
