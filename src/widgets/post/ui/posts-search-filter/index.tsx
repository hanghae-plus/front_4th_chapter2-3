import { SearchPost, PostFilter } from "@features/post/ui"
import { PostTag } from "@entities/post/model"

interface PostsSearchFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  selectedTag: string
  tags: PostTag[]
  onTagChange: (tag: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
  sortOrder: string
  onSortOrderChange: (value: string) => void
}

export const PostsSearchFilter = ({
  searchQuery,
  onSearchChange,
  onSearch,
  selectedTag,
  tags,
  onTagChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: PostsSearchFilterProps) => (
  <div className="flex gap-4">
    <div className="flex-1">
      <SearchPost value={searchQuery} onChange={onSearchChange} onSearch={onSearch} />
    </div>
    <PostFilter
      selectedTag={selectedTag}
      tags={tags}
      onTagChange={onTagChange}
      sortBy={sortBy}
      onSortByChange={onSortByChange}
      sortOrder={sortOrder}
      onSortOrderChange={onSortOrderChange}
    />
  </div>
)
