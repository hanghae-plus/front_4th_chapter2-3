import { PostSearchInput } from "@/features/post/ui/PostSearchInput.tsx"
import { PostSortBySelect } from "@/features/post/ui/PostSortBySelect.tsx"
import { PostSortOrderSelect } from "@/features/post/ui/PostSortOrderSelect.tsx"
import { PostTagSelect } from "@/features/post/ui/PostTagSelect.tsx"

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
