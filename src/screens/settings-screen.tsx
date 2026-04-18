import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppModal, AppText } from "@/src/components";
import { APP_VERSION, Radius, Spacing } from "@/src/constants";
import { useT, useTheme } from "@/src/hooks";
import type { TranslationKey } from "@/src/i18n";
import { fetchAndSyncAartis, getLastSyncTime } from "@/src/services";
import { useAppStore } from "@/src/store";
import type { AppLanguage, FontSizeLevel, ThemeMode } from "@/src/types";
import { FONT_SIZE_MAP } from "@/src/types";

const LANGUAGE_OPTIONS: { value: AppLanguage; label: string }[] = [
  { value: "hi", label: "हिन्दी" },
  { value: "mr", label: "मराठी" },
  { value: "en", label: "English" },
];

const THEME_OPTIONS: {
  value: ThemeMode;
  labelKey: TranslationKey;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { value: "light", labelKey: "settings.light" as const, icon: "light-mode" },
  { value: "dark", labelKey: "settings.dark" as const, icon: "dark-mode" },
  { value: "system", labelKey: "settings.auto" as const, icon: "settings-brightness" },
];

const FONT_OPTIONS: { value: FontSizeLevel; labelKey: TranslationKey }[] = [
  { value: "small", labelKey: "settings.fontSmall" as const },
  { value: "medium", labelKey: "settings.fontMedium" as const },
  { value: "large", labelKey: "settings.fontLarge" as const },
  { value: "xlarge", labelKey: "settings.fontXLarge" as const },
];

export function SettingsScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();
  const { themeMode, setThemeMode, fontSize, setFontSize, language, setLanguage } = useAppStore();
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  React.useEffect(() => {
    getLastSyncTime().then((ts) => {
      if (ts) {
        setLastSync(new Date(ts).toLocaleString());
      }
    });
  }, []);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    try {
      await fetchAndSyncAartis();
      const ts = await getLastSyncTime();
      if (ts) setLastSync(new Date(ts).toLocaleString());
      setModalTitle(t("settings.syncSuccess"));
      setModalMessage(t("settings.syncSuccessMsg"));
      setModalVisible(true);
    } catch {
      setModalTitle(t("settings.syncOffline"));
      setModalMessage(t("settings.syncOfflineMsg"));
      setModalVisible(true);
    } finally {
      setSyncing(false);
    }
  }, [t]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText variant="headlineLg">{t("settings.title")}</AppText>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <AppText variant="labelLg" color={colors.primary} style={styles.sectionTitle}>
            {t("settings.appearance")}
          </AppText>
          <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <AppText variant="titleSm">{t("settings.theme")}</AppText>
            <View style={styles.optionRow}>
              {THEME_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setThemeMode(opt.value)}
                  style={[
                    styles.themeChip,
                    {
                      backgroundColor:
                        themeMode === opt.value ? colors.primaryContainer : colors.surfaceContainer,
                    },
                  ]}
                >
                  <MaterialIcons
                    name={opt.icon}
                    size={20}
                    color={
                      themeMode === opt.value ? colors.onPrimaryContainer : colors.onSurfaceVariant
                    }
                  />
                  <AppText
                    variant="labelMd"
                    color={
                      themeMode === opt.value ? colors.onPrimaryContainer : colors.onSurfaceVariant
                    }
                  >
                    {t(opt.labelKey)}
                  </AppText>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Font Size Section */}
        <View style={styles.section}>
          <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <AppText variant="titleSm">{t("settings.textSize")}</AppText>
            <AppText variant="bodySm" color={colors.onSurfaceVariant}>
              {t("settings.textSizeDesc")}
            </AppText>
            <View style={styles.fontOptions}>
              {FONT_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setFontSize(opt.value)}
                  style={[
                    styles.fontChip,
                    {
                      backgroundColor:
                        fontSize === opt.value ? colors.primaryContainer : colors.surfaceContainer,
                    },
                  ]}
                >
                  <AppText
                    variant="bodyMd"
                    color={
                      fontSize === opt.value ? colors.onPrimaryContainer : colors.onSurfaceVariant
                    }
                    style={{ fontSize: FONT_SIZE_MAP[opt.value].body }}
                  >
                    अ
                  </AppText>
                  <AppText
                    variant="labelSm"
                    color={
                      fontSize === opt.value ? colors.onPrimaryContainer : colors.onSurfaceVariant
                    }
                  >
                    {t(opt.labelKey)}
                  </AppText>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <AppText variant="titleSm">{t("settings.language")}</AppText>
            <AppText variant="bodySm" color={colors.onSurfaceVariant}>
              {t("settings.languageDesc")}
            </AppText>
            <View style={styles.optionRow}>
              {LANGUAGE_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setLanguage(opt.value)}
                  style={[
                    styles.themeChip,
                    {
                      backgroundColor:
                        language === opt.value ? colors.primaryContainer : colors.surfaceContainer,
                    },
                  ]}
                >
                  <AppText
                    variant="labelMd"
                    color={
                      language === opt.value ? colors.onPrimaryContainer : colors.onSurfaceVariant
                    }
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <AppText variant="labelLg" color={colors.primary} style={styles.sectionTitle}>
            {t("settings.data")}
          </AppText>
          <Pressable
            onPress={handleSync}
            disabled={syncing}
            style={[
              styles.sectionCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                opacity: syncing ? 0.6 : 1,
              },
            ]}
          >
            <View style={styles.rowBetween}>
              <View style={{ flex: 1, gap: Spacing.xs }}>
                <AppText variant="titleSm">{t("settings.refreshAartis")}</AppText>
                <AppText variant="bodySm" color={colors.onSurfaceVariant}>
                  {syncing
                    ? t("settings.syncing")
                    : lastSync
                      ? t("settings.lastSynced", { time: lastSync })
                      : t("settings.fetchLatest")}
                </AppText>
              </View>
              <MaterialIcons name="cloud-download" size={24} color={colors.primary} />
            </View>
          </Pressable>
        </View>

        {/* Help & FAQ */}
        <View style={styles.section}>
          <Pressable
            onPress={() => router.push("/help")}
            style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest }]}
          >
            <View style={styles.rowBetween}>
              <View style={{ flex: 1, gap: Spacing.xs }}>
                <AppText variant="titleSm">{t("settings.helpFaq")}</AppText>
                <AppText variant="bodySm" color={colors.onSurfaceVariant}>
                  {t("settings.helpFaqDesc")}
                </AppText>
              </View>
              <MaterialIcons name="help-outline" size={24} color={colors.primary} />
            </View>
          </Pressable>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <AppText variant="labelLg" color={colors.primary} style={styles.sectionTitle}>
            {t("settings.about")}
          </AppText>
          <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.aboutRow}>
              <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
                {t("settings.version")}
              </AppText>
              <AppText variant="bodyMd">{APP_VERSION}</AppText>
            </View>
            <View style={styles.aboutRow}>
              <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
                {t("settings.storage")}
              </AppText>
              <AppText variant="bodyMd">{t("settings.offlineSqlite")}</AppText>
            </View>
          </View>
          <AppText variant="bodySm" color={colors.outline} style={styles.footer}>
            {t("settings.footer")}
          </AppText>
        </View>
      </ScrollView>
      <AppModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        onDismiss={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.huge + Spacing.xxxl,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  sectionCard: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  optionRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  themeChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    minHeight: 48,
  },
  fontOptions: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  fontChip: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.xs,
    minHeight: 56,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.xs,
  },
  footer: {
    textAlign: "center",
    marginTop: Spacing.xl,
    paddingTop: Spacing.md,
  },
});
