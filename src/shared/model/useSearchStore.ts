import { create } from "zustand"

interface SearchParams {
  search?: string
  tag?: string
  sortBy?: string
  sortOrder?: string
  skip?: number
  limit: number
}

interface SearchStore {
  searchParams: SearchParams
  updateSearchParams: (key: keyof SearchParams, value: string | number | undefined) => void
  resetSearchParams: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchParams: {
    search: "",
    tag: "",
    sortBy: "none",
    sortOrder: "asc",
    skip: 0,
    limit: 10,
  },
  updateSearchParams: (key, value) =>
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        [key]: value,
      },
    })),
  resetSearchParams: () =>
    set(() => ({
      searchParams: {
        search: "",
        tag: "",
        sortBy: "none",
        sortOrder: "asc",
        skip: 0,
        limit: 10,
      },
    })),
}))
