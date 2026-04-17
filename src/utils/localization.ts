import type { Aarti, AppLanguage } from "@/src/types";

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
