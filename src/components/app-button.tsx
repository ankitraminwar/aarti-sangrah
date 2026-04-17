import { Radius, Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import { AppText } from "./app-text";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
  disabled?: boolean;
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  style,
  disabled = false,
}: AppButtonProps) {
  const { colors } = useTheme();

  if (variant === "primary") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          {
            transform: [{ scale: pressed ? 0.98 : 1 }],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <AppText variant="labelLg" color={colors.onPrimary}>
            {title}
          </AppText>
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === "outline") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          styles.outlineBtn,
          {
            borderColor: colors.outlineVariant,
            transform: [{ scale: pressed ? 0.98 : 1 }],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <AppText variant="labelLg" color={colors.primary}>
          {title}
        </AppText>
      </Pressable>
    );
  }

  // secondary
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <AppText variant="labelLg" color={colors.primary}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.full,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md + 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  outlineBtn: {
    borderWidth: 1.5,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md + 2,
  },
});
