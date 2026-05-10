import { CDN_COLLECTION_URLS, STALE_TIME_MS } from "@/src/constants";
import { getSyncMeta, setSyncMeta, upsertAartis } from "@/src/database";
import type { Aarti, CdnAarti } from "@/src/types";
import { CATEGORY_ALIAS_MAP } from "@/src/types";

function normalizeCdnAarti(raw: CdnAarti): Aarti {
  const contentLines: string[] = [];
  for (const verse of raw.verses) {
    if (verse.label) {
      contentLines.push(`[${verse.label}]`);
    }
    contentLines.push(...verse.lines);
    contentLines.push("");
  }

  // Normalise category to canonical name (e.g. "Shiv" → "Mahadev")
  const canonicalCategory = CATEGORY_ALIAS_MAP[raw.category] ?? raw.category;

  return {
    id: raw.id,
    title: raw.title,
    category: canonicalCategory,
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

/**
 * Extracts the items array from a collection JSON response regardless of root key.
 * Every collection file has exactly one top-level key whose value is an array.
 */
function extractItems(data: unknown): CdnAarti[] {
  if (typeof data !== "object" || data === null) return [];
  const obj = data as Record<string, unknown>;
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (Array.isArray(val) && val.length > 0) {
      const first = val[0] as Record<string, unknown>;
      if (typeof first.id === "string" && typeof first.title === "string") {
        return val as CdnAarti[];
      }
    }
  }
  return [];
}

async function fetchCollection(url: string): Promise<CdnAarti[]> {
  try {
    const response = await fetch(`${url}?_t=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    return extractItems(data);
  } catch {
    return [];
  }
}

export async function fetchAndSyncAartis(): Promise<{
  count: number;
  fromCache: boolean;
}> {
  // Fetch all collections in parallel
  const results = await Promise.all(CDN_COLLECTION_URLS.map(fetchCollection));

  // Merge and deduplicate by id (first occurrence wins)
  const seen = new Set<string>();
  const merged: CdnAarti[] = [];
  for (const items of results) {
    for (const item of items) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        merged.push(item);
      }
    }
  }

  if (merged.length === 0) {
    throw new Error("All CDN collection fetches failed or returned empty data");
  }

  const normalized = merged.map(normalizeCdnAarti);
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
