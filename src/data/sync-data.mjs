import { writeFile } from "node:fs/promises";

const BASE =
  "https://api.github.com/repos/tamucybersec/Site-Content/contents/data";

const FILES = [
  "accolades",
  "activityGroups",
  "alumni",
  "certifications",
  "committees",
  "events",
  "leadership",
  "photos",
  "sponsors",
];

for (const name of FILES) {
  try {
    const res = await fetch(`${BASE}/${name}.json`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.raw+json",
      },
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const json = await res.json();
    await writeFile(`new_data/${name}.json`, JSON.stringify(json, null, 2));
    console.log(`Synced ${name}.json`);
  } catch (e) {
    console.warn(`Sync failed for ${name}.json, keeping local file:`, e.message);
  }
}