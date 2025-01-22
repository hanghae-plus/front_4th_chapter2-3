import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostStore } from "@features/post/model/stores"

export const usePostManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const store = usePostStore()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (store.skip) params.set("skip", store.skip.toString())
    if (store.limit) params.set("limit", store.limit.toString())
    if (store.searchQuery) params.set("search", store.searchQuery)
    if (store.sortBy) params.set("sortBy", store.sortBy)
    if (store.sortOrder) params.set("sortOrder", store.sortOrder)
    if (store.selectedTag) params.set("tag", store.selectedTag)
    navigate(`?${params.toString()}`)
  }

  // URL 파라미터 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    store.setSkip(parseInt(params.get("skip") || "0"))
    store.setLimit(parseInt(params.get("limit") || "10"))
    store.setSearchQuery(params.get("search") || "")
    store.setSortBy(params.get("sortBy") || "")
    store.setSortOrder((params.get("sortOrder") || "asc") as "asc" | "desc")
    store.setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 게시물 및 태그 데이터 동기화
  useEffect(() => {
    store.fetchTags()
  }, [])

  useEffect(() => {
    if (store.selectedTag) {
      store.fetchPostsByTag(store.selectedTag)
    } else {
      store.fetchPosts()
    }
    updateURL()
  }, [store.skip, store.limit, store.sortBy, store.sortOrder, store.selectedTag])

  return {
    ...store,
    updateURL,
  }
}
