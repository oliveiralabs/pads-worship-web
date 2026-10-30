import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "data", "source");
const kits = JSON.parse(await readFile(path.join(sourceDir, "supabase-kits.json"), "utf8"));
const items = JSON.parse(await readFile(path.join(sourceDir, "kit-items.json"), "utf8"));
const featuredNames = ["Epicsaw", "Atmosphere", "Celestial Flow", "Sweeper Flanger", "Soft Over", "Dream Aron Major"];

function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const catalog = kits.map((kit) => {
  const access = kit.is_premium ? "premium" : kit.need_user_task ? "task" : "free";
  return {
    id: kit.id,
    name: kit.name,
    slug: slugify(kit.name),
    access,
    isPremium: kit.is_premium,
    isDefault: kit.is_default,
    needUserTask: kit.need_user_task,
    sortOrder: kit.sort_order,
    cover: `/catalog/sounds/${kit.id}/cover.png`,
    sourceCoverUrl: kit.image_url,
    featured: featuredNames.includes(kit.name),
    description: `${kit.name} is an official Pads Worship ambient sound, shaped for sustained notes during worship, prayer, rehearsal, and live music.`,
    descriptionPt: `${kit.name} é um som ambiente oficial do Pads Worship, criado para notas sustentadas em momentos de adoração, oração, ensaio e música ao vivo.`,
    items: items.filter((item) => item.kit_id === kit.id).sort((a, b) => a.sort_order - b.sort_order).map((item) => ({ id: item.id, name: item.name, audioUrl: item.audio_url, sortOrder: item.sort_order })),
  };
});

for (const sound of catalog) {
  const directory = path.join(root, "public", "catalog", "sounds", sound.id);
  const destination = path.join(directory, "cover.png");
  await mkdir(directory, { recursive: true });
  if (!existsSync(destination) || process.env.PADSWORSHIP_REFRESH_ASSETS === "1") {
    const response = await fetch(sound.sourceCoverUrl);
    if (!response.ok) throw new Error(`Cover download failed (${response.status}): ${sound.sourceCoverUrl}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }
}

const brandDir = path.join(root, "public", "brand");
await mkdir(brandDir, { recursive: true });
const legacyRoot = process.env.PADSWORSHIP_LEGACY_ROOT || path.join(os.homedir(), "Documents", "oliveiralabs-github", "oliveiralabs.github.io");
const brandCopies = [
  [path.join(legacyRoot, "assets", "img", "app-pads-worship-play.png"), path.join(brandDir, "pads-worship-icon.png")],
  [path.join(legacyRoot, "assets", "img", "store", "google-play-en.png"), path.join(brandDir, "google-play-en.png")],
];
for (const [source, destination] of brandCopies) {
  if (!existsSync(destination)) await copyFile(source, destination);
}

await mkdir(path.join(root, "data", "generated"), { recursive: true });
await writeFile(path.join(root, "data", "generated", "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Catalog synchronized: ${catalog.length} sounds, ${catalog.reduce((total, sound) => total + sound.items.length, 0)} samples.`);
