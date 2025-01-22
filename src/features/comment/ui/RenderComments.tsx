import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../types"
import HighlightText from "../../../shared/ui/HighlightText"

interface RenderCommentsProps {
  postId: number
  comments: { [key: number]: Comment[] }
  searchQuery: string
  setNewComment: React.Dispatch<React.SetStateAction<{ body: string; postId: number | null; userId: number }>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  likeComment: (id: number, postId: number) => Promise<void>
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  deleteComment: (id: number, postId: number) => Promise<void>
}

const RenderComments: React.FC<RenderCommentsProps> = ({
  postId,
  comments,
  searchQuery,
  setNewComment,
  setShowAddCommentDialog,
  likeComment,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderComments
