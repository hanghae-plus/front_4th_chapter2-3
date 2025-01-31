import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@shared/ui"
import { highlightText } from "@shared/lib/highlightText"
import { Comment } from "../model/types"
import { Post } from "@entities/post/model/types"

interface Props {
  comments: Comment[]
  postId: Post["id"]
  searchQuery: string
  handleClickAddButton: () => void
  handleClickEditButton: (comment: Comment) => void
  handleClickDeleteButton: (comment: Comment) => void
  handleClickLikeButton: (comment: Comment, postId: number) => void
}
export const CommentList = ({
  comments,
  postId,
  searchQuery,
  handleClickAddButton,
  handleClickDeleteButton,
  handleClickEditButton,
  handleClickLikeButton,
}: Props) => (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button size="sm" onClick={handleClickAddButton}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
    <div className="space-y-1">
      {comments?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => handleClickLikeButton(comment, postId)}>
              <ThumbsUp className="w-3 h-3" />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                handleClickEditButton(comment)
              }}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleClickDeleteButton(comment)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
