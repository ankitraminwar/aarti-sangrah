import { DB_NAME } from "@/src/constants";
import type { Aarti, RecentAarti } from "@/src/types";
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(DB_NAME);
  await initSchema(db);
  return db;
}

export async function initDatabase(): Promise<void> {
  await getDatabase();
}

async function initSchema(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS aartis (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      language TEXT NOT NULL,
      slug TEXT NOT NULL,
      content TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      "order" INTEGER NOT NULL DEFAULT 0,
      tags TEXT NOT NULL DEFAULT '[]',
      isFeatured INTEGER NOT NULL DEFAULT 0,
      updatedAt TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL DEFAULT 'aarti',
      searchableText TEXT NOT NULL DEFAULT '',
      versesJson TEXT NOT NULL DEFAULT '[]',
      translationsJson TEXT NOT NULL DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS favorites (
      aartiId TEXT PRIMARY KEY NOT NULL,
      addedAt TEXT NOT NULL,
      FOREIGN KEY (aartiId) REFERENCES aartis(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recents (
      aartiId TEXT PRIMARY KEY NOT NULL,
      readAt TEXT NOT NULL,
      scrollPosition REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (aartiId) REFERENCES aartis(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sync_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_aartis_category ON aartis(category);
    CREATE INDEX IF NOT EXISTS idx_aartis_order ON aartis("order");
    CREATE INDEX IF NOT EXISTS idx_recents_readAt ON recents(readAt);
  `);

  // Migration: add translationsJson column if missing
  try {
    await database.runAsync(
      `ALTER TABLE aartis ADD COLUMN translationsJson TEXT NOT NULL DEFAULT '{}'`,
    );
  } catch {
    // Column already exists – ignore
  }
}

// ── Aarti CRUD ─────────────────────────────────────────────────────

export async function upsertAartis(aartis: readonly Aarti[]): Promise<void> {
  const database = await getDatabase();
  const stmt = await database.prepareAsync(`
    INSERT INTO aartis (
      id, title, category, language, slug, content, description,
      "order", tags, isFeatured, updatedAt, author, type, searchableText, versesJson, translationsJson
    ) VALUES (
      $id, $title, $category, $language, $slug, $content, $description,
      $order, $tags, $isFeatured, $updatedAt, $author, $type, $searchableText, $versesJson, $translationsJson
    )
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      category = excluded.category,
      language = excluded.language,
      slug = excluded.slug,
      content = excluded.content,
      description = excluded.description,
      "order" = excluded."order",
      tags = excluded.tags,
      isFeatured = excluded.isFeatured,
      updatedAt = excluded.updatedAt,
      author = excluded.author,
      type = excluded.type,
      searchableText = excluded.searchableText,
      versesJson = excluded.versesJson,
      translationsJson = excluded.translationsJson
  `);

  try {
    for (const a of aartis) {
      await stmt.executeAsync({
        $id: a.id,
        $title: a.title,
        $category: a.category,
        $language: a.language,
        $slug: a.slug,
        $content: a.content,
        $description: a.description,
        $order: a.order,
        $tags: a.tags,
        $isFeatured: a.isFeatured ? 1 : 0,
        $updatedAt: a.updatedAt,
        $author: a.author,
        $type: a.type,
        $searchableText: a.searchableText,
        $versesJson: a.versesJson,
        $translationsJson: a.translationsJson,
      });
    }
  } finally {
    await stmt.finalizeAsync();
  }
}

export async function getAllAartis(): Promise<Aarti[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM aartis ORDER BY "order" ASC',
  );
  return rows.map(mapRowToAarti);
}

export async function getAartisByCategory(category: string): Promise<Aarti[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM aartis WHERE category = $category ORDER BY "order" ASC',
    { $category: category },
  );
  return rows.map(mapRowToAarti);
}

export async function getAartiById(id: string): Promise<Aarti | null> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<Record<string, unknown>>(
    "SELECT * FROM aartis WHERE id = $id",
    { $id: id },
  );
  return row ? mapRowToAarti(row) : null;
}

export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const database = await getDatabase();
  return database.getAllAsync<{ name: string; count: number }>(
    'SELECT category as name, COUNT(*) as count FROM aartis GROUP BY category ORDER BY MIN("order") ASC',
  );
}

export async function searchAartis(query: string): Promise<Aarti[]> {
  const database = await getDatabase();
  const pattern = `%${query}%`;
  const rows = await database.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM aartis
     WHERE title LIKE $q OR searchableText LIKE $q OR category LIKE $q OR tags LIKE $q OR translationsJson LIKE $q
     ORDER BY "order" ASC`,
    { $q: pattern },
  );
  return rows.map(mapRowToAarti);
}

export async function getFeaturedAartis(): Promise<Aarti[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM aartis WHERE isFeatured = 1 ORDER BY "order" ASC',
  );
  return rows.map(mapRowToAarti);
}

// ── Favorites ──────────────────────────────────────────────────────

export async function addFavorite(aartiId: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync("INSERT OR REPLACE INTO favorites (aartiId, addedAt) VALUES ($id, $at)", {
    $id: aartiId,
    $at: new Date().toISOString(),
  });
}

export async function removeFavorite(aartiId: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync("DELETE FROM favorites WHERE aartiId = $id", {
    $id: aartiId,
  });
}

export async function isFavorite(aartiId: string): Promise<boolean> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{ cnt: number }>(
    "SELECT COUNT(*) as cnt FROM favorites WHERE aartiId = $id",
    { $id: aartiId },
  );
  return (row?.cnt ?? 0) > 0;
}

export async function getFavoriteAartis(): Promise<Aarti[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    `SELECT a.* FROM aartis a
     INNER JOIN favorites f ON a.id = f.aartiId
     ORDER BY f.addedAt DESC`,
  );
  return rows.map(mapRowToAarti);
}

export async function getFavoriteIds(): Promise<Set<string>> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{ aartiId: string }>("SELECT aartiId FROM favorites");
  return new Set(rows.map((r) => r.aartiId));
}

