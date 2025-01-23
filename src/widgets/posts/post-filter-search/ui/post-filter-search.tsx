import { PostFilterSortBy, PostFilterSortOrder, PostFilterTag } from "@/features/post/post-filter"
import { PostSearch } from "@/features/post/post-search"

function PostFilterSearch() {
  return (
    <div className="flex gap-4">
      <PostSearch />
      <PostFilterTag />
      <PostFilterSortBy />
      <PostFilterSortOrder />
    </div>
  )
}

export { PostFilterSearch }
