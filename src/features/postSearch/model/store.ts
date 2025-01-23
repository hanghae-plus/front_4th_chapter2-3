import { create } from "zustand"

interface PostSearchStore {
  searchQuery: string
}

interface PostSearchActions {
  setSearchQuery: (searchQuery: string) => void
}

export const usePostSearchStore = create<PostSearchStore & PostSearchActions>((set) => ({
  searchQuery: new URLSearchParams(window.location.search).get("search") || "",
  setSearchQuery: (searchQuery: string) => {
    const params = new URLSearchParams(window.location.search)
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }
    window.history.replaceState({}, "", `?${params.toString()}`)

    set({ searchQuery })
  },
}))
