import type { Aarti, AppLanguage } from "@/src/types";
import { CATEGORY_REGISTRY } from "@/src/types";

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
  const t = type.toLowerCase();
  if (language === "en") {
    if (t === "mantra") return "Mantra";
    if (t === "chalisa") return "Chalisa";
    if (t === "stotra" || t === "stotram") return "Stotra";
    if (t === "stuti") return "Stuti";
    if (t === "ashtak") return "Ashtakam";
    if (t === "shlok" || t === "shloka") return "Shloka";
    if (t === "prayer" || t === "prarthana") return "Prayer";
    if (!t) return "Aarti";
    return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  if (language === "mr") {
    if (t === "mantra") return "मंत्र";
    if (t === "chalisa") return "चाळीसा";
    if (t === "stotra" || t === "stotram") return "स्तोत्र";
    if (t === "stuti") return "स्तुती";
    if (t === "ashtak") return "अष्टक";
    if (t === "shlok" || t === "shloka") return "श्लोक";
    if (t === "prayer" || t === "prarthana") return "प्रार्थना";
    return "आरती";
  }

  // hi
  if (t === "mantra") return "मंत्र";
  if (t === "chalisa") return "चालीसा";
  if (t === "stotra" || t === "stotram") return "स्तोत्र";
  if (t === "stuti") return "स्तुति";
  if (t === "ashtak") return "अष्टक";
  if (t === "shlok" || t === "shloka") return "श्लोक";
  if (t === "prayer" || t === "prarthana") return "प्रार्थना";
  return "आरती";
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
  // Tier 1: CATEGORY_REGISTRY — covers all known categories, always current
  const record = CATEGORY_REGISTRY[fallback];
  if (record) return record[language] ?? fallback;

  // Tier 2: translationsJson from the aarti row — handles NEW categories added
  //         to the API before the registry is updated (zero-breakage guarantee)
  if (translationsJson && translationsJson !== "{}") {
    try {
      const t = JSON.parse(translationsJson) as Record<string, { category?: string }>;
      const translated = t[language]?.category;
      if (translated) return translated;
    } catch {
      // malformed JSON — fall through
    }
  }

  // Tier 3: raw category name as-is (always a valid string from the API)
  return fallback;
}
