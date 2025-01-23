import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Button } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { useCommentStore } from "@features/comment/model/stores"

interface CommentActionButtonsProps {
  comment: Comment
  postId: number
}

export const CommentActionButtons = ({ comment, postId }: CommentActionButtonsProps) => {
  const { likeComment, deleteComment, setSelectedComment, setShowEditCommentDialog } = useCommentStore()

  const handleEdit = () => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return (
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={handleEdit}>
        <Edit2 className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  )
}
