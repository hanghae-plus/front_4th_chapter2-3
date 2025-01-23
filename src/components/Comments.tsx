import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../shared/ui"
import { highlightText } from "../utils/html"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"
import { useParamsStore } from "../store/params"
import { useComments } from "../hooks/useComments"

interface Props {
  postId: number
  onSelectComment: (comment: Comment) => void
}

export const Comments = ({ postId, onSelectComment }: Props) => {
  const { comments, deleteComment, likeComment } = useComments(postId)
  const { onOpenChange } = useDialogStore()
  const { searchQuery } = useParamsStore()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            onOpenChange("addCommentDialog", true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(searchQuery, comment.body)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  likeComment({
                    id: comment.id,
                    likes: comment.likes,
                  })
                }
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSelectComment(comment)
                  onOpenChange("editCommentDialog", true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
