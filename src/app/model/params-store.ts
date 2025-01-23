import { create } from "zustand"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

interface ParamsState {
  skip: 0 | 1
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
  setParams: (key: keyof ParamsState, value: string | number) => void
  resetParams: () => void
  updateURL: (navigate: NavigateFunction) => void
}

export const useParamsStore = create<ParamsState>((set, get) => ({
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",
  setParams: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetParams: () =>
    set({
      skip: 0,
      limit: 10,
      searchQuery: "",
      sortBy: "",
      sortOrder: "asc",
      selectedTag: "",
    }),
  updateURL: (navigate: NavigateFunction) => {
    const params = new URLSearchParams()
    const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = get()

    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)

    navigate(`?${params.toString()}`)
  },
}))

// URL 파라미터와 Zustand 상태 동기화용 커스텀 훅
export const useSyncParamsWithURL = () => {
  const location = useLocation()
  const setParams = useParamsStore((state) => state.setParams)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setParams("skip", parseInt(params.get("skip") || "0"))
    setParams("limit", parseInt(params.get("limit") || "10"))
    setParams("searchQuery", params.get("search") || "")
    setParams("sortBy", params.get("sortBy") || "")
    setParams("sortOrder", params.get("sortOrder") || "asc")
    setParams("selectedTag", params.get("tag") || "")
  }, [location.search, setParams])
}

export const useInitUpdateURL = () => {
  const { updateURL, skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = useParamsStore()
  const navigate = useNavigate()

  useEffect(() => {
    updateURL(navigate)
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag, updateURL, navigate])
}
