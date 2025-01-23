import { create } from "zustand"

interface PostFilters {
  search: string
  tag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  limit: number
  skip: number
}

interface PostFiltersStore {
  filters: PostFilters
  setSearch: (search: string) => void
  setTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: "asc" | "desc") => void
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  resetFilters: () => void
}

const initialFilters: PostFilters = {
  search: "",
  tag: "",
  sortBy: "",
  sortOrder: "asc",
  limit: 10,
  skip: 0,
}

const usePostFiltersStore = create<PostFiltersStore>((set) => ({
  filters: initialFilters,
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),
  setTag: (tag) =>
    set((state) => ({
      filters: { ...state.filters, tag },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    })),
  setLimit: (limit) =>
    set((state) => ({
      filters: { ...state.filters, limit },
    })),
  setSkip: (skip) =>
    set((state) => ({
      filters: { ...state.filters, skip },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}))

export { usePostFiltersStore }
