import { HomePage } from "@/components/HomePage";
import { getFeaturedSounds } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Ambient pads for worship and live music", description: "Play ambient pads, build sequences, add drums, and keep time with Pads Worship.", path: "/", locale: "en" });
export default function Page() { return <HomePage locale="en" featured={getFeaturedSounds()} />; }
