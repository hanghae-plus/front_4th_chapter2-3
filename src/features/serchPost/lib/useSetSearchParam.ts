import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtom } from "jotai"

import { limitAtom, searchQueryAtom, selectedTagAtom, skipAtom, sortByAtom, sortOrderAtom } from "../model"

export const useSetSearchParam = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

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

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return { updateURL }
}
