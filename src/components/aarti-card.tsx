import { Radius, Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import { useAppStore } from "@/src/store";
import type { Aarti } from "@/src/types";
import { getLocalizedTitle } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";

interface AartiCardProps {
  aarti: Aarti;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  variant?: "default" | "featured" | "compact";
}

export function AartiCard({
  aarti,
  onPress,
  isFavorite = false,
  onToggleFavorite,
  variant = "default",
}: AartiCardProps) {
  const { colors, isDark } = useTheme();
  const language = useAppStore((s) => s.language);
  const localizedTitle = getLocalizedTitle(aarti, language);

  if (variant === "featured") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.featuredCard,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}
      >
        <LinearGradient
          colors={[colors.gradientStart, isDark ? colors.surfaceContainerLow : colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            <AppText
              variant="labelMd"
              color={isDark ? colors.onPrimaryContainer : colors.onPrimary}
            >
              {aarti.category}
            </AppText>
            <AppText
              variant="headlineMd"
              color={isDark ? colors.onSurface : colors.onPrimary}
              numberOfLines={2}
            >
              {localizedTitle}
            </AppText>
            {aarti.author ? (
              <AppText
                variant="bodySm"
                color={isDark ? colors.onSurfaceVariant : colors.onPrimary}
                style={{ opacity: 0.8 }}
              >
                {aarti.author}
              </AppText>
            ) : null}
          </View>
          {onToggleFavorite && (
            <Pressable onPress={onToggleFavorite} hitSlop={12} style={styles.favBtn}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={22}
                color={colors.primary}
              />
            </Pressable>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === "compact") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <View style={styles.compactContent}>
          <AppText variant="titleSm" numberOfLines={1}>
            {localizedTitle}
          </AppText>
          <AppText variant="labelSm" color={colors.onSurfaceVariant}>
            {aarti.category} • {aarti.language.toUpperCase()}
          </AppText>
        </View>
        {onToggleFavorite && (
          <Pressable onPress={onToggleFavorite} hitSlop={12}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={20}
              color={isFavorite ? colors.primary : colors.outline}
            />
          </Pressable>
        )}
      </Pressable>
    );
  }

  // Default card
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surfaceContainerLowest,
          shadowColor: colors.cardShadow,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.surfaceContainer }]}>
            <AppText variant="labelSm" color={colors.primary}>
              {aarti.category}
            </AppText>
          </View>
          {onToggleFavorite && (
            <Pressable onPress={onToggleFavorite} hitSlop={12}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={22}
                color={isFavorite ? colors.primary : colors.outline}
              />
            </Pressable>
          )}
        </View>
        <AppText variant="headlineSm" numberOfLines={2} style={styles.titleText}>
          {localizedTitle}
        </AppText>
        {aarti.author ? (
          <AppText variant="bodySm" color={colors.onSurfaceVariant}>
            {aarti.author}
          </AppText>
        ) : null}
        <AppText variant="bodySm" color={colors.outline} numberOfLines={2} style={styles.preview}>
          {aarti.content.slice(0, 100)}...
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 2,
  },
  cardContent: {
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  titleText: {
    marginTop: Spacing.xs,
  },
  preview: {
    marginTop: Spacing.xs,
  },
  featuredCard: {
    borderRadius: Radius.xl,
    width: 280,
    marginRight: Spacing.lg,
  },
  featuredGradient: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    minHeight: 180,
    justifyContent: "space-between",
  },
  featuredContent: {
    gap: Spacing.sm,
  },
  favBtn: {
    alignSelf: "flex-end",
  },
  compactCard: {
    borderRadius: Radius.lg,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  compactContent: {
    flex: 1,
    gap: Spacing.xs,
  },
});
