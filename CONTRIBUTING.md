# Contributing to Aarti Sangrah

Thank you for contributing to **Aarti Sangrah** — a sacred offline-first app for Hindu devotional hymns.

---

## Core Rules & Principles

### 1. **Always Use Config Constants**

Never hardcode URLs, API endpoints, or configuration values. Always import from `src/constants/config.ts`.

```typescript
// ✅ CORRECT
import { CDN_URL } from "@/src/constants";
const response = await fetch(CDN_URL);

// ❌ WRONG
const response = await fetch(
  "https://cdn.jsdelivr.net/gh/ankitraminwar/aarti-api@master/aarti_collections.json",
);
```

**Critical config values:**

- `CDN_URL` — Aarti data source (do not hardcode CDN URLs elsewhere)
- `DB_NAME` — SQLite database filename
- `STALE_TIME_MS` — Data freshness threshold (24 hours)
- `APP_VERSION` — Semantic version matching `app.json`
- `REQUEST_FORM_URL` — User feedback form

### 2. **Offline-First Architecture**

- All data flows through **expo-sqlite** (local SQLite DB)
- CDN sync is optional; app works perfectly offline
- No authentication required; no user tracking
- Minimal permissions: `android.permission.INTERNET` only

### 3. **TypeScript Strict Mode**

- All files must have proper TypeScript types
- No `any` types unless absolutely necessary (with explanation)
- All interfaces go in `src/types/aarti.ts`

```typescript
// ✅ CORRECT
const count: number = allAartis.length;

// ❌ WRONG
const count: any = allAartis.length;
```

### 4. **Database Queries Must Use Parameterized Statements**

Prevent SQL injection. Always use `$` placeholders:

```typescript
// ✅ CORRECT
const row = await database.getFirstAsync("SELECT * FROM aartis WHERE id = $id", { $id: aartiId });

// ❌ WRONG
const row = await database.getFirstAsync(`SELECT * FROM aartis WHERE id = '${aartiId}'`);
```

### 5. **TanStack Query Cache Invalidation**

After data mutations (sync, delete, update), always invalidate affected queries:

```typescript
// ✅ CORRECT
await fetchAndSyncAartis();
await queryClient.invalidateQueries({ queryKey: ["allAartis"] });

// ❌ WRONG
await fetchAndSyncAartis();
// forgot to invalidate — stale data remains in memory
```

### 6. **Material Design 3 Colors Only**

All colors come from `src/constants/theme.ts` (`LightColors`, `DarkColors`):

```typescript
// ✅ CORRECT
const { colors } = useTheme();
<View style={{ backgroundColor: colors.primary }} />

// ❌ WRONG
<View style={{ backgroundColor: "#6750A4" }} />
```

### 7. **Strings Are Translatable**

All user-facing text goes through the `useT()` hook. No hardcoded English strings:

```typescript
// ✅ CORRECT
const t = useT();
<AppText>{t("home.headline")}</AppText>

// ❌ WRONG
<AppText>Welcome to Aarti Sangrah</AppText>
```

### 8. **Expo Router File-Based Routing**

- Place screens in `app/` folder (expo-router convention)
- Use `[id]` for dynamic routes
- Use `(tabs)` for tab groups
- Always define `screenOptions` in `Stack.Screen`

---

## Development Setup

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Yarn** package manager (never npm)
- **Expo CLI** (`npx expo` or `yarn global add expo-cli`)
- Android SDK (for running on Android emulator)

### Installation

```bash
git clone https://github.com/ankitraminwar/aarti-sangrah.git
cd aarti-sangrah
yarn install
```

### Running Locally

```bash
# Start development server
yarn start

# Run on Android emulator
yarn android

# Run on iOS simulator (macOS only)
yarn ios

# Run on web
yarn web
```

---

## Branch & Commit Rules

### Branch Naming

