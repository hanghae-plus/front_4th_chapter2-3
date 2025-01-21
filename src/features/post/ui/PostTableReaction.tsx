import { Post } from "@/entities/post/model/types"
import { TableCell } from "@/shared/ui"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface PostTableReactionProps {
  post: Post
}

export const PostTableReaction = ({ post }: PostTableReactionProps) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </TableCell>
  )
}
