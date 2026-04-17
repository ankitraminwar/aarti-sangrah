/**
 * Theme system derived from Stitch MCP Design System: "The Sacred Editorial"
 * Light and Dark palettes sourced from the Stitch project's namedColors.
 * No hardcoded colors anywhere else in the app.
 */

export const LightColors = {
  primary: "#8f4e00",
  primaryContainer: "#ff9933",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#693800",

  secondary: "#755a1d",
  secondaryContainer: "#fed88e",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#785d1f",

  tertiary: "#006782",
  tertiaryContainer: "#b9eaff",

  surface: "#faf9f6",
  surfaceDim: "#dbdad7",
  surfaceBright: "#faf9f6",
  surfaceContainer: "#efeeeb",
  surfaceContainerLow: "#f4f3f1",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e9e8e5",
  surfaceContainerHighest: "#e3e2e0",

  onSurface: "#1a1c1a",
  onSurfaceVariant: "#554336",

  outline: "#887364",
  outlineVariant: "#dbc2b0",

  background: "#faf9f6",
  onBackground: "#1a1c1a",

  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onError: "#ffffff",
  onErrorContainer: "#93000a",

  inverseSurface: "#2f312f",
  inverseOnSurface: "#f2f1ee",
  inversePrimary: "#ffb77a",

  surfaceTint: "#8f4e00",

  primaryFixed: "#ffdcc2",
  primaryFixedDim: "#ffb77a",
  secondaryFixed: "#ffdea0",
  secondaryFixedDim: "#e6c27a",

  // Gradient helpers
  gradientStart: "#ff9933",
  gradientEnd: "#ffffff",
  cardShadow: "rgba(143, 78, 0, 0.08)",
} as const;

export const DarkColors = {
  primary: "#ffc08d",
  primaryContainer: "#ff9933",
  onPrimary: "#4c2700",
  onPrimaryContainer: "#693800",

  secondary: "#e9c349",
  secondaryContainer: "#af8d11",
  onSecondary: "#3c2f00",
  onSecondaryContainer: "#342800",

  tertiary: "#f7c57a",
  tertiaryContainer: "#d9aa61",

  surface: "#131313",
  surfaceDim: "#131313",
  surfaceBright: "#393939",
  surfaceContainer: "#20201f",
  surfaceContainerLow: "#1c1b1b",
  surfaceContainerLowest: "#0e0e0e",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerHighest: "#353535",

  onSurface: "#e5e2e1",
  onSurfaceVariant: "#dbc2b0",

  outline: "#a38d7c",
  outlineVariant: "#554336",

  background: "#131313",
  onBackground: "#e5e2e1",

  error: "#ffb4ab",
  errorContainer: "#93000a",
  onError: "#690005",
  onErrorContainer: "#ffdad6",

  inverseSurface: "#e5e2e1",
  inverseOnSurface: "#313030",
  inversePrimary: "#8f4e00",

  surfaceTint: "#ffb77a",

  primaryFixed: "#ffdcc2",
  primaryFixedDim: "#ffb77a",
  secondaryFixed: "#ffe088",
  secondaryFixedDim: "#e9c349",

  // Gradient helpers
  gradientStart: "#ff9933",
  gradientEnd: "#0e0e0e",
  cardShadow: "rgba(255, 183, 122, 0.06)",
} as const;

export type AppColors = { [K in keyof typeof LightColors]: string };

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Typography = {
  displayLg: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  headlineLg: {
    fontFamily: "NotoSerif_700Bold",
    fontSize: 28,
    lineHeight: 36,
  },
  headlineMd: {
    fontFamily: "NotoSerif_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
  },
  headlineSm: {
    fontFamily: "NotoSerif_500Medium",
    fontSize: 20,
    lineHeight: 28,
  },
  titleLg: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    lineHeight: 26,
  },
  titleMd: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  titleSm: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLg: {
    fontFamily: "NotoSerif_400Regular",
    fontSize: 16,
    lineHeight: 26,
  },
  bodyMd: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  bodySm: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  labelLg: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    lineHeight: 16,
  },
  labelSm: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10,
    lineHeight: 14,
  },
} as const;
