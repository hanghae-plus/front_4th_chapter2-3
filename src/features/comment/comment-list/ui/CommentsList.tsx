import { Plus } from "lucide-react"
import { Button } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { CommentView } from "@entities/comment/ui"
import { CommentActionButtons } from "@features/comment/comment-management/ui"

interface CommentsListProps {
  postId: number
  comments: Comment[]
  onAddClick: () => void
  onLike: (id: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (id: number, postId: number) => void
}

export const CommentsList = ({ postId, comments, onAddClick, onLike, onEdit, onDelete }: CommentsListProps) => (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button size="sm" onClick={onAddClick}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
    <div className="space-y-1">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between border-b pb-1">
          <CommentView username={comment.user.username} body={comment.body || ""} likes={comment.likes} />
          <CommentActionButtons comment={comment} postId={postId} onLike={onLike} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  </div>
)
