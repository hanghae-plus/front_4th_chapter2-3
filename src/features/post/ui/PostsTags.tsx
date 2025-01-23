import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostsTagsProps {
  tag: string;
}

export const PostsTags = ({tag}: PostsTagsProps) => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  // URL 업데이트 함수
  const updateURL = (
    skip: number, 
    limit: number, 
    searchQuery: string, 
    sortBy: string, 
    sortOrder: string, 
    selectedTag: string
  ) => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag
          ? "text-white bg-blue-500 hover:bg-blue-600"
          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => {
        setSelectedTag(tag)
        // TODO: URL 업데이트 함수 호출
        updateURL(skip, limit, searchQuery, sortBy, sortOrder, selectedTag)
      }}
    >
      {tag}
    </span>
  );
}