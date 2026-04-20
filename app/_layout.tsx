import {
  NotoSerif_400Regular,
  NotoSerif_700Bold,
  useFonts as useNotoSerif,
} from "@expo-google-fonts/noto-serif";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts as useJakarta,
} from "@expo-google-fonts/plus-jakarta-sans";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import "react-native-reanimated";

import { AppTourOverlay, SplashOverlay } from "@/src/components";
import { initDatabase } from "@/src/database";
import { useTheme } from "@/src/hooks";
import { fetchAndSyncAartis, needsSync } from "@/src/services";
import { useAppStore, useFavoritesStore } from "@/src/store";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function RootNavigator() {
  const { colors, isDark } = useTheme();

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.surface,
          card: colors.surface,
          text: colors.onSurface,
          border: "transparent",
          primary: colors.primary,
          notification: colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.surface,
          card: colors.surface,
          text: colors.onSurface,
          border: "transparent",
          primary: colors.primary,
          notification: colors.primary,
        },
      };

  return (
    <ThemeProvider value={navTheme}>
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="aarti/[id]" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="category/[name]" />
        <Stack.Screen name="help" />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [dbReady, setDbReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const { hasSeenTour, setHasSeenTour } = useAppStore();

  const [serifLoaded] = useNotoSerif({
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });
  const [jakartaLoaded] = useJakarta({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    initDatabase()
      .then(() =>
        Promise.all([
          useAppStore.getState().loadPersistedSettings(),
          useFavoritesStore.getState().loadFavorites(),
        ]),
      )
      .then(() => setDbReady(true));
  }, []);

  useEffect(() => {
    if (serifLoaded && jakartaLoaded) {
      // Hide native splash as soon as fonts are ready — don't block on DB
      SplashScreen.hideAsync();
    }
  }, [serifLoaded, jakartaLoaded]);

  // Auto-sync when app returns to foreground after 24h staleness
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        try {
          const shouldSync = await needsSync();
          if (shouldSync) {
            await fetchAndSyncAartis();
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ["allAartis"] }),
              queryClient.invalidateQueries({ queryKey: ["categories"] }),
              queryClient.invalidateQueries({ queryKey: ["featured"] }),
              queryClient.invalidateQueries({ queryKey: ["recents"] }),
            ]);
          }
        } catch {
          // silent - offline mode
        }
      }
    });
    return () => subscription.remove();
  }, []);

  const handleSplashFinished = useCallback(() => {
    setSplashDone(true);
  }, []);

  // Show nothing while fonts are still loading
  if (!serifLoaded || !jakartaLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      {dbReady && !hasSeenTour && <AppTourOverlay onFinished={() => setHasSeenTour(true)} />}
      {(!splashDone || !dbReady) && <SplashOverlay onFinished={handleSplashFinished} />}
    </QueryClientProvider>
  );
}
