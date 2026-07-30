import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AartiList, AppText, EmptyState, LoadingView, SearchBar } from "@/src/components";
import { REQUEST_FORM_URL, Spacing } from "@/src/constants";
import { getAllAartis, searchAartis } from "@/src/database";
import { useResponsiveLayout, useT, useTheme } from "@/src/hooks";
import { useAppStore } from "@/src/store";
import { APP_LANGUAGE_LABELS, type AppLanguage } from "@/src/types";

const LANGUAGE_FILTER_OPTIONS: {
  value: string;
  displayCode: AppLanguage | "all";
  label: string;
}[] = [
  { value: "all", displayCode: "all", label: "All" },
  { value: "Hindi", displayCode: "hi", label: APP_LANGUAGE_LABELS.hi },
  { value: "Marathi", displayCode: "mr", label: APP_LANGUAGE_LABELS.mr },
  { value: "English", displayCode: "en", label: APP_LANGUAGE_LABELS.en },
  { value: "Sanskrit", displayCode: "en", label: "संस्कृत" },
];

function getFilterLabel(value: string, currentLanguage: AppLanguage) {
  const option = LANGUAGE_FILTER_OPTIONS.find((opt) => opt.value === value);
  if (!option) return value;

  if (value === "all") {
    return currentLanguage === "hi" ? "सभी" : currentLanguage === "mr" ? "सर्व" : "All";
  }

  return option.label;
}

export function SearchScreen() {
  const { colors } = useTheme();
  const t = useT();
  const { listPaddingHorizontal } = useResponsiveLayout();
  const appLanguage = useAppStore((state) => state.language);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery, languageFilter],
    queryFn: () =>
      debouncedQuery.trim().length > 0
        ? searchAartis(debouncedQuery.trim(), languageFilter)
        : getAllAartis(languageFilter),
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={[styles.header, { paddingHorizontal: listPaddingHorizontal }]}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t("search.placeholder")}
          autoFocus
        />
        <View style={styles.filterRow}>
          {LANGUAGE_FILTER_OPTIONS.map((option) => {
            const isSelected = languageFilter === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setLanguageFilter(option.value)}
                style={[
                  styles.filterChip,
                  isSelected && [styles.filterChipActive, { backgroundColor: colors.primary }],
                ]}
              >
                <AppText
                  variant="labelMd"
                  color={isSelected ? colors.onPrimary : colors.onSurfaceVariant}
                >
                  {getFilterLabel(option.value, appLanguage)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
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
        <AartiList data={results} variant="compact" />
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
    paddingBottom: Spacing.md,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  filterChipActive: {
    backgroundColor: "#000",
  },
});
