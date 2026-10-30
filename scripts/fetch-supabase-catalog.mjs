import { readFile, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function resolveConfig() {
  if (process.env.PADSWORSHIP_SUPABASE_URL && process.env.PADSWORSHIP_SUPABASE_ANON_KEY) {
    return { url: process.env.PADSWORSHIP_SUPABASE_URL.replace(/\/$/, ""), key: process.env.PADSWORSHIP_SUPABASE_ANON_KEY };
  }
  const androidRoot = process.env.PADSWORSHIP_ANDROID_ROOT || path.join(os.homedir(), "AndroidStudioProjects", "PadsWorshipNew");
  const gradle = await readFile(path.join(androidRoot, "app", "build.gradle.kts"), "utf8");
  const readField = (name) => gradle.match(new RegExp(`${name}", "\\\\"([^\\"]+)\\\\"`))?.[1];
  const url = readField("SUPABASE_URL");
  const key = readField("SUPABASE_ANON_KEY");
  if (!url || !key) throw new Error("Set Supabase environment variables or PADSWORSHIP_ANDROID_ROOT.");
  return { url, key };
}

const { url, key } = await resolveConfig();
const headers = { apikey: key, Authorization: `Bearer ${key}` };
const kitColumns = "id,name,type,image_url,is_premium,is_default,need_user_task,sort_order";
const kitsResponse = await fetch(`${url}/rest/v1/kits?select=${kitColumns}&type=eq.ambient&order=sort_order.asc`, { headers });
if (!kitsResponse.ok) throw new Error(`Supabase kits request failed (${kitsResponse.status}).`);
const kits = await kitsResponse.json();
if (!Array.isArray(kits) || !kits.length) throw new Error("Supabase returned no ambient pad sounds.");

const ids = kits.map((kit) => `"${kit.id}"`).join(",");
const itemColumns = "id,kit_id,name,audio_url,sort_order";
const itemsResponse = await fetch(`${url}/rest/v1/kit_items?select=${itemColumns}&kit_id=in.(${encodeURIComponent(ids)})&order=sort_order.asc`, { headers });
if (!itemsResponse.ok) throw new Error(`Supabase items request failed (${itemsResponse.status}).`);
const items = await itemsResponse.json();

const destination = path.join(root, "data", "source");
await mkdir(destination, { recursive: true });
await writeFile(path.join(destination, "supabase-kits.json"), `${JSON.stringify(kits, null, 2)}\n`);
await writeFile(path.join(destination, "kit-items.json"), `${JSON.stringify(items, null, 2)}\n`);
console.log(`Catalog refreshed: ${kits.length} pad sounds and ${items.length} note samples.`);
