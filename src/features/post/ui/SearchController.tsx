import { Search } from "lucide-react"
import { Input } from "@shared/ui"
import { Tag } from "@entities/post/types"
import { useTagsQuery } from "@features/post/model"
import { SelectPostFilter } from "@entities/post/ui"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

const sortByOptions = [
  { value: "none", label: "없음" },
  { value: "id", label: "ID" },
  { value: "title", label: "제목" },
  { value: "reactions", label: "반응" },
]
const sortOrderOptions = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
]

export function SearchController() {
  const [search, setSearch] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTag = searchParams.get("tag") ?? ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"

  const { data: tags } = useTagsQuery()
  const tagOptions = tags?.map((tag: Tag) => ({ value: tag.slug, label: tag.slug })) || []

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleChangeSearchQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    setSearchParams((prev) => {
      prev.set("search", search)
      return prev
    })
  }
  const handleTagChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("tag", value)
      return prev
    })
  }
  const handleSortByChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sortBy", value)
      return prev
    })
  }
  const handleSortOrderChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sortOrder", value)
      return prev
    })
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={search}
            onChange={handleChangeSearch}
            onKeyPress={handleChangeSearchQuery}
          />
        </div>
      </div>
      <SelectPostFilter
        value={selectedTag}
        setValue={handleTagChange}
        options={tagOptions as { value: string; label: string }[]}
      />
      <SelectPostFilter value={sortBy} setValue={handleSortByChange} options={sortByOptions} />
      <SelectPostFilter value={sortOrder} setValue={handleSortOrderChange} options={sortOrderOptions} />
    </div>
  )
}
