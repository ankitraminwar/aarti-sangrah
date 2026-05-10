import { getAartisByCategory } from "@/src/database";
import { useT, useTheme } from "@/src/hooks";
import { CategoryScreen } from "@/src/screens";
import { useAppStore } from "@/src/store";
import { getLocalizedCategory } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";

export default function CategoryRoute() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { colors } = useTheme();
  const t = useT();
  const language = useAppStore((s) => s.language);

  // Same query key as CategoryScreen — served from React Query cache, no extra DB call
  const { data: aartis = [] } = useQuery({
    queryKey: ["category", name],
    queryFn: () => getAartisByCategory(name ?? ""),
    enabled: !!name,
  });

  const translationsJson = aartis[0]?.translationsJson ?? "{}";
  const headerTitle = getLocalizedCategory(
    translationsJson,
    name ?? t("category.fallback"),
    language,
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle,
          headerTintColor: colors.onSurface,
          headerStyle: { backgroundColor: colors.surface },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: "NotoSerif_700Bold" },
          contentStyle: { backgroundColor: colors.surface },
        }}
      />
      <CategoryScreen />
    </>
  );
}
