import nextEnv from "@next/env";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const { loadEnvConfig } = nextEnv;

// Load environment variables from current working directory
loadEnvConfig(process.cwd());

if (!process.env.GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN is missing from environment variables.");
  process.exit(1);
}

const BASE = process.env.NODE_ENV !== "development"
  ? process.env.PRIVATE_REPO_URL
  : "https://api.github.com/repos/tamucybersec/Site-Content/contents/data";

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

// Define target directory and ensure it exists FIRST
const outputDir = path.join(process.cwd(), "src/data/new_data");

if (!existsSync(outputDir)) {
  await mkdir(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}
await mkdir(outputDir, { recursive: true });

for (const name of FILES) {
  try {
    const res = await fetch(`${BASE}/${name}.json`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.raw+json",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub responded ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const filePath = path.join(outputDir, `${name}.json`);

    await writeFile(
      path.join(outputDir, `${name}.json`),
      JSON.stringify(json, null, 2)
    );
    console.log(`Synced ${name}.json`);
  } catch (e) {
    console.warn(`Sync failed for ${name}.json:`, e.message);
  }
}