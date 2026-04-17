import { Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="headlineSm">{title}</AppText>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} hitSlop={8} style={styles.action}>
          <AppText variant="labelLg" color={colors.primary}>
            {actionLabel}
          </AppText>
          <MaterialIcons name="chevron-right" size={18} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
});
