import { Button } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"

interface CommentActionButtonsProps {
  comment: Comment
  postId: number
  onLike: (id: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (id: number, postId: number) => void
}

export const CommentActionButtons = ({ comment, postId, onLike, onEdit, onDelete }: CommentActionButtonsProps) => (
  <div className="flex items-center space-x-1">
    <Button variant="ghost" size="sm" onClick={() => onLike(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
      <Edit2 className="w-3 h-3" />
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
)
