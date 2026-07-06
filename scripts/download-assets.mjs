// Downloads all binary assets from the live flovers-prague site into public/.
// Run: node scripts/download-assets.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE = "https://flovers-prague.vercel.app";
const OUT = new URL("../public/", import.meta.url).pathname;

const images = [
  "instagram1", "instagram2", "instagram3", "instagram4", "instagram6",
  "gmaps1", "gmaps2", "gmaps3", "gmaps4", "gmaps5",
  "gmaps6", "gmaps7", "gmaps8", "gmaps9", "gmaps10",
].map((n) => `/images/${n}.jpg`);

const assets = [...images, "/icon.svg"];

async function download(path) {
  const url = BASE + path;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(OUT, path);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { path, bytes: buf.length };
}

// batched parallel downloads, 4 at a time
async function run() {
  const results = [];
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    const settled = await Promise.allSettled(batch.map(download));
    settled.forEach((s, j) => {
      if (s.status === "fulfilled") {
        results.push(s.value);
        console.log(`  ✓ ${s.value.path} (${(s.value.bytes / 1024).toFixed(0)} KB)`);
      } else {
        console.error(`  ✗ ${batch[j]}: ${s.reason.message}`);
      }
    });
  }
  console.log(`\nDownloaded ${results.length}/${assets.length} assets.`);
}

run();
