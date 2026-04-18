import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";

import { AppText, LoadingView } from "@/src/components";
import { Radius, Spacing } from "@/src/constants";
import { getAartiById, upsertRecent } from "@/src/database";
import { useFontSize, useT, useTheme } from "@/src/hooks";
import { useAppStore, useFavoritesStore } from "@/src/store";
import type { CdnVerse } from "@/src/types";
import { getLocalizedTitle } from "@/src/utils";

export function AartiDetailScreen() {
  const { colors } = useTheme();
  const t = useT();
  const fontConfig = useFontSize();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const language = useAppStore((s) => s.language);
  const scrollRef = useRef<ScrollView>(null);
  const shareRef = useRef<ViewShot>(null);
  const copyShareRef = useRef<ViewShot>(null);
  const [copied, setCopied] = useState(false);
  const [localDelta, setLocalDelta] = useState(0);
  const decreaseFont = useCallback(() => setLocalDelta((d) => Math.max(-6, d - 2)), []);
  const increaseFont = useCallback(() => setLocalDelta((d) => Math.min(8, d + 2)), []);

  const { data: aarti, isLoading } = useQuery({
    queryKey: ["aarti", id],
    queryFn: () => getAartiById(id ?? ""),
    enabled: !!id,
  });

  // Track recent on mount
  useEffect(() => {
    if (id) {
      upsertRecent(id, 0);
    }
  }, [id]);

  const handleShare = useCallback(async () => {
    if (!aarti || !shareRef.current?.capture) return;
    try {
      const uri = await shareRef.current.capture();
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: getLocalizedTitle(aarti, language),
      });
    } catch {
      // fallback silently
    }
  }, [aarti, language]);

  const handleCopy = useCallback(async () => {
    if (!aarti || !copyShareRef.current?.capture) return;
    try {
      const base64 = await copyShareRef.current.capture();
      await Clipboard.setImageAsync(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  }, [aarti]);

  if (isLoading || !aarti) {
    return <LoadingView message={t("detail.loading")} />;
  }

  let verses: CdnVerse[] = [];
  try {
    verses = JSON.parse(aarti.versesJson) as CdnVerse[];
  } catch {
    // fallback to content
  }

  const isFav = favoriteIds.has(aarti.id);

  // Precompute which verses get primary-colored text.
  // Chorus is always primary. Every other non-chorus verse gets primary.
  // After a chorus, the next non-chorus verse is skipped (stays normal).
  const versePrimaryFlags: boolean[] = [];
  {
    let counter = 0;
    let skipNext = false;
    for (const verse of verses) {
      if (verse.type === "chorus") {
        versePrimaryFlags.push(true);
        skipNext = true;
      } else if (skipNext) {
        versePrimaryFlags.push(false);
        skipNext = false;
      } else {
        counter++;
        versePrimaryFlags.push(counter % 2 === 0);
      }
    }
  }

  const renderShareCard = (keyPrefix: string, limitVerses?: boolean) => {
    const displayVerses = limitVerses ? verses.slice(0, 4) : verses;
    return (
      <View style={[styles.shareCard, { backgroundColor: colors.surface }]}>
        <View style={styles.shareHeader}>
          <Image source={require("@/assets/images/icon.png")} style={styles.shareLogo} />
          <View>
            <AppText variant="titleMd" style={{ color: colors.onSurface }}>
              {t("detail.appName")}
            </AppText>
            <AppText variant="labelSm" style={{ color: colors.onSurfaceVariant }}>
              {t("detail.tagline")}
            </AppText>
          </View>
        </View>
        <AppText variant="headlineMd" style={{ color: colors.onSurface }}>
          {getLocalizedTitle(aarti, language)}
        </AppText>
        {aarti.author ? (
          <AppText variant="bodySm" style={{ color: colors.onSurfaceVariant }}>
            — {aarti.author}
          </AppText>
        ) : null}
        <View style={[styles.shareDivider, { backgroundColor: colors.primaryContainer }]} />
        {verses.length > 0 ? (
          displayVerses.map((verse, vIdx) => (
            <View key={`${keyPrefix}-v-${vIdx}`} style={styles.shareVerse}>
              {verse.lines.map((line, lIdx) => (
                <AppText
                  key={`${keyPrefix}-l-${vIdx}-${lIdx}`}
                  variant="bodyMd"
                  style={{
                    color: verse.type === "chorus" ? colors.primary : colors.onSurface,
                  }}
                >
                  {line}
                </AppText>
              ))}
            </View>
          ))
        ) : (
          <AppText variant="bodyMd" style={{ color: colors.onSurface }}>
            {aarti.content}
          </AppText>
        )}
        <AppText
          variant="labelSm"
          style={{ color: colors.outline, textAlign: "center", marginTop: Spacing.md }}
        >
          {t("detail.sharedFrom")}
        </AppText>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]} edges={["top"]}>
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: colors.surface }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </Pressable>
        <View style={styles.toolbarActions}>
          <Pressable onPress={decreaseFont} hitSlop={12} style={styles.fontSizeBtn}>
            <AppText
              style={[
                styles.fontSizeLabel,
                {
                  color: localDelta <= -6 ? colors.outline : colors.onSurfaceVariant,
                  fontWeight: "bold",
                },
              ]}
            >
              A-
            </AppText>
          </Pressable>
          <Pressable onPress={increaseFont} hitSlop={12} style={styles.fontSizeBtn}>
            <AppText
              style={[
                styles.fontSizeLabel,
                { color: localDelta >= 8 ? colors.outline : colors.onSurface, fontWeight: "bold" },
              ]}
            >
              A+
            </AppText>
          </Pressable>
          <Pressable onPress={handleCopy} hitSlop={12}>
            {copied ? (
              <Animated.View entering={FadeInUp.duration(250)} exiting={FadeOut.duration(200)}>
                <MaterialIcons name="check" size={22} color={colors.primary} />
              </Animated.View>
            ) : (
              <MaterialIcons name="content-copy" size={22} color={colors.onSurfaceVariant} />
            )}
          </Pressable>
          <Pressable onPress={handleShare} hitSlop={12}>
            <MaterialIcons name="share" size={22} color={colors.onSurfaceVariant} />
          </Pressable>
          <Pressable onPress={() => toggleFavorite(aarti.id)} hitSlop={12}>
            <MaterialIcons
              name={isFav ? "favorite" : "favorite-border"}
              size={22}
              color={isFav ? colors.primary : colors.onSurfaceVariant}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title section */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.titleSection}>
          <AppText variant="labelMd" color={colors.primary}>
            {aarti.category} • {aarti.type}
          </AppText>
          <AppText
            variant="displayLg"
            style={{
              fontSize: fontConfig.heading + localDelta,
              lineHeight: (fontConfig.heading + localDelta) * 1.3,
            }}
          >
            {getLocalizedTitle(aarti, language)}
          </AppText>
          {aarti.author ? (
            <AppText variant="bodyMd" color={colors.onSurfaceVariant}>
              — {aarti.author}
            </AppText>
          ) : null}
        </Animated.View>

        {/* Verse content */}
        <Animated.View entering={FadeIn.delay(200).duration(400)} style={styles.versesContainer}>
          {verses.length > 0 ? (
            verses.map((verse, vIdx) => {
              const isEven = vIdx % 2 === 0;
              const verseBg = isEven ? colors.surfaceContainerLow : colors.surfaceContainer;

              return (
                <View
                  key={`verse-${vIdx}`}
                  style={[styles.verseBlock, { backgroundColor: verseBg }]}
                >
                  {verse.label && (
                    <View
                      style={[
                        styles.chorusBadge,
                        { backgroundColor: colors.primaryContainer + "33" },
                      ]}
                    >
                      <AppText variant="labelMd" color={colors.primary}>
                        {verse.label}
                      </AppText>
                    </View>
                  )}
                  {verse.lines.map((line, lIdx) => (
                    <AppText
                      key={`line-${vIdx}-${lIdx}`}
                      variant="bodyLg"
                      style={{
                        fontSize: fontConfig.body + localDelta,
                        lineHeight: (fontConfig.body + localDelta) * fontConfig.lineHeight,
                        ...(versePrimaryFlags[vIdx] ? { color: colors.primary } : {}),
                      }}
                    >
                      {line}
                    </AppText>
                  ))}
                </View>
              );
            })
          ) : (
            <AppText
              variant="bodyLg"
              style={{
                fontSize: fontConfig.body + localDelta,
                lineHeight: (fontConfig.body + localDelta) * fontConfig.lineHeight,
              }}
            >
              {aarti.content}
            </AppText>
          )}
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Hidden shareable image view */}
      <View style={styles.shareContainer}>
        <ViewShot ref={shareRef} options={{ format: "png", quality: 1 }}>
          {renderShareCard("share")}
        </ViewShot>
        <ViewShot ref={copyShareRef} options={{ format: "png", quality: 1, result: "base64" }}>
          {renderShareCard("copy", true)}
        </ViewShot>
      </View>
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
  toolbarActions: {
    flexDirection: "row",
    gap: Spacing.xl,
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },
  titleSection: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  versesContainer: {
    gap: Spacing.xxl,
  },
  verseBlock: {
    gap: Spacing.xs,
    padding: Spacing.lg,
    borderRadius: Radius.xl,
  },
  chorusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    marginBottom: Spacing.xs,
  },
  fontSizeBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontSizeLabel: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: Spacing.huge + Spacing.xxxl,
  },
  shareContainer: {
    position: "absolute",
    left: -9999,
    top: 0,
  },
  shareCard: {
    width: 360,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  shareHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  shareLogo: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
  },
  shareDivider: {
    height: 2,
    borderRadius: 1,
    marginVertical: Spacing.sm,
  },
  shareVerse: {
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
});
