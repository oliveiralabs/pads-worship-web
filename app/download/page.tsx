import { ContentPage } from "@/components/ContentPage";
import { StoreButton } from "@/components/StoreButton";
import { getCopy } from "@/lib/copy";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({ title: "Download the app", description: "Get Pads Worship for Android.", path: "/download/", locale: "en" });
export default function Page() { const t = getCopy("en").download; return <ContentPage locale="en" eyebrow={t.eyebrow} title={t.title} lead={t.body}><StoreButton label={t.button} /></ContentPage>; }