- Feature: `feature/description` (e.g., `feature/add-marathi-aartis`)
- Bug fix: `fix/description` (e.g., `fix/sync-cache-invalidation`)
- Chore: `chore/description` (e.g., `chore/update-deps`)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(sync): add cache-busting headers to CDN fetch
fix(home): invalidate query cache after manual sync
chore(deps): upgrade expo-updates to v55
docs(README): add OTA update instructions
```

---

## Testing Checklist

Before submitting a pull request:

### Code Quality

- [ ] `yarn lint` passes (no ESLint errors)
- [ ] `yarn format:check` passes (Prettier formatting)
- [ ] TypeScript: `npx tsc --noEmit` (zero errors)
- [ ] No `console.log()` or `console.error()` in production code
- [ ] No hardcoded strings, URLs, or constants

### Functionality

- [ ] App starts without crashes on Android & iOS
- [ ] All new features work offline (test after killing app + restarting)
- [ ] Manual sync button (Settings → Refresh Aartis) works
- [ ] 24-hour auto-sync trigger works (see `app/_layout.tsx`)
- [ ] Favorites persist after app restart
- [ ] Font size & theme preferences persist after restart
- [ ] Search works across all fields (title, category, translations)

### Data Integrity

- [ ] SQLite database doesn't corrupt after sync
- [ ] No duplicate entries in database after multiple syncs
- [ ] Favorites are not lost after CDN sync
- [ ] Recent aartis maintain scroll position (`scrollPosition` field)

### Performance

- [ ] Initial app launch < 3 seconds (on reasonable device)
- [ ] Home screen scroll is smooth (FlatList/FlashList)
- [ ] No memory leaks (check React DevTools Profiler)
- [ ] Dark mode theme switch is instant

### Compliance

- [ ] Only `INTERNET` permission is used
- [ ] No personal data collection
- [ ] No tracking or analytics
- [ ] App works fully offline (except CDN sync)

---

## File Structure Rules

```
aarti-sangrah/
├── app/                    # expo-router pages (never put components here)
├── src/
│   ├── types/             # TypeScript interfaces ONLY
│   ├── constants/         # config.ts, theme.ts (shared constants)
│   ├── database/          # SQLite CRUD & schema
│   ├── services/          # Business logic (cdn-sync.ts)
│   ├── store/             # Zustand state (app-store.ts, favorites-store.ts)
│   ├── hooks/             # Custom React hooks (use-theme.ts, use-t.ts)
│   ├── i18n/              # Translations (strings.ts)
│   ├── components/        # Reusable UI components
│   └── screens/           # Full-screen components (imported by app/)
```

**Rules:**

- `app/` = Router config only. Actual UI goes in `src/screens/`
- `src/services/` = Business logic. No UI code.
- `src/database/` = Database layer. Use parameterized queries.
- `src/store/` = Zustand state. Keep sync with database.
- `src/components/` = Reusable UI. No route-specific logic.

---

## CDN URL Management

### Why This Matters

The `CDN_URL` is the **single source of truth** for Aarti data. If hardcoded elsewhere:

- Updates to the URL (e.g., switching to new API) break multiple places
- Developers may use outdated or incorrect URLs
- Cache-busting strategies can't be applied globally

### Correct Pattern

```typescript
// ✅ src/services/cdn-sync.ts
import { CDN_URL } from "@/src/constants";

export async function fetchAndSyncAartis() {
  const url = `${CDN_URL}?_t=${Date.now()}`; // cache-busting
  const response = await fetch(url, {
    headers: { "Cache-Control": "no-cache" },
  });
  // ...
}
```

### Audit Checklist

Before submitting PR, search entire codebase:

```bash
# Should find ONLY config.ts import
grep -r "cdn.jsdelivr.net" src/
grep -r "raw.githubusercontent.com" src/
grep -r "ankitraminwar/aarti-api" src/

# All CDN fetches should use CDN_URL
grep -r "fetch(" src/ | grep -v "CDN_URL"
```

---

## Deployment Rules

### Version Bumping

- `app.json` version must match `src/constants/config.ts` `APP_VERSION`
- Android: `versionCode` auto-increments via EAS (`autoIncrement: true`)
- iOS: `buildNumber` auto-increments via EAS

### Before Publishing to Play Store

- [ ] `app.json` version = 1.0.0 (first release)
- [ ] `android.versionCode` = 1
- [ ] Private key generated and stored securely
- [ ] Privacy policy URL added in Play Console
- [ ] Data Safety form completed
- [ ] IARC content rating completed

### Building for Production

```bash
# Use EAS Build (handles signing, optimization, OTA)
eas build -p android --profile production
eas submit -p android --latest  # Push to Play Store

# For OTA updates (after publishing)
eas update --branch production --message "Fresh aartis data"
```

---

## Code Review Expectations

Reviewers will check:

1. ✅ **Config Rules** — No hardcoded URLs/constants
2. ✅ **TypeScript** — No `any` types, proper interfaces
3. ✅ **Database** — Parameterized queries only
4. ✅ **Cache Invalidation** — TanStack Query invalidated after mutations
5. ✅ **Offline-First** — Works without CDN (offline mode)
6. ✅ **Translation-Ready** — All strings use `useT()` hook
7. ✅ **Theme-Safe** — Colors from `useTheme()`, no hardcoded hex
8. ✅ **Testing** — Manual tests pass, no console errors
9. ✅ **Performance** — No obvious memory leaks or N+1 queries

---

## Troubleshooting

### Build fails with "CDN URL not imported"

```bash
# Verify import in service files
grep -r "from.*constants" src/services/
```

### Stale data after sync

- Check `queryClient.invalidateQueries()` is called after `fetchAndSyncAartis()`
- Verify `app/_layout.tsx` has AppState listener for foreground resume

### SQLite queries return empty

- Use parameterized queries: `{ $id: value }`
- Check database path matches `DB_NAME` constant
- Verify tables exist: `SELECT * FROM sqlite_master WHERE type='table'`

### TypeScript errors on build

```bash
npx tsc --noEmit  # Check all errors
yarn lint --fix   # Auto-fix linting issues
```

---

## Need Help?

- **Architecture questions?** See [AGENT.md](AGENT.md)
- **CDN issues?** Check [src/constants/config.ts](src/constants/config.ts)
- **Data sync?** Review [src/services/cdn-sync.ts](src/services/cdn-sync.ts)
- **Database?** Read [src/database/index.ts](src/database/index.ts)

---

**Happy contributing! 🙏**
