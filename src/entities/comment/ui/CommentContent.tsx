import { Comment } from "@/entities/comment/model/types"
import HighlightText from "@/shared/ui/HighlightText"

interface CommentContentProps {
  username: Comment["user"]["username"]
  body: Comment["body"]
  highlight: string
}

export const CommentContent = ({ username, body, highlight }: CommentContentProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{username}:</span>
      <span className="truncate">
        <HighlightText text={body} highlight={highlight} />
      </span>
    </div>
  )
}
