import { Typography } from "@/src/constants";
import { useTheme } from "@/src/hooks";
import React from "react";
import { Text, type TextProps } from "react-native";

type TypographyVariant = keyof typeof Typography;

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function AppText({ variant = "bodyMd", color, style, ...props }: AppTextProps) {
  const { colors } = useTheme();
  const typo = Typography[variant];

  return (
    <Text
      style={[
        {
          color: color ?? colors.onSurface,
          fontFamily: typo.fontFamily,
          fontSize: typo.fontSize,
          lineHeight: typo.lineHeight,
          ...("letterSpacing" in typo
            ? {
                letterSpacing: (typo as { letterSpacing: number }).letterSpacing,
              }
            : {}),
        },
        style,
      ]}
      {...props}
    />
  );
}
