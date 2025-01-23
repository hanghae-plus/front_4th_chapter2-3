import { useEffect } from "react"
import { useAtom, useSetAtom } from "jotai"
import { Search } from "lucide-react"

import { usePostsBySearchQuery } from "../api"
import { searchQueryAtom, selectedTagAtom, sortByAtom, sortOrderAtom } from "../model"
import { postsWithUsersAtom } from "../../postsWithUsers/model"
import { tagsAtom } from "../../../entities/tag/model"
import { useTagsQuery } from "../../../entities/tag/api"
import { Input } from "../../../shared/ui/common"
import { SelectContainer, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select"

export const SearchPost = ({ updateURL }: { updateURL: () => void }) => {
  const setPosts = useSetAtom(postsWithUsersAtom)

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  // Tags
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  const { data, isLoading } = useTagsQuery()
  useEffect(() => {
    if (!isLoading && data) {
      setTags(data)
    }
  }, [data, isLoading])

  const { data: postsBySearchQuery, isLoading: isPostsBySearchQueryLoading } = usePostsBySearchQuery(searchQuery)

  useEffect(() => {
    if (!isPostsBySearchQueryLoading && postsBySearchQuery) {
      setPosts(postsBySearchQuery.posts || [])
    }
  }, [isPostsBySearchQueryLoading])

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        {/* SearchQuery */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter"}
          />
        </div>
      </div>
      {/* Tag */}
      <SelectContainer
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectContainer>
      {/* Sort */}
      <SelectContainer value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </SelectContainer>
      {/* SortOrder */}
      <SelectContainer value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </SelectContainer>
    </div>
  )
}
