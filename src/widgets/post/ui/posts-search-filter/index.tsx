import { SearchPost, PostFilter } from "@features/post/ui"
import { usePostManager } from "@features/post/model/hooks"

export const PostsSearchFilter = () => {
  const {
    searchQuery,
    selectedTag,
    tags,
    sortBy,
    sortOrder,
    setSearchQuery,
    searchPosts,
    setSelectedTag,
    setSortBy,
    setSortOrder,
  } = usePostManager()

  const onSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const onSearch = () => {
    searchPosts()
  }

  const onTagChange = (tag: string) => {
    setSelectedTag(tag)
  }

  const onSortByChange = (value: string) => {
    setSortBy(value)
  }

  const onSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value)
  }

  return (
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
}
