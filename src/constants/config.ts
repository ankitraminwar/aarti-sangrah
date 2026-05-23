const CDN_BASE = "https://cdn.jsdelivr.net/gh/ankitraminwar/aarti-api@master";

export const CDN_COLLECTION_URLS: readonly string[] = [
  `${CDN_BASE}/collections/aarti_collections.json`,
  `${CDN_BASE}/collections/ashtak_collections.json`,
  `${CDN_BASE}/collections/chalisa_collections.json`,
  `${CDN_BASE}/collections/mantra_collections.json`,
  `${CDN_BASE}/collections/prayer_collections.json`,
  `${CDN_BASE}/collections/stotra_collections.json`,
  `${CDN_BASE}/collections/stuti_collection.json`,
];

export const DB_NAME = "aarti_sangrah.db";

export const STALE_TIME_MS = 24 * 60 * 60 * 1000; // 24 hours

export const APP_VERSION = "1.0.3";

export const REQUEST_FORM_URL = "https://forms.gle/u9hGMXVS1XvLWnnE6";

export const THINKERCART_URL = "https://www.thinkercart.com";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.thinkercart.aartisangrah";
