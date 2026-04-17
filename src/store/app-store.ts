import { getSyncMeta, setSyncMeta } from "@/src/database";
import type { AppLanguage, FontSizeLevel, ThemeMode } from "@/src/types";
import { create } from "zustand";

interface AppState {
  themeMode: ThemeMode;
  fontSize: FontSizeLevel;
  language: AppLanguage;
  setThemeMode: (mode: ThemeMode) => void;
  setFontSize: (size: FontSizeLevel) => void;
  setLanguage: (lang: AppLanguage) => void;
  loadPersistedSettings: () => Promise<void>;
}

const VALID_THEMES: ThemeMode[] = ["light", "dark", "system"];
const VALID_FONTS: FontSizeLevel[] = ["small", "medium", "large", "xlarge"];
const VALID_LANGUAGES: AppLanguage[] = ["hi", "mr", "en"];

export const useAppStore = create<AppState>((set) => ({
  themeMode: "system",
  fontSize: "medium",
  language: "hi",
  setThemeMode: (mode) => {
    set({ themeMode: mode });
    setSyncMeta("pref_themeMode", mode);
  },
  setFontSize: (size) => {
    set({ fontSize: size });
    setSyncMeta("pref_fontSize", size);
  },
  setLanguage: (lang) => {
    set({ language: lang });
    setSyncMeta("pref_language", lang);
  },
  loadPersistedSettings: async () => {
    const [theme, font, lang] = await Promise.all([
      getSyncMeta("pref_themeMode"),
      getSyncMeta("pref_fontSize"),
      getSyncMeta("pref_language"),
    ]);
    const updates: Partial<Pick<AppState, "themeMode" | "fontSize" | "language">> = {};
    if (theme && VALID_THEMES.includes(theme as ThemeMode)) {
      updates.themeMode = theme as ThemeMode;
    }
    if (font && VALID_FONTS.includes(font as FontSizeLevel)) {
      updates.fontSize = font as FontSizeLevel;
    }
    if (lang && VALID_LANGUAGES.includes(lang as AppLanguage)) {
      updates.language = lang as AppLanguage;
    }
    if (Object.keys(updates).length > 0) {
      set(updates);
    }
  },
}));
