import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { Spacing, Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";

import { AppText } from "./app-text";

interface SplashOverlayProps {
  onFinished: () => void;
}

export function SplashOverlay({ onFinished }: SplashOverlayProps) {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const fade = useSharedValue(1);
  const scale = useSharedValue(0.92);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 9, stiffness: 50 });
    fade.value = withDelay(
      3000,
      withTiming(0, { duration: 400 }, (finished) => {
        if (finished) scheduleOnRN(onFinished);
      }),
    );
  }, [fade, scale, onFinished]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, { width, height, backgroundColor: colors.surface }, containerStyle]}
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

      <Animated.View style={[styles.content, contentStyle]}>
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
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10000,
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
