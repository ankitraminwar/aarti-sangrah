import { addFavorite, getFavoriteIds, removeFavorite } from "@/src/database";
import { create } from "zustand";

interface FavoritesState {
  favoriteIds: Set<string>;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set<string>(),

  loadFavorites: async () => {
    const ids = await getFavoriteIds();
    set({ favoriteIds: ids });
  },

  toggleFavorite: async (id: string) => {
    const current = get().favoriteIds;
    const next = new Set(current);
    if (next.has(id)) {
      next.delete(id);
      await removeFavorite(id);
    } else {
      next.add(id);
      await addFavorite(id);
    }
    set({ favoriteIds: next });
  },

  isFavorite: (id: string) => get().favoriteIds.has(id),
}));
