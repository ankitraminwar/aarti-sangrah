import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";

import { Spacing, Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";

import { AppText } from "./app-text";

const ICONS: (keyof typeof MaterialIcons.glyphMap)[] = [
  "menu-book",
  "auto-stories",
  "import-contacts",
  "local-library",
];

export function DataSyncOverlay() {
  const { colors } = useTheme();
  const [iconIndex, setIconIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % ICONS.length);
    }, 1500);

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => clearInterval(interval);
  }, [fadeAnim, pulseAnim]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, backgroundColor: colors.surface }]}
    >
      {/* Decorative gradient overlay */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.primaryContainer, opacity: 0.05 },
        ]}
        pointerEvents="none"
      />

      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
          <MaterialIcons name={ICONS[iconIndex]} size={56} color={colors.primary} />
        </Animated.View>

        <AppText
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            { ...Typography.displayLg, color: colors.primary, textAlign: "center", width: "100%" },
          ]}
        >
          तमसो मा ज्योतिर्गमय
        </AppText>

        <AppText
          style={[
            {
              ...Typography.titleLg,
              color: colors.onSurfaceVariant,
              textAlign: "center",
              opacity: 0.8,
            },
          ]}
        >
          Lead me from darkness to light.
        </AppText>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
        <AppText
          style={[
            {
              ...Typography.labelMd,
              color: colors.outline,
              textAlign: "center",
              letterSpacing: 2,
            },
          ]}
        >
          GATHERING PRAYERS ...
        </AppText>
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
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.xl,
    maxWidth: 672,
    width: "100%",
  },
  iconContainer: {
    marginBottom: Spacing.lg,
    opacity: 0.9,
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    marginBottom: Spacing.md,
  },
  footer: {
    paddingBottom: 56,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
});
