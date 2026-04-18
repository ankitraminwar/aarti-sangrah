import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import { Spacing, Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";

import { AppText } from "./app-text";

const { width, height } = Dimensions.get("screen");

interface SplashOverlayProps {
  onFinished: () => void;
}

export function SplashOverlay({ onFinished }: SplashOverlayProps) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 9,
    }).start();

    const holdTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onFinished();
      });
    }, 3000);

    return () => clearTimeout(holdTimer);
  }, [fadeAnim, scaleAnim, onFinished]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, backgroundColor: colors.surface }]}
    >
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

      {/* Spacer for Top */}
      <View style={{ height: "16%" }} />

      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        <AppText style={[{ ...Typography.displayLg, color: colors.primary, textAlign: "center" }]}>
          ॐ सर्वे भवन्तु सुखिनः
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
          May all beings be happy and peaceful.
        </AppText>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.logoRow}>
          <MaterialIcons name="menu-book" size={30} color={colors.primary} />
          <AppText style={[styles.appName, { color: colors.onSurface }]}>Aarti Sangrah</AppText>
        </View>
        <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.xl,
    maxWidth: 672,
    zIndex: 10,
  },
  footer: {
    zIndex: 10,
    paddingBottom: 48,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  appName: {
    ...Typography.headlineMd,
    letterSpacing: 0.5,
  },
  indicator: {
    height: 4,
    width: 48,
    borderRadius: 9999,
    marginTop: 8,
    opacity: 0.2,
  },
});
