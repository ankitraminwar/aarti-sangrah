import { useAppStore } from "@/src/store";
import type { FontSizeConfig } from "@/src/types";
import { FONT_SIZE_MAP } from "@/src/types";

export function useFontSize(): FontSizeConfig {
  const level = useAppStore((s) => s.fontSize);
  return FONT_SIZE_MAP[level];
}
