import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/src/constants";
import { useResponsiveLayout } from "@/src/hooks";
import { useFavoritesStore } from "@/src/store";
import type { Aarti } from "@/src/types";

import { AartiCard } from "./aarti-card";

const ItemSeparator = memo(function ItemSeparator() {
  return <View style={styles.separator} />;
});

interface AartiListProps {
  data: Aarti[];
  variant?: "default" | "compact";
}

export function AartiList({ data, variant = "default" }: AartiListProps) {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const { listPaddingHorizontal } = useResponsiveLayout();

  const renderItem = useCallback(
    ({ item }: { item: Aarti }) => (
      <View style={styles.cardWrapper}>
        <AartiCard
          aarti={item}
          variant={variant}
          onPress={() => router.push(`/aarti/${item.id}`)}
          isFavorite={favoriteIds.has(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      </View>
    ),
    [favoriteIds, router, toggleFavorite, variant],
  );

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.list, { paddingHorizontal: listPaddingHorizontal }]}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: Spacing.huge,
  },
  cardWrapper: {
    paddingVertical: Spacing.xs,
  },
  separator: {
    height: Spacing.sm,
  },
});
