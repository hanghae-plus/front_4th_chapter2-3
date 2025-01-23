import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { usePageParamActions } from "../../../entities/tag/model/store/PageParamProvider"

export const usePageParam = () => {
  const actions = usePageParamActions()

  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    actions.setSkip(parseInt(params.get("skip") || "0"))
    actions.setLimit(parseInt(params.get("limit") || "10"))
    actions.setSearchQuery(params.get("search") || "")
    actions.setSortBy(params.get("sortBy") || "")
    actions.setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
    actions.setSelectedTag(params.get("tag") || "")
  }, [actions, location.search])
}
