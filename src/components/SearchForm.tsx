import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/Select/ui"
import { Search } from "lucide-react"
import { Input } from "../shared/ui/Input/ui"
import { getTagsResponse } from "../entities/tag/model/type"
import { useSearchStore } from "../shared/model/useSearchStore"

interface SearchFormProps {
  tags: getTagsResponse[]
  searchPosts: () => void
}

function SearchForm(props: SearchFormProps) {
  const { tags, searchPosts } = props
  const { search, tag, sortBy, sortOrder, updateSearch, updateTag, updateSortBy, updateSortOrder } = useSearchStore()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchPosts()
                }
              }}
            />
          </div>
        </div>
        <Select
          value={tag}
          onValueChange={(value) => {
            updateTag(value)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags?.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => updateSortBy(value)}>
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
        <Select value={sortOrder} onValueChange={(value) => updateSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
export default SearchForm
