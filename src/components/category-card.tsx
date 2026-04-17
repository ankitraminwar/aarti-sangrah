import { Radius, Spacing } from "@/src/constants";
import { useT, useTheme } from "@/src/hooks";
import { CATEGORY_ICONS } from "@/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";

interface CategoryCardProps {
  name: string;
  count: number;
  onPress: () => void;
}

export function CategoryCard({ name, count, onPress }: CategoryCardProps) {
  const { colors, isDark } = useTheme();
  const t = useT();
  const iconName = (CATEGORY_ICONS[name] ?? "auto-awesome") as keyof typeof MaterialIcons.glyphMap;

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
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark ? colors.surfaceContainerHigh : colors.surfaceContainer,
          },
        ]}
      >
        <MaterialIcons name={iconName} size={28} color={colors.primary} />
      </View>
      <AppText variant="titleMd" numberOfLines={1}>
        {name}
      </AppText>
      <AppText variant="labelSm" color={colors.onSurfaceVariant}>
        {count} {count === 1 ? t("categoryCard.aarti") : t("categoryCard.aartis")}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.sm,
    flex: 1,
    minWidth: 140,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
});
