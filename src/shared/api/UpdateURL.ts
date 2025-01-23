import { useNavigate } from "react-router-dom"
import { useStore } from "../../app/store"

// URL 업데이트 함수
export const useUpdateURL = () => {
  const navigate = useNavigate()

  // 상태 관리
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = useStore()

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  return updateURL
}
