import { useAtomValue, useAtom } from "jotai"
import { searchQueryAtom } from "../../features/search/model/store.ts"
import { selectedTagAtom } from "../../features/tag/model/store.ts"
import { useNavigate } from "react-router-dom"
import { limitAtom, skipAtom } from "./store.ts"
import { sortByAtom, sortOrderAtom } from "../../features/sort/model/store.ts"

export default function updateSearchParams() {
  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const navigate = useNavigate();
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  
  // URL 업데이트
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
  return {
    updateURL
  }
}