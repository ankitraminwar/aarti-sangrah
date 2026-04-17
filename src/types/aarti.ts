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

export interface CdnResponse {
  readonly aartis: readonly CdnAarti[];
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
  readonly icon: string;
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

// ── Category Icon Mapping ──────────────────────────────────────────

export const CATEGORY_ICONS: Readonly<Record<string, string>> = {
  Ganpati: "auto-awesome",
  Shiv: "self-improvement",
  Devi: "spa",
  Hanuman: "fitness-center",
  Vitthal: "music-note",
  Datt: "wb-sunny",
  Vishnu: "brightness-high",
  Saraswati: "auto-stories",
  Prayer: "favorite",
};
