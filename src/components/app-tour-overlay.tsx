import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Radius, Spacing, Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import type { TranslationKey } from "@/src/i18n";
import { t } from "@/src/i18n";
import { useAppStore } from "@/src/store";

import { AppText } from "./app-text";

interface AppTourOverlayProps {
  onFinished: () => void;
}

type TourSlide = {
  key: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const TOUR_SLIDES: TourSlide[] = [
  {
    key: "welcome",
    titleKey: "tour.slide1.title",
    descKey: "tour.slide1.desc",
    icon: "menu-book",
  },
  {
    key: "browse",
    titleKey: "tour.slide2.title",
    descKey: "tour.slide2.desc",
    icon: "auto-awesome-mosaic",
  },
  {
    key: "favorites",
    titleKey: "tour.slide3.title",
    descKey: "tour.slide3.desc",
    icon: "favorite",
  },
  {
    key: "settings",
    titleKey: "tour.slide4.title",
    descKey: "tour.slide4.desc",
    icon: "tune",
  },
  {
    key: "offline",
    titleKey: "tour.slide5.title",
    descKey: "tour.slide5.desc",
    icon: "cloud-off",
  },
];

const SLIDE_COUNT = TOUR_SLIDES.length;

export function AppTourOverlay({ onFinished }: AppTourOverlayProps) {
  const { colors } = useTheme();
  const { language } = useAppStore();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const iconScale = useSharedValue(1);

  const goToIndex = useCallback(
    (index: number) => {
      // scrollToOffset is safe and deterministic for fixed-width slides;
      // scrollToIndex can fire onScrollToIndexFailed before items are measured.
      const safeIndex = Math.max(0, Math.min(index, SLIDE_COUNT - 1));
      flatListRef.current?.scrollToOffset({ offset: safeIndex * width, animated: true });
      iconScale.value = withSpring(1, { damping: 8, stiffness: 120 });
    },
    [iconScale, width],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < SLIDE_COUNT - 1) {
      goToIndex(currentIndex + 1);
    } else {
      onFinished();
    }
  }, [currentIndex, goToIndex, onFinished]);

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const isLastSlide = currentIndex === SLIDE_COUNT - 1;

  const renderItem = useCallback(
    ({ item }: { item: TourSlide }) => (
      <View style={[styles.slide, { width }]}>
        <Animated.View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primaryContainer, shadowColor: colors.cardShadow },
            iconAnimStyle,
          ]}
        >
          <MaterialIcons name={item.icon} size={56} color={colors.onPrimaryContainer} />
        </Animated.View>

        <AppText
          style={[{ ...Typography.headlineLg, color: colors.onSurface, textAlign: "center" }]}
        >
          {t(item.titleKey, language)}
        </AppText>

        <AppText
          style={[
            {
              ...Typography.bodyLg,
              color: colors.onSurfaceVariant,
              textAlign: "center",
              paddingHorizontal: Spacing.lg,
            },
          ]}
        >
          {t(item.descKey, language)}
        </AppText>
      </View>
    ),
    [colors, language, width, iconAnimStyle],
  );

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(300)}
      style={[styles.container, { width, height, backgroundColor: colors.surface }]}
    >
      {/* Background gradient — matches splash overlay */}
      <LinearGradient
        colors={[colors.primaryContainer, colors.surfaceContainerLowest, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]}
      />

      <LinearGradient
        colors={["rgba(255,255,255,0.4)", "transparent"]}
        style={styles.topGradient}
      />

      <LinearGradient
        colors={[`${colors.primary}0D`, "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Skip button top-right */}
      {!isLastSlide && (
        <Pressable
          onPress={onFinished}
          style={[styles.skipBtn, { top: insets.top + Spacing.lg }]}
          hitSlop={12}
        >
          <AppText variant="labelLg" color={colors.primary}>
            {t("tour.skip", language)}
          </AppText>
        </Pressable>
      )}

      {/* Carousel */}
      <View style={[styles.carouselContainer, { marginTop: insets.top + 64 }]}>
        <FlatList
          ref={flatListRef}
          data={TOUR_SLIDES}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />
      </View>

      {/* Footer: pagination + next/done button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.xxl }]}>
        {/* Dot pagination */}
        <View style={styles.pagination}>
          {TOUR_SLIDES.map((_, index) => (
            <Pressable key={index} onPress={() => goToIndex(index)} hitSlop={8}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex ? colors.primary : colors.outlineVariant,
                    width: index === currentIndex ? 24 : 8,
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>

        {/* Primary action button */}
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.85 : 1 }]}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <AppText variant="labelLg" color={colors.onPrimary}>
              {isLastSlide ? t("tour.done", language) : t("tour.next", language)}
            </AppText>
            {!isLastSlide && (
              <MaterialIcons name="arrow-forward" size={18} color={colors.onPrimary} />
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 9999,
    overflow: "hidden",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 128,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 192,
  },
  skipBtn: {
    position: "absolute",
    right: Spacing.xl,
    zIndex: 20,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.xl,
    maxWidth: 672,
    zIndex: 10,
  },
  iconContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    elevation: 4,
    // shadowColor applied dynamically from theme.cardShadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  footer: {
    zIndex: 10,
    width: "100%",
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xl,
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionBtn: {
    width: "100%",
    borderRadius: Radius.full,
    overflow: "hidden",
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.full,
  },
});
