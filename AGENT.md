# AGENT.md — Aarti Sangrah Standard Operating Procedures

> Single source of truth for AI agents, contributors, and CI/CD.

---

## 1. Project Overview

**Aarti Sangrah** is an offline-first mobile app for Hindu devotional hymns (aartis).
Built with Expo SDK 54, React Native 0.81.5, TypeScript strict mode.

| Attribute       | Value                               |
| --------------- | ----------------------------------- |
| Package Manager | `yarn` (never npm)                  |
| Runtime         | Expo SDK 54 / React Native 0.81.5   |
| Language        | TypeScript ~5.9.2 strict            |
| Router          | expo-router ~6.0.23 (file-based)    |
| Database        | expo-sqlite ~16.0.10 (WAL mode)     |
| State           | Zustand ^5.0.12                     |
| Data Fetching   | @tanstack/react-query ^5.99.0       |
| List Component  | @shopify/flash-list ^2.0.2 (v2 API) |
| Design System   | Stitch MCP "The Sacred Editorial"   |
| CDN Source      | jsdelivr (aarti-api repo)           |

---

## 2. Folder Structure

```
aarti-sangrah/
├── app/                      # expo-router pages
│   ├── _layout.tsx           # Root layout (fonts, DB init, providers)
│   ├── help.tsx              # → HelpScreen (FAQ page)
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab navigator (Home, Search, Favorites, Settings)
│   │   ├── index.tsx         # → HomeScreen
│   │   ├── search.tsx        # → SearchScreen
│   │   ├── favorites.tsx     # → FavoritesScreen
│   │   └── settings.tsx      # → SettingsScreen
│   ├── aarti/[id].tsx        # → AartiDetailScreen
│   └── category/[name].tsx   # → CategoryScreen (with Stack header)
├── src/
│   ├── types/aarti.ts        # All TypeScript interfaces & enums
│   ├── constants/
│   │   ├── theme.ts          # LightColors, DarkColors, Spacing, Radius, Typography
│   │   └── config.ts         # CDN_URL, DB_NAME, STALE_TIME, APP_VERSION
│   ├── database/index.ts     # SQLite schema, CRUD, sync_meta
│   ├── services/cdn-sync.ts  # CDN fetch → normalize → upsert
│   ├── store/
│   │   ├── app-store.ts      # themeMode, fontSize, language
│   │   └── favorites-store.ts# favoriteIds Set, toggle, load
│   ├── hooks/
│   │   ├── use-theme.ts      # { colors, isDark }
│   │   └── use-font-size.ts  # FontSizeConfig from store
│   ├── components/           # Reusable UI components
│   │   ├── app-text.tsx      # Typography component
│   │   ├── app-button.tsx    # Primary/secondary/outline
│   │   ├── app-modal.tsx     # Themed modal (replaces Alert.alert)
│   │   ├── aarti-card.tsx    # default/featured/compact variants
│   │   ├── category-card.tsx # Grid card with icon
│   │   ├── search-bar.tsx    # Themed search input
│   │   ├── section-header.tsx# Title + optional action
│   │   ├── empty-state.tsx   # Empty state with icon
│   │   ├── data-sync-overlay.tsx # Animated first-launch overlay (reanimated)
│   │   ├── splash-overlay.tsx# Custom animated splash screen (reanimated)
│   │   └── loading-view.tsx  # Spinner + message
│   └── screens/              # Screen components
│       ├── home-screen.tsx
│       ├── search-screen.tsx
│       ├── favorites-screen.tsx
│       ├── settings-screen.tsx
│       ├── aarti-detail-screen.tsx
│       ├── category-screen.tsx
│       └── help-screen.tsx
├── assets/images/            # App icons, splash
├── .github/                  # PR template, issue templates, CODEOWNERS
├── app.json                  # Expo config
├── eas.json                  # EAS Build profiles
├── .prettierrc               # Prettier config
├── .prettierignore
├── eslint.config.js
└── tsconfig.json
```

---

## 3. Commands

