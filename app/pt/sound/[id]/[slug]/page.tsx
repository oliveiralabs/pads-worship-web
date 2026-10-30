import { notFound } from "next/navigation";
import { SoundDetailPage } from "@/components/SoundDetailPage";
import { getAllSounds, getSound, soundRoute } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return getAllSounds().map((sound) => ({ id: sound.id, slug: sound.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string; slug: string }> }) { const { id, slug } = await params; const sound = getSound(id); if (!sound || sound.slug !== slug) return {}; return pageMetadata({ title: `${sound.name} — som de pad ambiente`, description: sound.descriptionPt, path: soundRoute(sound, "pt"), locale: "pt", image: sound.cover }); }
export default async function Page({ params }: { params: Promise<{ id: string; slug: string }> }) { const { id, slug } = await params; const sound = getSound(id); if (!sound || sound.slug !== slug) notFound(); return <SoundDetailPage sound={sound} locale="pt" />; }
