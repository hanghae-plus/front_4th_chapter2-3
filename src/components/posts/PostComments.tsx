import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { Comment } from "@/types/posts"

interface PostCommentsProps {
  comments: Comment[]
  searchQuery: string
  onCommentLike: (id: number, postId: number) => void
  onCommentEdit: (comment: Comment) => void
  onCommentDelete: (id: number, postId: number) => void
  highlightText: (text: string | undefined, highlight: string) => React.ReactNode
}

export const PostComments = ({
  comments,
  searchQuery,
  onCommentLike,
  onCommentEdit,
  onCommentDelete,
  highlightText,
}: PostCommentsProps) => {
  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onCommentLike(comment.id, comment.postId)}>
              <ThumbsUp className="w-3 h-3" />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onCommentEdit(comment)}>
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onCommentDelete(comment.id, comment.postId)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
