import { ThumbsDown, ThumbsUp } from "lucide-react"

interface PostReactionsProps {
  likes: number
  dislikes: number
}

function PostReactions(props: PostReactionsProps) {
  const { likes, dislikes } = props

  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{likes}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{dislikes}</span>
    </div>
  )
}

export { PostReactions }
