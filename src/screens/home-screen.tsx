import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AartiCard, AppText, CategoryCard, DataSyncOverlay, SectionHeader } from "@/src/components";
import { Spacing } from "@/src/constants";
import { getAllAartis, getCategories, getFeaturedAartis, getRecentAartis } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { fetchAndSyncAartis, needsSync } from "@/src/services";
import { useFavoritesStore } from "@/src/store";

export function HomeScreen() {
  const { colors } = useTheme();
  const t = useT();
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: getFeaturedAartis,
  });

  const { data: recents = [] } = useQuery({
    queryKey: ["recents"],
    queryFn: () => getRecentAartis(5),
  });

  const { data: allAartis = [], isLoading } = useQuery({
    queryKey: ["allAartis"],
    queryFn: getAllAartis,
  });

  // Initial sync — runs when stale (>24h) or when the local DB is empty
  // (e.g. first install, partial DB reset, or corruption).
  useQuery({
    queryKey: ["initialSync"],
    queryFn: async () => {
      const shouldSync = await needsSync();
      const isEmpty = allAartis.length === 0;
      if (shouldSync || isEmpty) {
        await fetchAndSyncAartis();
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["allAartis"] }),
          queryClient.invalidateQueries({ queryKey: ["categories"] }),
          queryClient.invalidateQueries({ queryKey: ["featured"] }),
          queryClient.invalidateQueries({ queryKey: ["recents"] }),
        ]);
      }
      return true;
    },
    staleTime: Infinity,
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAndSyncAartis();
      await queryClient.refetchQueries();
    } catch {
      // silent - offline mode
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

  const todaysAarti =
    featured.length > 0 ? featured[Math.floor(Date.now() / 86400000) % featured.length] : null;

  if (isLoading && allAartis.length === 0) {
    return <DataSyncOverlay />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.surface }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.gradientStart + "22", colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top + Spacing.xl }]}
      >
        <View style={styles.headerRow}>
          <View>
            <AppText variant="labelMd" color={colors.primary}>
              {t("home.badge")}
            </AppText>
            <AppText variant="displayLg" style={styles.headerTitle}>
              {t("home.headline")}
            </AppText>
          </View>
          <View style={styles.headerActions}>
            <Pressable onPress={() => router.push("/search")} hitSlop={12}>
              <MaterialIcons name="search" size={28} color={colors.onSurface} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Today's Aarti */}
      {todaysAarti && (
        <View style={styles.section}>
          <SectionHeader title={t("home.todaysAarti")} />
          <View style={styles.sectionPadded}>
            <AartiCard
              aarti={todaysAarti}
              variant="featured"
              onPress={() => router.push(`/aarti/${todaysAarti.id}`)}
              isFavorite={favoriteIds.has(todaysAarti.id)}
              onToggleFavorite={() => toggleFavorite(todaysAarti.id)}
            />
          </View>
        </View>
      )}

      {/* Divine Collections - Category Grid */}
      <View style={styles.section}>
        <SectionHeader title={t("home.collections")} />
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              onPress={() => router.push(`/category/${cat.name}`)}
            />
          ))}
        </View>
      </View>

      {/* Featured Aartis Horizontal */}
      {featured.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            title={t("home.popular")}
            actionLabel={t("home.seeAll")}
            onAction={() => router.push("/search")}
          />
          <FlatList
            data={featured.slice(0, 8)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AartiCard
                aarti={item}
                variant="featured"
                onPress={() => router.push(`/aarti/${item.id}`)}
                isFavorite={favoriteIds.has(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            )}
          />
        </View>
      )}

      {/* Recently Read */}
      {recents.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title={t("home.continueReading")} />
          <View style={styles.sectionPadded}>
            {recents.map((item) => (
              <AartiCard
                key={item.id}
                aarti={item}
                variant="compact"
                onPress={() => router.push(`/aarti/${item.id}`)}
                isFavorite={favoriteIds.has(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            ))}
          </View>
        </View>
      )}

      <View style={{ height: insets.bottom + Spacing.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.huge,
  },
  headerGradient: {
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    marginTop: Spacing.sm,
  },
  headerActions: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginTop: Spacing.sm,
  },
  section: {
    marginTop: Spacing.xl,
  },
  sectionPadded: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  horizontalList: {
    paddingHorizontal: Spacing.xl,
  },
});
