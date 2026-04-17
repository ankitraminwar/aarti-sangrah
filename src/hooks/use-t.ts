import type { TranslationKey } from "@/src/i18n";
import { t } from "@/src/i18n";
import { useAppStore } from "@/src/store";
import { useCallback } from "react";

export function useT() {
  const language = useAppStore((s) => s.language);
  return useCallback(
    (key: TranslationKey, params?: Record<string, string>) => t(key, language, params),
    [language],
  );
}
