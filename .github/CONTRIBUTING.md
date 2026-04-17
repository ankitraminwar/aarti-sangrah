# Contributing to Aarti Sangrah

Thank you for your interest in contributing to Aarti Sangrah!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `yarn install`
4. Start development: `yarn start`

## Development Guidelines

### Tech Stack

- **Expo SDK 54** / React Native 0.81.5
- **TypeScript** strict mode
- **expo-router** for file-based navigation
- **expo-sqlite** for offline-first storage
- **Zustand** for state management
- **@tanstack/react-query** for async data

### Design System

We follow the **Stitch MCP "The Sacred Editorial"** design system:

- No 1px borders — use tonal surface layering instead
- Saffron gradient (`#ff9933` → surface) for headers
- `xl` (24px) rounded corners on cards
- 16px vertical whitespace rhythm
- Press animation: `scale(0.98)`
- Ambient primary-tinted shadows
- Minimum 48×48 touch targets

### Code Standards

- All colors must come from `src/constants/theme.ts` — no hardcoded hex values
- All screens must use `SafeAreaView` from `react-native-safe-area-context`
- All user-facing strings must go in `src/i18n/strings.ts` with hi/mr/en translations
- Use `AppModal` instead of `Alert.alert()` for in-app dialogs
- Use `yarn format` before committing
- Ensure `yarn lint` and `npx tsc --noEmit` pass

### Commit Messages

Use conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for refactoring
- `docs:` for documentation
- `chore:` for maintenance

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Run `yarn format && yarn lint`
4. Verify TypeScript: `npx tsc --noEmit`
5. Fill out the PR template completely
6. Request review from `@ankitraminwar`
