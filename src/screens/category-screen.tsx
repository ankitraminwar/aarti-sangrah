import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { AartiList, AnimatedHomeMandala, AppText, EmptyState, LoadingView } from "@/src/components";
import { Spacing } from "@/src/constants";
import { getAartisByCategory } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { useAppStore } from "@/src/store";
import { getLocalizedCategory } from "@/src/utils";

export function CategoryScreen() {
  const { colors } = useTheme();
  const t = useT();
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const language = useAppStore((s) => s.language);

  const { data: aartis = [], isLoading } = useQuery({
    queryKey: ["category", name],
    queryFn: () => getAartisByCategory(name ?? ""),
    enabled: !!name,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <LoadingView message={t("category.loading")} />
      </View>
    );
  }

  if (aartis.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <EmptyState
          icon="library-music"
          title={t("category.emptyTitle")}
          message={t("category.emptyMsg", { name: name ?? "" })}
          actionLabel={t("category.goHome")}
          onAction={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <AnimatedHomeMandala
          color={colors.primary}
          size={220}
          opacity={0.08}
          style={styles.headerMandala}
        />
        <AppText variant="labelMd" color={colors.primary}>
          {aartis.length} {aartis.length === 1 ? t("category.hymn") : t("category.hymns")}
        </AppText>
        <AppText variant="headlineLg">
          {getLocalizedCategory(aartis[0]?.translationsJson ?? "{}", name ?? "", language)}
        </AppText>
        <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
          {t("category.description")}
        </AppText>
      </View>
      <AartiList data={aartis} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    gap: Spacing.xs,
    overflow: "hidden",
  },
  headerMandala: {
    position: "absolute",
    right: -40,
    top: -20,
  },
});
