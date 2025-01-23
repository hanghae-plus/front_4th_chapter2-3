import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { highlightText } from "../../../shared/lib/utils/highlight-text"

interface CommentListProps {
  comments?: Comment[]
  postId: number
  onClickAddButton: () => void
  onClickEditButton: (id: number, body: string) => void
  onClickDeleteButton: (id: number, postId: number) => void
  onClickLikeButton: (id: number, postId: number) => void
  searchQuery: string
}

export const CommentList = ({
  comments,
  postId,
  onClickAddButton,
  onClickEditButton,
  onClickDeleteButton,
  onClickLikeButton,
  searchQuery,
}: CommentListProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            onClickAddButton()
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <span className="font-medium whitespace-nowrap">{comment.user.username}:</span>
              <span className="break-all">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => onClickLikeButton(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClickEditButton(comment.id, comment.body)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onClickDeleteButton(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
