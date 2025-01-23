// searchParams를 string으로 변환해줌
export const buildUrlParams = ({
  limit,
  skip,
  sortBy,
  sortOrder,
  searchQuery,
 selectedTag,
} : any) => {
  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (searchQuery) params.set("search", searchQuery)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  
  const hasTag = selectedTag && selectedTag !== "all"
  const hasSearch = searchQuery && searchQuery !== ""
  
  if (hasTag) return `/tag/${selectedTag}?${params.toString()}`
  if (hasSearch) return `/search?q=${searchQuery}&${params.toString()}`
  return `?${params.toString()}`
}