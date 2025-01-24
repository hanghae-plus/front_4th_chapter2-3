import { Post } from "@/entities/post/model"
import { PostDeleteButton } from "@/features/post/ui/PostDeleteButton.tsx"
import { PostOpenDetailButton } from "@/features/post/ui/PostOpenDetailButton.tsx"
import { PostShowEditDialogButton } from "@/features/post/ui/PostShowEditDialogButton.tsx"
import { TagBadge } from "@/features/tag/ui/TagBadge.tsx"
import { UserOpenDialogButton } from "@/features/user/ui/UserOpenDialogButton.tsx"
import { usePage } from "@/pages/model/usePage.ts"
import { TableCell, TableRow } from "@/shared/ui"
import { highlightText } from "@/shared/lib/highlightText.tsx"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { Key } from "react"

export function PostTableItem({ post }: { key: Key; post: Post }) {
  const { searchQuery } = usePage()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>

      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <UserOpenDialogButton user={post.author} />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>

          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <PostOpenDetailButton post={post} />
          <PostShowEditDialogButton post={post} />
          <PostDeleteButton post={post} />
        </div>
      </TableCell>
    </TableRow>
  )
}