| Action              | Command                                          |
| ------------------- | ------------------------------------------------ |
| Install deps        | `yarn install`                                   |
| Start dev server    | `yarn start`                                     |
| Run on Android      | `yarn android`                                   |
| Run on iOS          | `yarn ios`                                       |
| Lint                | `yarn lint`                                      |
| Format              | `yarn format`                                    |
| Format check        | `yarn format:check`                              |
| TypeScript check    | `npx tsc --noEmit`                               |
| Expo doctor         | `npx expo-doctor`                                |
| Export (web)        | `npx expo export --platform web`                 |
| EAS build (preview) | `eas build --profile preview --platform android` |
| EAS build (prod)    | `eas build --profile production --platform all`  |

---

## 4. Design System Rules ("The Sacred Editorial")

Source: **Stitch MCP Project ID `15837709185489920781`**

### 4.1 Color System

All colors MUST come from `src/constants/theme.ts`. Never hardcode hex values.

**Light palette key colors:**

- `surface`: `#faf9f6` (warm off-white)
- `primary`: `#8f4e00` (deep saffron)
- `primaryContainer`: `#ff9933` (vibrant saffron)
- `onSurface`: `#1a1c1a`
- `gradientStart`: `#ff9933`

**Dark palette key colors:**

- `surface`: `#131313`
- `primary`: `#ffc08d`
- `primaryContainer`: `#ff9933`
- `onSurface`: `#e5e2e1`

### 4.2 Visual Rules

| Rule             | Implementation                                           |
| ---------------- | -------------------------------------------------------- |
| No 1px borders   | Use tonal surface layering (surfaceContainer hierarchy)  |
| Saffron gradient | `LinearGradient` with `gradientStart + "22"` → `surface` |
| Rounded corners  | `Radius.xl` (24px) for cards                             |
| Vertical rhythm  | `Spacing.lg` (16px) between sections                     |
| Press animation  | `transform: [{ scale: 0.98 }]` on Pressable              |
| Shadows          | Primary-tinted: `cardShadow` from theme                  |
| Touch targets    | Minimum 48×48 on all interactive elements                |

### 4.3 Verse Alternating Colors

In `aarti-detail-screen.tsx`, verse blocks alternate backgrounds:

- Even index: `colors.surfaceContainerLow`
- Odd index: `colors.surfaceContainer`
- Chorus type: text color `colors.primary`
- All verse blocks: `padding: Spacing.lg`, `borderRadius: Radius.xl`

### 4.4 Typography

| Token      | Font                    | Size | Use               |
| ---------- | ----------------------- | ---- | ----------------- |
| displayLg  | NotoSerif_700Bold       | 36   | Screen titles     |
| headlineLg | NotoSerif_700Bold       | 28   | Section headings  |
| headlineMd | NotoSerif_700Bold       | 24   | Sub-headings      |
| headlineSm | NotoSerif_700Bold       | 20   | Card headings     |
| bodyLg     | NotoSerif_400Regular    | 16   | Aarti verse text  |
| titleLg    | PlusJakartaSans_600Semi | 18   | Card titles       |
| labelMd    | PlusJakartaSans_500Med  | 12   | Badges, meta text |

---

## 5. Architecture Patterns

### 5.1 Data Flow

```
CDN (jsdelivr) → cdn-sync.ts → SQLite (expo-sqlite)
                                    ↓
                            React Query cache
                                    ↓
                              Screen components
```

### 5.2 State Management

- **Server state**: `@tanstack/react-query` (DB reads, CDN sync)
- **Client state**: Zustand stores
  - `app-store`: themeMode, fontSize, language
  - `favorites-store`: favoriteIds Set (synced with SQLite)
- **Favorites** are loaded once at app startup in `_layout.tsx`. Individual screens subscribe to the store — do NOT call `loadFavorites()` in screen `useEffect` hooks.

### 5.3 Screen Pattern

Every screen:

1. Uses `SafeAreaView` from `react-native-safe-area-context` (or `useSafeAreaInsets`)
2. Gets colors from `useTheme()` hook
3. Sets background via `{ backgroundColor: colors.surface }`
4. Imports from `@/src/components`, `@/src/constants`, etc.

### 5.4 FlashList v2

