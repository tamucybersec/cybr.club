import nextEnv from "@next/env";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const { loadEnvConfig } = nextEnv;

// Load environment variables from current working directory
loadEnvConfig(process.cwd());

const ROOT = process.env.PRIVATE_REPO_URL;

const BASE =
  process.env.NODE_ENV !== "development"
    ? `${ROOT}/data`
    : "https://api.github.com/repos/tamucybersec/Site-Content/contents/data";

// Repo "contents" root (used for images).
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

const outputDir = path.join(process.cwd(), "src/data/new_data");
await mkdir(outputDir, { recursive: true });

const hasToken = Boolean(process.env.GITHUB_TOKEN && BASE);

if (!hasToken) {
  console.warn(
    "GITHUB_TOKEN or repo URL missing, skipping sync and keeping local data."
  );
} else {
  const authHeaders = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };
  const rawHeaders = {
    ...authHeaders,
    Accept: "application/vnd.github.raw+json",
  };

  // ---- JSON sync ----
  for (const name of FILES) {
    try {
      const res = await fetch(`${BASE}/${name}.json`, { headers: rawHeaders });
      if (!res.ok) {
        throw new Error(`GitHub responded ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      await writeFile(
        path.join(outputDir, `${name}.json`),
        JSON.stringify(json, null, 2)
      );
      console.log(`Synced ${name}.json`);
    } catch (e) {
      console.warn(`Sync failed for ${name}.json:`, e.message);
    }
  }

  // ---- Image sync ----
  async function syncDir(remoteDir, localDir) {
    const res = await fetch(`${ROOT}/${remoteDir}`, { headers: authHeaders });
    if (!res.ok) {
      throw new Error(`GitHub responded ${res.status} for ${remoteDir}`);
    }
    const items = await res.json();
    await mkdir(localDir, { recursive: true });

    for (const item of items) {
      if (item.type === "dir") {
        await syncDir(item.path, path.join(localDir, item.name));
      } else if (item.type === "file") {
        const file = await fetch(`${ROOT}/${item.path}`, {
          headers: rawHeaders,
        });
        if (!file.ok) {
          throw new Error(`GitHub responded ${file.status} for ${item.path}`);
        }
        await writeFile(
          path.join(localDir, item.name),
          Buffer.from(await file.arrayBuffer())
        );
      }
    }
  }

  try {
    await syncDir("images", path.join(process.cwd(), "public/images"));
    console.log("Synced images");
  } catch (e) {
    console.warn("Image sync failed:", e.message);
  }
}
