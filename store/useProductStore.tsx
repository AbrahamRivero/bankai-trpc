import { create } from "zustand";

type SortOption =
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc"
  | "newest"
  | null;

type FilterState = {
  category_slug: string | null;
  sizes: string[];
  colors: string[];
  sort: SortOption;
  page: number;
  limit: number;
  setCategory: (category: string | null) => void;
  setSizes: (sizes: string[]) => void;
  setColors: (colors: string[]) => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
};

export const useProductStore = create<FilterState>((set) => ({
  category_slug: null,
  sizes: [],
  colors: [],
  sort: null,
  page: 1,
  limit: 12,
  setCategory: (category) => set({ category_slug: category, page: 1 }),
  setSizes: (sizes) => set({ sizes, page: 1 }),
  setColors: (colors) => set({ colors, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  resetFilters: () =>
    set({
      category_slug: null,
      sizes: [],
      colors: [],
      sort: null,
      page: 1,
      limit: 12,
    }),
}));
