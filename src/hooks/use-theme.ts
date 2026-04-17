import type { AppColors } from "@/src/constants";
import { DarkColors, LightColors } from "@/src/constants";
import { useAppStore } from "@/src/store";
import { useColorScheme as useRNColorScheme } from "react-native";

export function useTheme(): { colors: AppColors; isDark: boolean } {
  const systemScheme = useRNColorScheme();
  const themeMode = useAppStore((s) => s.themeMode);

  const isDark = themeMode === "dark" || (themeMode === "system" && systemScheme === "dark");

  return {
    colors: isDark ? DarkColors : LightColors,
    isDark,
  };
}
