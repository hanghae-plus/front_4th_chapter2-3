import { Search } from "lucide-react"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { Tags } from "../types"

interface PostControllerProps {
  searchQuery: string
  setSearchQuery: (value: React.SetStateAction<string>) => void
  searchPosts: () => Promise<void>
  setSelectedTag: (value: React.SetStateAction<string>) => void
  fetchPostsByTag: (tag: any) => Promise<void>
  selectedTag: string
  updateURL: () => void
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  sortBy: string
  sortOrder: string
  setSortOrder: React.Dispatch<React.SetStateAction<string>>
  tags: Tags[]
}

const PostController: React.FC<PostControllerProps> = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  setSelectedTag,
  fetchPostsByTag,
  selectedTag,
  updateURL,
  setSortBy,
  sortBy,
  sortOrder,
  setSortOrder,
  tags,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchPosts()}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
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
      </Select>
      <Select value={sortBy} onValueChange={setSortBy}>
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
      <Select value={sortOrder} onValueChange={setSortOrder}>
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

export default PostController
