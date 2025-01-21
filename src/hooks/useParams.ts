import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [limit, skip, searchQuery, sortBy, sortOrder, selectedTag, navigate])

  const changeSkip = (skip: 0 | 1) => {
    setSkip(skip)
  }

  const changeLimit = (limit: number) => {
    setLimit(limit)
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
  }, [updateURL])

  return {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    updateURL,
    changeSkip,
    changeLimit,
  }
}
