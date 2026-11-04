import { HomePage } from "@/components/HomePage";
import { getAllSounds } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Pads ambientes para adoração e música ao vivo", description: "Toque pads ambientes, crie sequências, adicione bateria e mantenha o tempo com o Pads Worship.", path: "/pt/", locale: "pt" });
export default function Page() { return <HomePage locale="pt" sounds={getAllSounds()} />; }
