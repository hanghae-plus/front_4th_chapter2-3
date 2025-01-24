import { type Comment } from "@/entities/comment/model"
import { CommentDeleteButton } from "@/features/comment/ui/CommentDeleteButton.tsx"
import { CommentLikeButton } from "@/features/comment/ui/CommentLikeButton"
import { CommentShowEditDialogButton } from "@/features/comment/ui/CommentShowEditDialogButton.tsx"
import { usePage } from "@/pages/model/usePage"
import { highlightText } from "@/shared/lib/highlightText"
import { Key } from "react"

export function CommentListItem({ comment }: { key: Key; comment: Comment }) {
  const { searchQuery } = usePage()

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>

      <div className="flex items-center space-x-1">
        <CommentLikeButton comment={comment} />
        <CommentShowEditDialogButton comment={comment} />
        <CommentDeleteButton comment={comment} />
      </div>
    </div>
  )
}
