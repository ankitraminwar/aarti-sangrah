# Aarti Sangrah — The Sacred Editorial

An offline-first mobile app for Hindu devotional hymns (aartis), built with Expo and React Native.

## Features

- **Offline-First** — All aartis stored locally in SQLite. Read anytime, anywhere.
- **Multi-Language** — Hindi, Marathi, and English interface
- **Favorites** — Save aartis for quick access
- **Share & Copy** — Share aartis as images or copy to clipboard
- **Customizable** — Light/dark theme, adjustable text size
- **Daily Aarti** — Featured aarti on the home screen each day
- **Search** — Find aartis by name, deity, or content
- **Categories** — Browse by deity or occasion

## Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Framework     | Expo SDK 54 / React Native 0.81.5 |
| Language      | TypeScript 5.9 (strict)           |
| Navigation    | expo-router (file-based)          |
| Database      | expo-sqlite (WAL mode)            |
| State         | Zustand                           |
| Data Fetching | @tanstack/react-query             |
| Design System | Stitch MCP "The Sacred Editorial" |
| Lists         | @shopify/flash-list v2            |

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
├── database/     # SQLite schema and CRUD
├── store/        # Zustand state stores
├── hooks/        # Custom React hooks
├── i18n/         # Localization strings
├── services/     # CDN sync service
├── types/        # TypeScript types
└── utils/        # Utility functions
```

See [AGENT.md](AGENT.md) for detailed architecture documentation.

## Contributing

See [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for development guidelines.

## License

All rights reserved.
