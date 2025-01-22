import { create } from "zustand"

interface SearchStore {
  search: string
  tag: string
  sortBy: string
  sortOrder: string
  skip: number
  limit: number
  updateSearch: (value: string) => void
  updateTag: (value: string) => void
  updateSortBy: (value: string) => void
  updateSortOrder: (value: string) => void
  updateSkip: (value: number) => void
  updateLimit: (value: number) => void
  resetSearchParams: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  tag: "",
  sortBy: "none",
  sortOrder: "asc",
  skip: 0,
  limit: 10,
  updateSearch: (value) => set(() => ({ search: value })),
  updateTag: (value) => set(() => ({ tag: value })),
  updateSortBy: (value) => set(() => ({ sortBy: value })),
  updateSortOrder: (value) => set(() => ({ sortOrder: value })),
  updateSkip: (value) => set(() => ({ skip: value })),
  updateLimit: (value) => set(() => ({ limit: value })),
  resetSearchParams: () =>
    set(() => ({
      search: "",
      tag: "",
      sortBy: "none",
      sortOrder: "asc",
      skip: 0,
      limit: 10,
    })),
}))
