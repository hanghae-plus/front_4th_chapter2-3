import { Comment } from "@/entities/comment/model/types"
import { CommentContent } from "@/entities/comment/ui/CommentContent"
import { Button } from "@/shared/ui"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"

interface ListProps {
  postId: number
  comments: Record<number, Comment[]>
  searchQuery: string
  setSelectedComment: (comment: Comment) => void
  likeComment: (id: number, postId: number) => void
  deleteComment: (id: number, postId: number) => void
  setShowEditCommentDialog: (show: boolean) => void
}

export const List = ({
  postId,
  comments,
  searchQuery,
  setSelectedComment,
  likeComment,
  deleteComment,
  setShowEditCommentDialog,
}: ListProps) => {
  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <CommentContent username={comment.user.username} body={comment.body} highlight={searchQuery} />
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
  )
}
