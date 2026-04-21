import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/src/components";
import { Radius, Spacing } from "@/src/constants";
import { useT, useTheme } from "@/src/hooks";
import type { TranslationKey } from "@/src/i18n";

const SECTIONS: {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { titleKey: "privacy.s1.title", bodyKey: "privacy.s1.body", icon: "lock" },
  { titleKey: "privacy.s2.title", bodyKey: "privacy.s2.body", icon: "phone-android" },
  { titleKey: "privacy.s3.title", bodyKey: "privacy.s3.body", icon: "cloud-download" },
  { titleKey: "privacy.s4.title", bodyKey: "privacy.s4.body", icon: "block" },
  { titleKey: "privacy.s5.title", bodyKey: "privacy.s5.body", icon: "people" },
  { titleKey: "privacy.s6.title", bodyKey: "privacy.s6.body", icon: "update" },
];

export function PrivacyScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={[styles.toolbar, { backgroundColor: colors.surface }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </Pressable>
        <AppText variant="titleLg">{t("privacy.title")}</AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="bodySm" color={colors.onSurfaceVariant} style={styles.intro}>
          {t("privacy.intro")}
        </AppText>

        {SECTIONS.map((section, idx) => (
          <View key={idx} style={[styles.card, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name={section.icon} size={20} color={colors.primary} />
              <AppText variant="titleSm" style={{ flex: 1 }}>
                {t(section.titleKey)}
              </AppText>
            </View>
            <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
              {t(section.bodyKey)}
            </AppText>
          </View>
        ))}

        <AppText variant="bodySm" color={colors.outline} style={styles.footer}>
          {t("privacy.lastUpdated")}
        </AppText>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  intro: {
    marginBottom: Spacing.sm,
  },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  footer: {
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  bottomSpacer: {
    height: Spacing.huge,
  },
});
