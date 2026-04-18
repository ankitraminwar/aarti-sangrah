# Aarti Sangrah — The Sacred Editorial

An offline-first mobile app for Hindu devotional hymns (aartis), built with Expo and React Native.

## Features

- **Offline-First** — All aartis stored locally in SQLite. Read anytime, anywhere.
- **Multi-Language** — Hindi, Marathi, and English interface
- **Favorites** — Save aartis for quick access
- **Share & Copy** — Share aartis as beautifully styled images or copy to clipboard
- **Customizable** — Light/dark theme, adjustable text size
- **Daily Aarti** — Featured aarti on the home screen each day
- **Full-Text Search** — FTS5-powered search by name, deity, lyrics, or tags
- **Categories** — Browse by deity or occasion
- **Smooth Animations** — All animations run on the UI thread via react-native-reanimated

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | Expo SDK 54 / React Native 0.81.5   |
| Language      | TypeScript 5.9 (strict)             |
| Navigation    | expo-router (file-based)            |
| Database      | expo-sqlite (WAL mode, FTS5)        |
| State         | Zustand                             |
| Data Fetching | @tanstack/react-query               |
| Animations    | react-native-reanimated (UI thread) |
| Design System | Stitch MCP "The Sacred Editorial"   |
| Lists         | @shopify/flash-list v2              |

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn
- Android Studio or Xcode

### Setup

```bash
# Install dependencies
yarn install

# Start the development server
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `yarn start`        | Start Expo dev server          |
| `yarn android`      | Run on Android device/emulator |
| `yarn ios`          | Run on iOS simulator           |
| `yarn lint`         | Run ESLint                     |
| `yarn format`       | Format code with Prettier      |
| `yarn format:check` | Check formatting               |
| `npx tsc --noEmit`  | TypeScript type check          |

## Project Structure

```
app/              # Expo Router pages
src/
├── components/   # Reusable UI components
├── screens/      # Screen components
├── constants/    # Theme, config, spacing tokens
├── database/     # SQLite schema, CRUD, FTS5
├── store/        # Zustand state stores
├── hooks/        # Custom React hooks
├── i18n/         # Localization strings (hi/mr/en)
├── services/     # CDN sync service
├── types/        # TypeScript types
└── utils/        # Utility functions
```

See [AGENT.md](AGENT.md) for detailed architecture documentation.

## Architecture Highlights

- **React Compiler** enabled for automatic memoization
- **Favorites** loaded once at app startup — screens subscribe via Zustand, no redundant fetches
- **Animations** use `react-native-reanimated` (UI thread) — never the old `Animated` from react-native
- **Share card** content deduplicated via `renderShareCard()` helper (share + copy use the same JSX)
- **Fonts** limited to 4 loaded weights (NotoSerif 400/700 + PlusJakartaSans 400/500/600/700) — all Typography tokens map to these

## License

All rights reserved.
