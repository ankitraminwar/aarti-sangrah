import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AartiCard, EmptyState, LoadingView, SearchBar } from "@/src/components";
import { REQUEST_FORM_URL, Spacing } from "@/src/constants";
import { getAllAartis, searchAartis } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { useFavoritesStore } from "@/src/store";
import type { Aarti } from "@/src/types";

export function SearchScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      debouncedQuery.trim().length > 0 ? searchAartis(debouncedQuery.trim()) : getAllAartis(),
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={styles.header}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t("search.placeholder")}
          autoFocus
        />
      </View>

      {isLoading ? (
        <LoadingView message={t("search.searching")} />
      ) : results.length === 0 ? (
        <EmptyState
          icon="search-off"
          title={t("search.noResults")}
          message={t("search.noResultsMsg", { query: debouncedQuery })}
          actionLabel={t("help.requestButton")}
          onAction={() => Linking.openURL(REQUEST_FORM_URL)}
        />
      ) : (
        <FlashList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }: { item: Aarti }) => (
            <View style={styles.cardWrapper}>
              <AartiCard
                aarti={item}
                variant="compact"
                onPress={() => router.push(`/aarti/${item.id}`)}
                isFavorite={favoriteIds.has(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
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
