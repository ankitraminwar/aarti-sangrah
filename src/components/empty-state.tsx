import { Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "./app-button";
import { AppText } from "./app-text";

interface EmptyStateProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "inbox",
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={64} color={colors.outlineVariant} />
      <AppText variant="headlineSm" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="bodyMd" color={colors.onSurfaceVariant} style={styles.message}>
        {message}
      </AppText>
      {actionLabel && onAction && (
        <AppButton title={actionLabel} onPress={onAction} variant="outline" style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xxxl,
    gap: Spacing.md,
  },
  title: {
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  message: {
    textAlign: "center",
  },
  button: {
    marginTop: Spacing.lg,
    minWidth: 160,
  },
});
