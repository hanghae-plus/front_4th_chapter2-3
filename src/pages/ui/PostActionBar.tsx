import { PostSearchInput } from "@/features/post/ui/PostSearchInput"
import { PostSortBySelect } from "@/features/post/ui/PostSortBySelect"
import { PostSortOrderSelect } from "@/features/post/ui/PostSortOrderSelect"
import { PostTagSelect } from "@/features/post/ui/PostTagSelect"

export function PostActionBar() {
  return (
    <div className="flex gap-4">
      <PostSearchInput />
      <PostTagSelect />
      <PostSortBySelect />
      <PostSortOrderSelect />
    </div>
  )
}
