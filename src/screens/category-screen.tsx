import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { AartiCard, AppText, EmptyState, LoadingView } from "@/src/components";
import { Spacing } from "@/src/constants";
import { getAartisByCategory } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { useFavoritesStore } from "@/src/store";
import type { Aarti } from "@/src/types";

export function CategoryScreen() {
  const { colors } = useTheme();
  const t = useT();
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const { favoriteIds, toggleFavorite, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const { data: aartis = [], isLoading } = useQuery({
    queryKey: ["category", name],
    queryFn: () => getAartisByCategory(name ?? ""),
    enabled: !!name,
  });

  if (isLoading) {
    return <LoadingView message={t("category.loading")} />;
  }

  if (aartis.length === 0) {
    return (
      <EmptyState
        icon="library-music"
        title={t("category.emptyTitle")}
        message={t("category.emptyMsg", { name: name ?? "" })}
        actionLabel={t("category.goHome")}
        onAction={() => router.back()}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <AppText variant="labelMd" color={colors.primary}>
          {aartis.length} {aartis.length === 1 ? t("category.hymn") : t("category.hymns")}
        </AppText>
        <AppText variant="headlineLg">{name}</AppText>
        <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
          {t("category.description")}
        </AppText>
      </View>
      <FlashList
        data={aartis}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }: { item: Aarti }) => (
          <View style={styles.cardWrapper}>
            <AartiCard
              aarti={item}
              onPress={() => router.push(`/aarti/${item.id}`)}
              isFavorite={favoriteIds.has(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          </View>
        )}
      />
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
  },
  list: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  cardWrapper: {
    paddingVertical: Spacing.xs,
  },
  separator: {
    height: Spacing.sm,
  },
});
