import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { Radius, Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";

import { AppText } from "./app-text";

interface AppModalProps {
  visible: boolean;
  title: string;
  message: string;
  onDismiss: () => void;
  primaryLabel?: string;
  onPrimary?: () => void;
}

export function AppModal({
  visible,
  title,
  message,
  onDismiss,
  primaryLabel,
  onPrimary,
}: AppModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Pressable
          style={[styles.card, { backgroundColor: colors.surfaceContainerLowest }]}
          onPress={(e) => e.stopPropagation()}
        >
          <AppText variant="titleLg">{title}</AppText>
          <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
            {message}
          </AppText>
          <View style={styles.actions}>
            <Pressable
              onPress={onDismiss}
              style={[styles.button, { backgroundColor: colors.surfaceContainer }]}
            >
              <AppText variant="labelLg" color={colors.onSurfaceVariant}>
                OK
              </AppText>
            </Pressable>
            {primaryLabel && onPrimary ? (
              <Pressable
                onPress={() => {
                  onPrimary();
                  onDismiss();
                }}
                style={[styles.button, { backgroundColor: colors.primaryContainer }]}
              >
                <AppText variant="labelLg" color={colors.onPrimaryContainer}>
                  {primaryLabel}
                </AppText>
              </Pressable>
            ) : null}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  button: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
});
