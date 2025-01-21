import { SearchInput } from "@features/post/post-search/ui/SearchInput"
import { FilterControls } from "@features/post/post-filtering/ui/FilterControls"
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
      <SearchInput value={searchQuery} onChange={onSearchChange} onSearch={onSearch} />
    </div>
    <FilterControls
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
