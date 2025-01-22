import { HighlightText } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentItemProps {
  comment: Comment
  searchQuery: string
}

export const CommentItem = ({ comment, searchQuery }: CommentItemProps) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">
        <HighlightText text={comment.body} highlight={searchQuery} />
      </span>
    </div>
  )
}
