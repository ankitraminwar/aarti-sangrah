import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { Spacing } from "@/src/constants";

const LIST_MAX_WIDTH = 920;
const READING_MAX_WIDTH = 760;

function centeredHorizontalPadding(width: number, maxWidth: number) {
  return Math.max(Spacing.xl, (width - maxWidth) / 2 + Spacing.xl);
}

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isLargeScreen = Math.min(width, height) >= 600;

  return useMemo(
    () => ({
      width,
      height,
      isLargeScreen,
      listPaddingHorizontal: centeredHorizontalPadding(width, LIST_MAX_WIDTH),
      readingPaddingHorizontal: centeredHorizontalPadding(width, READING_MAX_WIDTH),
      maxListWidth: LIST_MAX_WIDTH,
      maxReadingWidth: READING_MAX_WIDTH,
    }),
    [height, isLargeScreen, width],
  );
}
