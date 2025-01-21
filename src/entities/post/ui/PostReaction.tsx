import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Post } from "../model/types"

interface PostReactionProps {
    post: Post
}

export const PostReaction = ({post}: PostReactionProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{post.reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{post.reactions?.dislikes || 0}</span>
    </div>
  )
}
