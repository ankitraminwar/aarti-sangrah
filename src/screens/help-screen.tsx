import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton, AppText } from "@/src/components";
import { REQUEST_FORM_URL, Radius, Spacing } from "@/src/constants";
import { useT, useTheme } from "@/src/hooks";
import type { TranslationKey } from "@/src/i18n";

const FAQ_ITEMS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "help.q1", a: "help.a1" },
  { q: "help.q2", a: "help.a2" },
  { q: "help.q3", a: "help.a3" },
  { q: "help.q4", a: "help.a4" },
  { q: "help.q5", a: "help.a5" },
  { q: "help.q6", a: "help.a6" },
];

export function HelpScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={[styles.toolbar, { backgroundColor: colors.surface }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </Pressable>
        <AppText variant="titleLg">{t("help.title")}</AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="bodySm" color={colors.onSurfaceVariant} style={styles.intro}>
          {t("help.intro")}
        </AppText>

        {FAQ_ITEMS.map((item, idx) => (
          <View
            key={idx}
            style={[styles.faqCard, { backgroundColor: colors.surfaceContainerLowest }]}
          >
            <View style={styles.questionRow}>
              <MaterialIcons name="help-outline" size={20} color={colors.primary} />
              <AppText variant="titleSm" style={{ flex: 1 }}>
                {t(item.q)}
              </AppText>
            </View>
            <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
              {t(item.a)}
            </AppText>
          </View>
        ))}

        <View style={[styles.faqCard, { backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.questionRow}>
            <MaterialIcons name="add-circle-outline" size={20} color={colors.primary} />
            <AppText variant="titleSm" style={{ flex: 1 }}>
              {t("help.requestSection")}
            </AppText>
          </View>
          <AppButton
            title={t("help.requestButton")}
            onPress={() => Linking.openURL(REQUEST_FORM_URL)}
            variant="outline"
          />
        </View>

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
  faqCard: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  bottomSpacer: {
    height: Spacing.huge,
  },
});
