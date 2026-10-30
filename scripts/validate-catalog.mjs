import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "data", "generated", "catalog.json"), "utf8"));
if (!Array.isArray(catalog) || catalog.length < 1) throw new Error("Catalog is empty.");
const ids = new Set();
for (const sound of catalog) {
  if (!sound.id || !sound.name || !sound.slug || !sound.cover) throw new Error(`Invalid sound: ${JSON.stringify(sound)}`);
  if (ids.has(sound.id)) throw new Error(`Duplicate sound id: ${sound.id}`);
  if (!Array.isArray(sound.items) || !sound.items.length) throw new Error(`Sound has no note samples: ${sound.name}`);
  if (sound.items.some((item) => !item.audioUrl?.startsWith("https://"))) throw new Error(`Invalid audio URL in ${sound.name}`);
  ids.add(sound.id);
}
console.log(`Catalog valid: ${catalog.length} sounds.`);
