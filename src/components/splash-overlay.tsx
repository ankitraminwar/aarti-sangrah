import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

import { Spacing } from "@/src/constants";
import { useTheme } from "@/src/hooks";

import { AppText } from "./app-text";

const { width, height } = Dimensions.get("screen");

interface SplashOverlayProps {
  onFinished: () => void;
}

export function SplashOverlay({ onFinished }: SplashOverlayProps) {
  const { colors, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 8,
    }).start();

    const holdTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onFinished();
      });
    }, 1600);

    return () => clearTimeout(holdTimer);
  }, [fadeAnim, scaleAnim, onFinished]);

  const glowColor = isDark ? "rgba(255, 153, 51, 0.08)" : "rgba(255, 153, 51, 0.12)";

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, backgroundColor: colors.surface }]}
    >
      {/* Radial glow behind Om symbol */}
      <View style={[styles.glowCircle, { backgroundColor: glowColor }]} />

      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        {/* Om symbol */}
        <AppText
          style={[
            styles.omText,
            {
              color: colors.primaryContainer,
              textShadowColor: isDark ? "rgba(255, 153, 51, 0.4)" : "rgba(255, 153, 51, 0.6)",
            },
          ]}
        >
          ॐ
        </AppText>

        {/* Sanskrit blessing */}
        <AppText
          style={[
            styles.sanskritText,
            { color: isDark ? colors.onSurfaceVariant : colors.onSurfaceVariant },
          ]}
        >
          सर्वे भवन्तु सुखिनः
        </AppText>

        {/* English translation */}
        <AppText style={[styles.subtitleText, { color: colors.outline }]}>
          May all beings be happy and peaceful.
        </AppText>
      </Animated.View>

      {/* App name at bottom */}
      <View style={styles.appNameRow}>
        <AppText style={[styles.appNameText, { color: colors.onSurfaceVariant }]}>
          Aarti Sangrah
        </AppText>
        <AppText style={[styles.taglineText, { color: colors.outline }]}>
          The Sacred Editorial
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  glowCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  content: {
    alignItems: "center",
    gap: Spacing.md,
  },
  omText: {
    fontSize: 96,
    fontFamily: "NotoSerif_700Bold",
    lineHeight: 120,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  sanskritText: {
    fontSize: 22,
    fontFamily: "NotoSerif_400Regular",
    letterSpacing: 0.5,
    marginTop: Spacing.sm,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    letterSpacing: 0.3,
  },
  appNameRow: {
    position: "absolute",
    bottom: 56,
    alignItems: "center",
    gap: Spacing.xs,
  },
  appNameText: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
    letterSpacing: 1.5,
  },
  taglineText: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    letterSpacing: 0.5,
  },
});
