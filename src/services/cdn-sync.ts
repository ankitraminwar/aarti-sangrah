import { CDN_URL, STALE_TIME_MS } from "@/src/constants";
import { getSyncMeta, setSyncMeta, upsertAartis } from "@/src/database";
import type { Aarti, CdnAarti, CdnResponse } from "@/src/types";

function normalizeCdnAarti(raw: CdnAarti): Aarti {
  const contentLines: string[] = [];
  for (const verse of raw.verses) {
    if (verse.label) {
      contentLines.push(`[${verse.label}]`);
    }
    contentLines.push(...verse.lines);
    contentLines.push("");
  }

  return {
    id: raw.id,
    title: raw.title,
    category: raw.category,
    language: raw.language,
    slug: raw.slug,
    content: contentLines.join("\n").trim(),
    description: raw.subtitle ?? "",
    order: raw.order,
    tags: JSON.stringify(raw.tags),
    isFeatured: raw.isPopular,
    updatedAt: new Date().toISOString(),
    author: raw.author ?? "",
    type: raw.type,
    searchableText: raw.searchableText,
    versesJson: JSON.stringify(raw.verses),
    translationsJson: JSON.stringify(raw.translations),
  };
}

function validateCdnResponse(data: unknown): data is CdnResponse {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  if (!Array.isArray(obj.aartis)) return false;
  if (obj.aartis.length === 0) return false;
  const first = obj.aartis[0] as Record<string, unknown>;
  return typeof first.id === "string" && typeof first.title === "string";
}

export async function fetchAndSyncAartis(): Promise<{
  count: number;
  fromCache: boolean;
}> {
  const url = `${CDN_URL}?_t=${Date.now()}`;
  const response = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  });
  if (!response.ok) {
    throw new Error(`CDN fetch failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!validateCdnResponse(data)) {
    throw new Error("Invalid CDN response structure");
  }

  const normalized = data.aartis.map(normalizeCdnAarti);
  await upsertAartis(normalized);
  await setSyncMeta("lastSync", new Date().toISOString());
  await setSyncMeta("totalCount", String(normalized.length));

  return { count: normalized.length, fromCache: false };
}

export async function getLastSyncTime(): Promise<string | null> {
  return getSyncMeta("lastSync");
}

export async function needsSync(): Promise<boolean> {
  const last = await getLastSyncTime();
  if (!last) return true;
  const elapsed = Date.now() - new Date(last).getTime();
  return elapsed > STALE_TIME_MS;
}
