import { Search } from "lucide-react"
import { Input } from "../shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useParamsStore } from "../store/params"
import { useTags } from "../hooks/useTags"
import { useState } from "react"

export const FilterableSearch = () => {
  const { tags } = useTags()
  const { searchQuery, sortBy, sortOrder, selectedTag, setParams } = useParamsStore()
  const [searchQueryState, setSearchQueryState] = useState(searchQuery)

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQueryState}
            onChange={(e) => setSearchQueryState(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setParams("searchQuery", searchQueryState)}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setParams("selectedTag", value)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags &&
            tags.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setParams("sortBy", value)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => {
          setParams("sortOrder", value)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