// ── Recents ────────────────────────────────────────────────────────

export async function upsertRecent(aartiId: string, scrollPosition: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `INSERT OR REPLACE INTO recents (aartiId, readAt, scrollPosition)
     VALUES ($id, $at, $pos)`,
    { $id: aartiId, $at: new Date().toISOString(), $pos: scrollPosition },
  );
}

export async function getRecentAartis(limit = 10): Promise<(Aarti & { readAt: string })[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    `SELECT a.*, r.readAt FROM aartis a
     INNER JOIN recents r ON a.id = r.aartiId
     ORDER BY r.readAt DESC LIMIT $limit`,
    { $limit: limit },
  );
  return rows.map((row) => ({
    ...mapRowToAarti(row),
    readAt: String(row.readAt ?? ""),
  }));
}

export async function getRecentEntry(aartiId: string): Promise<RecentAarti | null> {
  const database = await getDatabase();
  return database.getFirstAsync<RecentAarti>("SELECT * FROM recents WHERE aartiId = $id", {
    $id: aartiId,
  });
}

// ── Sync Meta ──────────────────────────────────────────────────────

export async function getSyncMeta(key: string): Promise<string | null> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{ value: string }>(
    "SELECT value FROM sync_meta WHERE key = $key",
    { $key: key },
  );
  return row?.value ?? null;
}

export async function setSyncMeta(key: string, value: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync("INSERT OR REPLACE INTO sync_meta (key, value) VALUES ($key, $value)", {
    $key: key,
    $value: value,
  });
}

// ── Helpers ────────────────────────────────────────────────────────

function mapRowToAarti(row: Record<string, unknown>): Aarti {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    category: String(row.category ?? ""),
    language: String(row.language ?? ""),
    slug: String(row.slug ?? ""),
    content: String(row.content ?? ""),
    description: String(row.description ?? ""),
    order: Number(row.order ?? 0),
    tags: String(row.tags ?? "[]"),
    isFeatured: row.isFeatured === 1 || row.isFeatured === true,
    updatedAt: String(row.updatedAt ?? ""),
    author: String(row.author ?? ""),
    type: String(row.type ?? ""),
    searchableText: String(row.searchableText ?? ""),
    versesJson: String(row.versesJson ?? "[]"),
    translationsJson: String(row.translationsJson ?? "{}"),
  };
}
