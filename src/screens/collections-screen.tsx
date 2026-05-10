import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AartiList, AnimatedHomeMandala, AppText, EmptyState, LoadingView } from "@/src/components";
import { Radius, Spacing } from "@/src/constants";
import { getAllAartis } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { useAppStore } from "@/src/store";
import { getLocalizedType } from "@/src/utils";

interface TypeOption {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}

export function CollectionsScreen() {
  const { colors } = useTheme();
  const t = useT();
  const language = useAppStore((s) => s.language);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: allAartis = [], isLoading } = useQuery({
    queryKey: ["allAartis"],
    queryFn: getAllAartis,
  });

  const typeOptions = useMemo<TypeOption[]>(() => {
    const map = new Map<string, TypeOption>();
    for (const item of allAartis) {
      if (!map.has(item.type)) {
        map.set(item.type, {
          value: item.type,
          label: getLocalizedType(item, language),
          count: 1,
        });
      } else {
        const existing = map.get(item.type)!;
        map.set(item.type, { ...existing, count: existing.count + 1 });
      }
    }
    return [...map.values()];
  }, [allAartis, language]);

  useEffect(() => {
    if (!selectedType && typeOptions.length > 0) {
      setSelectedType(typeOptions[0].value);
    }
  }, [selectedType, typeOptions]);

  const filtered = useMemo(
    () => allAartis.filter((item) => item.type === selectedType),
    [allAartis, selectedType],
  );

  if (isLoading && allAartis.length === 0) {
    return <LoadingView message={t("generic.loading")} />;
  }

  if (typeOptions.length === 0) {
    return (
      <EmptyState
        icon="collections-bookmark"
        title={t("collections.emptyTitle")}
        message={t("collections.emptyMsg")}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={styles.headerWrap}>
        <AnimatedHomeMandala
          color={colors.primary}
          size={210}
          opacity={0.07}
          style={styles.headerMandala}
        />
        <View style={styles.headerRow}>
          <View>
            <AppText variant="headlineLg">{t("collections.title")}</AppText>
            <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
              {t("collections.subtitle")}
            </AppText>
          </View>
          <View style={[styles.totalBadge, { backgroundColor: colors.surfaceContainer }]}>
            <MaterialIcons name="auto-awesome" size={16} color={colors.primary} />
            <AppText variant="labelMd" color={colors.primary}>
              {typeOptions.length} {t("collections.allTypes")}
            </AppText>
          </View>
        </View>

        <FlashList
          data={typeOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeList}
          keyExtractor={(item) => item.value}
          renderItem={({ item }: { item: TypeOption }) => {
            const active = item.value === selectedType;
            return (
              <Pressable
                onPress={() => setSelectedType(item.value)}
                style={({ pressed }) => [
                  styles.typeChip,
                  {
                    backgroundColor: active ? colors.primaryContainer : colors.surfaceContainerLow,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
              >
                <AppText
                  variant="titleSm"
                  color={active ? colors.onPrimaryContainer : colors.onSurface}
                  numberOfLines={1}
                >
                  {item.label}
                </AppText>
                <AppText
                  variant="labelSm"
                  color={active ? colors.onPrimaryContainer : colors.outline}
                >
                  {item.count} {t("collections.items")}
                </AppText>
              </Pressable>
            );
          }}
        />
      </View>

      {selectedType ? (
        <AartiList data={filtered} variant="compact" />
      ) : (
        <View style={styles.emptySelection}>
          <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
            {t("collections.selectType")}
          </AppText>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrap: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    overflow: "hidden",
  },
  headerMandala: {
    position: "absolute",
    right: -50,
    top: -30,
  },
  headerRow: {
    gap: Spacing.md,
  },
  totalBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    flexShrink: 0,
  },
  typeList: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  typeChip: {
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minWidth: 120,
    gap: 2,
  },
  emptySelection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
});
