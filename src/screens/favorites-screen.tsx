import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AartiList, AnimatedHomeMandala, AppText, EmptyState, LoadingView } from "@/src/components";
import { Spacing } from "@/src/constants";
import { getFavoriteAartis } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { useFavoritesStore } from "@/src/store";

export function FavoritesScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();
  const { favoriteIds } = useFavoritesStore();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", Array.from(favoriteIds).sort().join(",")],
    queryFn: getFavoriteAartis,
  });

  if (isLoading) {
    return <LoadingView message={t("favorites.loading")} />;
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
        <View style={styles.headerSection}>
          <AnimatedHomeMandala
            color={colors.primary}
            size={220}
            opacity={0.08}
            style={styles.headerMandala}
          />
          <AppText variant="headlineLg">{t("favorites.title")}</AppText>
        </View>
        <EmptyState
          icon="favorite-border"
          title={t("favorites.emptyTitle")}
          message={t("favorites.emptyMsg")}
          actionLabel={t("favorites.browse")}
          onAction={() => router.push("/")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={styles.headerSection}>
        <AnimatedHomeMandala
          color={colors.primary}
          size={220}
          opacity={0.08}
          style={styles.headerMandala}
        />
        <AppText variant="headlineLg">{t("favorites.title")}</AppText>
        <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
          {favorites.length} {t("favorites.saved")}{" "}
          {favorites.length === 1 ? t("favorites.hymn") : t("favorites.hymns")}
        </AppText>
      </View>
      <AartiList data={favorites} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
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
