import { ThumbsDown, ThumbsUp } from "lucide-react"

import type { PostWithUser } from "../model/types/post"

interface PostReactionProps {
  reactions?: PostWithUser["reactions"]
}

export const PostReaction = ({ reactions }: PostReactionProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  )
}
