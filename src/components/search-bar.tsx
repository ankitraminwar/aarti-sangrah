import { Radius, Spacing, Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText, placeholder, ...props }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerHigh }]}>
      <MaterialIcons name="search" size={22} color={colors.onSurfaceVariant} />
      <TextInput
        style={[
          styles.input,
          {
            color: colors.onSurface,
            fontFamily: Typography.bodyMd.fontFamily,
            fontSize: Typography.bodyMd.fontSize,
          },
        ]}
        placeholder={placeholder ?? "Search aartis..."}
        placeholderTextColor={colors.outline}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        returnKeyType="search"
        {...props}
      />
      {value.length > 0 && (
        <MaterialIcons
          name="close"
          size={20}
          color={colors.onSurfaceVariant}
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.xs,
  },
});
