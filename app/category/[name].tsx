import { useT, useTheme } from "@/src/hooks";
import { CategoryScreen } from "@/src/screens";
import { Stack, useLocalSearchParams } from "expo-router";

export default function CategoryRoute() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { colors } = useTheme();
  const t = useT();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: name ?? t("category.fallback"),
          headerTintColor: colors.onSurface,
          headerStyle: { backgroundColor: colors.surface },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: "NotoSerif_700Bold" },
        }}
      />
      <CategoryScreen />
    </>
  );
}
