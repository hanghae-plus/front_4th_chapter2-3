import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useTag } from "@/features/tag/model/useTag.ts"
import { SortBy, SortOrder } from "@/entities/post/api"

const queryParams = new URLSearchParams(location.search)
const skipAtom = atom(parseInt(queryParams.get("skip") || "0"))
const limitAtom = atom(parseInt(queryParams.get("limit") || "10"))
const searchQueryAtom = atom(queryParams.get("search") || "")
const sortByAtom = atom<SortBy | undefined>(queryParams.get("sortBy") as SortBy | undefined)
const sortOrderAtom = atom<SortOrder | undefined>(queryParams.get("sortOrder") as SortOrder | undefined)

// @FIXME: Route 라이브러리로 교체할거라서 일단 주석처리
export const usePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // const queryParams = new URLSearchParams(location.search)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  const { selectedTag } = useTag()

  // URL 업데이트 함수
  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [navigate, selectedTag, skip, limit, searchQuery, sortBy, sortOrder])

  // @FIXME:
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   setSkip(parseInt(params.get("skip") || "0"))
  //   setLimit(parseInt(params.get("limit") || "10"))
  //   setSearchQuery(params.get("search") || "")
  //   setSortBy(params.get("sortBy") || "")
  //   setSortOrder(params.get("sortOrder") || "asc")
  //   setSelectedTag(params.get("tag") || "")
  // }, [location.search, setLimit, setSearchQuery, setSelectedTag, setSkip, setSortBy, setSortOrder])

  return new (class {
    skip = skip
    setSkip = setSkip
    limit = limit
    setLimit = setLimit
    searchQuery = searchQuery
    setSearchQuery = setSearchQuery
    sortBy = sortBy
    setSortBy = setSortBy
    sortOrder = sortOrder
    setSortOrder = setSortOrder
  })()
}
