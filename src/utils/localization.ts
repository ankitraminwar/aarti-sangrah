import { t } from "@/src/i18n";
import type { Aarti, AppLanguage } from "@/src/types";
import { CATEGORY_REGISTRY } from "@/src/types";

function normalizeCategoryKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function resolveCanonicalCategoryKey(value: string): string | undefined {
  if (CATEGORY_REGISTRY[value]) return value;
  const normalized = normalizeCategoryKey(value);
  for (const [key, rec] of Object.entries(CATEGORY_REGISTRY)) {
    if (normalizeCategoryKey(key) === normalized) return key;
    if (normalizeCategoryKey(rec.en) === normalized) return key;
    if (normalizeCategoryKey(rec.hi) === normalized) return key;
    if (normalizeCategoryKey(rec.mr) === normalized) return key;
    if (rec.aliases.some((alias) => normalizeCategoryKey(alias) === normalized)) return key;
  }
  return undefined;
}

export function getLocalizedTitle(aarti: Aarti, language: AppLanguage): string {
  if (!aarti.translationsJson || aarti.translationsJson === "{}") {
    return aarti.title;
  }
  try {
    const translations = JSON.parse(aarti.translationsJson) as Record<string, { title?: string }>;
    return translations[language]?.title || aarti.title;
  } catch {
    return aarti.title;
  }
}

export function prettifyType(type: string, language: AppLanguage): string {
  const lower = type.toLowerCase();
  const titleCase = lower.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (lower === "aarti") return t("type.aarti", language);
  if (lower === "mantra") return t("type.mantra", language);
  if (lower === "chalisa") return t("type.chalisa", language);
  if (lower === "stotra" || lower === "stotram") return t("type.stotra", language);
  if (lower === "stuti") return t("type.stuti", language);
  if (lower === "ashtak") return t("type.ashtak", language);
  if (lower === "shlok" || lower === "shloka") return t("type.shlok", language);
  if (lower === "prayer" || lower === "prarthana") return t("type.prayer", language);
  // Unknown type: return title-cased raw value so it's readable in any language
  return titleCase;
}

export function getLocalizedType(aarti: Aarti, language: AppLanguage): string {
  if (!aarti.translationsJson || aarti.translationsJson === "{}") {
    return prettifyType(aarti.type, language);
  }
  try {
    const translations = JSON.parse(aarti.translationsJson) as Record<
      string,
      { title?: string; type?: string }
    >;
    return translations[language]?.type || prettifyType(aarti.type, language);
  } catch {
    return prettifyType(aarti.type, language);
  }
}

export function getLocalizedCategory(
  translationsJson: string,
  fallback: string,
  language: AppLanguage,
): string {
  // Tier 1: CATEGORY_REGISTRY — covers all known categories, always current.
  // Also resolves common non-canonical inputs (e.g. "Shri Ram" -> "Ram").
  const canonicalKey = resolveCanonicalCategoryKey(fallback);
  const record = canonicalKey ? CATEGORY_REGISTRY[canonicalKey] : undefined;
  if (record) return record[language] ?? fallback;

  // Tier 2: translationsJson from the aarti row — handles NEW categories added
  //         to the API before the registry is updated (zero-breakage guarantee)
  if (translationsJson && translationsJson !== "{}") {
    try {
      const t = JSON.parse(translationsJson) as Record<string, { category?: string }>;
      const translated = t[language]?.category;
      if (translated) {
        const translatedCanonicalKey = resolveCanonicalCategoryKey(translated);
        if (translatedCanonicalKey) {
          return CATEGORY_REGISTRY[translatedCanonicalKey][language] ?? translated;
        }
        return translated;
      }
    } catch {
      // malformed JSON — fall through
    }
  }

  // Tier 3: raw category name as-is (always a valid string from the API)
  return fallback;
}
