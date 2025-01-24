// hooks/useUrlParams.ts
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostStore } from "@features/post/model/stores"

interface UrlParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string
}

export const useUrlParams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const store = usePostStore()

  const updateURL = (params: UrlParams) => {
    const searchParams = new URLSearchParams()
    if (params.skip) searchParams.set("skip", params.skip.toString())
    if (params.limit) searchParams.set("limit", params.limit.toString())
    if (params.searchQuery) searchParams.set("search", params.searchQuery)
    if (params.sortBy) searchParams.set("sortBy", params.sortBy)
    if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder)
    if (params.selectedTag) searchParams.set("tag", params.selectedTag)
    navigate(`?${searchParams.toString()}`)
  }

  const syncUrlToStore = () => {
    const params = new URLSearchParams(location.search)
    const urlParams: UrlParams = {
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: (params.get("sortOrder") || "asc") as "asc" | "desc",
      selectedTag: params.get("tag") || ""
    }

    store.setSkip(urlParams.skip)
    store.setLimit(urlParams.limit)
    store.setSearchQuery(urlParams.searchQuery)
    store.setSortBy(urlParams.sortBy)
    store.setSortOrder(urlParams.sortOrder)
    store.setSelectedTag(urlParams.selectedTag)
  }

  useEffect(() => {
    syncUrlToStore()
  }, [location.search])

  const handleUpdateUrl = () => {
    updateURL({
      skip: store.skip,
      limit: store.limit,
      searchQuery: store.searchQuery,
      sortBy: store.sortBy,
      sortOrder: store.sortOrder,
      selectedTag: store.selectedTag
    })
  }

  return { handleUpdateUrl }
}