- Do NOT pass `estimatedItemSize` — it's auto-calculated in v2
- Use `FlashList` for any list > 10 items
- Use `FlatList` for small horizontal lists

---

## 6. Sharing & Copy

### Image Sharing

Sharing uses **image format** (not plain text):

- `react-native-view-shot` captures a styled card view
- Share card content is rendered via a `renderShareCard(keyPrefix)` helper to avoid duplication
- Two `ViewShot` refs: one for file-based sharing (`expo-sharing`), one for base64 clipboard copy
- Card includes: app logo, app name, aarti title, author, first few verses, footer
- Shared via `expo-sharing` as PNG
- Hidden `ViewShot` views are positioned off-screen (`left: -9999`)

### Image Copy

Copy also uses **image format**:

- A separate `ViewShot` with `result: "base64"` captures the styled card
- `expo-clipboard` `setImageAsync(base64)` copies the image to clipboard
- Copy button shows an animated checkmark icon for 2 seconds after copy

---

## 7. Dialogs

Use `AppModal` component instead of `Alert.alert()`:

- Themed modal that matches the design system
- Props: `visible`, `title`, `message`, `onDismiss`, optional `primaryLabel` + `onPrimary`
- Uses `surfaceContainerLowest` background, `primaryContainer` for primary button

---

## 8. Offline-First Strategy

1. On first launch, fetch all aartis from CDN
2. Store in SQLite with WAL mode for concurrent reads
3. `sync_meta` table tracks last sync timestamp
4. Re-sync if stale (>24h) or on manual pull-to-refresh
5. All reads come from SQLite, never directly from CDN
6. Graceful offline: catch fetch errors silently, show cached data

---

## 9. Safe Area

All tab screens and the aarti detail screen use safe area handling:

- Tab screens: `SafeAreaView` with `edges={["top"]}`
- Home screen: `useSafeAreaInsets()` for gradient header padding
- Category screen: Stack header handles safe area automatically
- Aarti detail: `SafeAreaView` with `edges={["top"]}`

---

## 10. Localization

- `expo-localization` installed for device locale detection
- App store has `language` field: `"hi"` | `"mr"` | `"en"`
- Language selector in Settings screen
- Labels defined in `APP_LANGUAGE_LABELS` in types

---

## 11. Build & Deploy

### EAS Profiles (`eas.json`)

| Profile     | Platform | Distribution | Notes                      |
| ----------- | -------- | ------------ | -------------------------- |
| development | Both     | internal     | Dev client, APK/Simulator  |
| preview     | Both     | internal     | Internal testing APK       |
| production  | Both     | store        | Auto-increment versionCode |

### Pre-submission Checklist

- [ ] `yarn lint` — 0 warnings
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `yarn format:check` — all files formatted
- [ ] `npx expo-doctor` — all checks pass
- [ ] `npx expo export --platform web` — builds successfully
- [ ] Tested light + dark themes
- [ ] Tested all font sizes (small → xlarge)
- [ ] App icons are real (not template)
- [ ] Splash screen shows app logo

---

## 12. Critical Don'ts

- **Don't use npm** — always `yarn`
- **Don't hardcode colors** — use `colors.xxx` from `useTheme()`
- **Don't use `estimatedItemSize`** in FlashList v2
- **Don't add 1px borders** — use tonal surface layering
- **Don't skip SafeAreaView** on any screen
- **Don't use `View` from react-native** as safe area substitute
- **Don't commit without formatting** — `yarn format` first

---

## 13. Animation Best Practices

- All animations MUST use `react-native-reanimated` (UI thread), never the old `Animated` from `react-native`
- The splash overlay and data sync overlay use `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring`, `withDelay`, `withRepeat`, and `withSequence`
- Use `scheduleOnRN` from `react-native-worklets` to call JS callbacks from worklets (e.g., `onFinished` after splash fade)
- For entering/exiting layout animations, use reanimated's `FadeIn`, `FadeOut`, etc.
- Only two font families are loaded: `NotoSerif` (400 Regular, 700 Bold) and `PlusJakartaSans` (400, 500, 600, 700). All Typography tokens must map to these loaded weights.
