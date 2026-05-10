/**
 * Core type definitions for the Aarti Sangrah app.
 * Matches the CDN data structure with normalized fields for SQLite storage.
 */

// ── CDN Raw Types ──────────────────────────────────────────────────

export interface CdnVerse {
  readonly type: string;
  readonly number?: number;
  readonly label?: string;
  readonly lines: readonly string[];
}

export interface CdnTranslation {
  readonly title: string;
  readonly type?: string;
  readonly category?: string;
}

export interface CdnAarti {
  readonly id: string;
  readonly slug: string;
  readonly category: string;
  readonly type: string;
  readonly language: string;
  readonly script: string;
  readonly title: string;
  readonly subtitle: string | null;
  readonly author: string | null;
  readonly order: number;
  readonly isPopular: boolean;
  readonly tags: readonly string[];
  readonly searchableText: string;
  readonly translations: Readonly<Record<string, CdnTranslation>>;
  readonly verses: readonly CdnVerse[];
}

// ── Normalized App Types ───────────────────────────────────────────

export interface Aarti {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly language: string;
  readonly slug: string;
  readonly content: string;
  readonly description: string;
  readonly order: number;
  readonly tags: string;
  readonly isFeatured: boolean;
  readonly updatedAt: string;
  readonly author: string;
  readonly type: string;
  readonly searchableText: string;
  readonly versesJson: string;
  readonly translationsJson: string;
}

export interface AartiCategory {
  readonly name: string;
  readonly count: number;
  readonly translationsJson: string;
}

export interface RecentAarti {
  readonly aartiId: string;
  readonly readAt: string;
  readonly scrollPosition: number;
}

// ── UI State Types ─────────────────────────────────────────────────

export type ThemeMode = "light" | "dark" | "system";

export type AppLanguage = "hi" | "mr" | "en";

export const APP_LANGUAGE_LABELS: Readonly<Record<AppLanguage, string>> = {
  hi: "हिन्दी",
  mr: "मराठी",
  en: "English",
};

export type FontSizeLevel = "small" | "medium" | "large" | "xlarge";

export interface FontSizeConfig {
  readonly body: number;
  readonly heading: number;
  readonly subheading: number;
  readonly label: number;
  readonly lineHeight: number;
}

export const FONT_SIZE_MAP: Readonly<Record<FontSizeLevel, FontSizeConfig>> = {
  small: { body: 14, heading: 24, subheading: 18, label: 11, lineHeight: 1.5 },
  medium: { body: 16, heading: 28, subheading: 20, label: 12, lineHeight: 1.6 },
  large: { body: 19, heading: 32, subheading: 23, label: 14, lineHeight: 1.7 },
  xlarge: { body: 22, heading: 36, subheading: 26, label: 16, lineHeight: 1.8 },
};

// ── Category Registry ──────────────────────────────────────────────

export interface CategoryRecord {
  readonly icon: string;
  readonly hi: string;
  readonly mr: string;
  readonly en: string;
  /** All known alternate spellings / old names that map to this canonical key */
  readonly aliases: readonly string[];
}

/**
 * Single source of truth for categories.
 * Key = canonical English category name (matches API `category` field).
 * Aliases ensure old DB rows (e.g. "Shiv") are normalised to the canonical key.
 */
export const CATEGORY_REGISTRY: Readonly<Record<string, CategoryRecord>> = {
  "Shri Ganesh": {
    icon: "auto-awesome",
    hi: "श्री गणेश",
    mr: "श्री गणेश",
    en: "Shri Ganesh",
    aliases: ["Ganesh", "Ganpati", "Shri Ganesh"],
  },
  Mahadev: {
    icon: "self-improvement",
    hi: "महादेव",
    mr: "महादेव",
    en: "Mahadev",
    aliases: ["Shiv", "Shiva", "Shankar", "Mahadev"],
  },
  Devi: {
    icon: "spa",
    hi: "देवी",
    mr: "देवी",
    en: "Devi",
    aliases: ["Devi", "Durga", "Amba"],
  },
  Hanuman: {
    icon: "fitness-center",
    hi: "हनुमान",
    mr: "हनुमान",
    en: "Hanuman",
    aliases: ["Hanuman", "Maruti"],
  },
  Vitthal: {
    icon: "music-note",
    hi: "विठ्ठल",
    mr: "विठ्ठल",
    en: "Vitthal",
    aliases: ["Vitthal", "Vithal", "Panduranga"],
  },
  Krishna: {
    icon: "piano",
    hi: "श्री कृष्ण",
    mr: "श्री कृष्ण",
    en: "Shri Krishna",
    aliases: ["Krishna", "Govind", "Kanha", "Shri Krishna"],
  },
  Ram: {
    icon: "military-tech",
    hi: "श्री राम",
    mr: "श्री राम",
    en: "Shri Ram",
    aliases: ["Ram", "Rama", "Shri Ram"],
  },
  Datt: {
    icon: "wb-sunny",
    hi: "दत्त",
    mr: "दत्त",
    en: "Datt",
    aliases: ["Datt", "Dattatreya", "Datta"],
  },
  Vishnu: {
    icon: "brightness-high",
    hi: "श्री विष्णु",
    mr: "श्री विष्णु",
    en: "Shri Vishnu",
    aliases: ["Vishnu", "Narayan", "Shri Vishnu"],
  },
  Lakshmi: {
    icon: "stars",
    hi: "श्री लक्ष्मी",
    mr: "श्री लक्ष्मी",
    en: "Shri Lakshmi",
    aliases: ["Lakshmi", "Laxmi", "Shri Lakshmi"],
  },
  Saraswati: {
    icon: "auto-stories",
    hi: "सरस्वती",
    mr: "सरस्वती",
    en: "Saraswati",
    aliases: ["Saraswati"],
  },
  Prayer: {
    icon: "favorite",
    hi: "प्रार्थना",
    mr: "प्रार्थना",
    en: "Prayer",
    aliases: ["Prayer", "Prarthana"],
  },
};

/** Reverse alias lookup: any alias or old name → canonical key */
export const CATEGORY_ALIAS_MAP: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(CATEGORY_REGISTRY).flatMap(([key, rec]) =>
    rec.aliases.map((alias) => [alias, key]),
  ),
);

/** @deprecated Use CATEGORY_REGISTRY instead */
export const CATEGORY_ICONS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(CATEGORY_REGISTRY).map(([key, rec]) => [key, rec.icon]),
);
