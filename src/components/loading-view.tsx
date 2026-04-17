import { Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";

interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = "Loading..." }: LoadingViewProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="bodyMd" color={colors.onSurfaceVariant} style={styles.text}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
  },
  text: {
    marginTop: Spacing.sm,
  },
});
