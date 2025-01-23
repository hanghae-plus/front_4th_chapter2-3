/* eslint-disable react-refresh/only-export-components */
import { QueryClient } from "@tanstack/react-query"
import React, { createContext, useContext } from "react"
import { create, useStore } from "zustand"

import { getPostsQueryKeys } from "../../../post/model/queries/useQueryGetPosts"

interface PageParamState {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string
  actions: {
    setSkip: (skip: number) => void
    setLimit: (limit: number) => void
    setSearchQuery: (query: string) => void
    setSortBy: (sortBy: string) => void
    setSortOrder: (sortOrder: "asc" | "desc") => void
    setSelectedTag: (tag: string) => void
    resetParams: () => void
    updateURL: () => void
  }
}

export const createPageParamStore = () =>
  create<PageParamState>((set, get) => {
    const parseParams = () => {
      const params = new URLSearchParams(window.location.search)
      return {
        skip: parseInt(params.get("skip") || "0"),
        limit: parseInt(params.get("limit") || "10"),
        searchQuery: params.get("search") || "",
        sortBy: params.get("sortBy") || "",
        sortOrder: (params.get("sortOrder") as "asc" | "desc") || "asc",
        selectedTag: params.get("tag") || "",
      }
    }

    return {
      ...parseParams(),
      actions: {
        setSkip: (skip) => {
          set({ skip })
          get().actions.updateURL()
        },
        setLimit: (limit) => {
          set({ limit })
          get().actions.updateURL()
        },
        setSearchQuery: (searchQuery) => {
          set({ searchQuery })
          get().actions.updateURL()
        },
        setSortBy: (sortBy) => {
          set({ sortBy })
          get().actions.updateURL()
        },
        setSortOrder: (sortOrder) => {
          set({ sortOrder })
          get().actions.updateURL()
        },
        setSelectedTag: (selectedTag) => {
          set({ selectedTag })
          get().actions.updateURL()
        },
        resetParams: () => {
          set({
            skip: 0,
            limit: 10,
            searchQuery: "",
            sortBy: "",
            sortOrder: "asc",
            selectedTag: "",
          })
          get().actions.updateURL()
        },
        updateURL: () => {
          const queryClient = new QueryClient()
          queryClient.invalidateQueries(getPostsQueryKeys["all"])

          const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = get()
          const params = new URLSearchParams()

          if (skip) params.set("skip", skip.toString())
          if (limit) params.set("limit", limit.toString())
          if (searchQuery) params.set("search", searchQuery)
          if (sortBy) params.set("sortBy", sortBy)
          if (sortOrder) params.set("sortOrder", sortOrder)
          if (selectedTag) params.set("tag", selectedTag)

          window.history.pushState(null, "", `?${params.toString()}`)
        },
      },
    }
  })

const PageParamStoreContext = createContext<ReturnType<typeof createPageParamStore> | null>(null)

export const PageParamStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store] = React.useState(() => createPageParamStore())
  // const location = useLocation()

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   store.setState({
  //     skip: parseInt(params.get("skip") || "0"),
  //     limit: parseInt(params.get("limit") || "10"),
  //     searchQuery: params.get("search") || "",
  //     sortBy: params.get("sortBy") || "",
  //     sortOrder: (params.get("sortOrder") as "asc" | "desc") || "asc",
  //     selectedTag: params.get("tag") || "",
  //   })
  // }, [location.search, store])

  return <PageParamStoreContext.Provider value={store}>{children}</PageParamStoreContext.Provider>
}

export const usePageParamStore = <T,>(selector: (state: PageParamState) => T): T => {
  const store = useContext(PageParamStoreContext)

  if (!store) {
    throw new Error("PageParamStore must be used within a PageParamStoreProvider")
  }

  return useStore(store, selector)
}

export const useSkip = () => usePageParamStore((state) => state.skip)
export const useLimit = () => usePageParamStore((state) => state.limit)
export const useSearchQuery = () => usePageParamStore((state) => state.searchQuery)
export const useSortBy = () => usePageParamStore((state) => state.sortBy)
export const useSortOrder = () => usePageParamStore((state) => state.sortOrder)
export const useSelectedTag = () => usePageParamStore((state) => state.selectedTag)

export const usePageParamActions = () => usePageParamStore((state) => state.actions)
