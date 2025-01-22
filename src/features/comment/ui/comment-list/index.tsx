import { Plus } from "lucide-react"
import { Button } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { CommentView } from "@entities/comment/ui"
import { CommentActionButtons } from "@features/comment/ui"
import { Post } from "@entities/post/model"

interface CommentListProps {
  post: Post | null
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
  onLikeComment: (id: number, postId: number) => void
}

export const CommentList = ({
  post,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: CommentListProps) => {
  return (
    <div className="space-y-4">
      <p>{post?.body}</p>
      {post?.id && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">댓글</h3>
            <Button size="sm" onClick={onAddComment}>
              <Plus className="w-3 h-3 mr-1" />
              댓글 추가
            </Button>
          </div>

          <div className="space-y-1">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center justify-between border-b pb-1">
                <CommentView username={comment.user.username} body={comment.body || ""} likes={comment.likes} />
                <CommentActionButtons
                  comment={comment}
                  postId={post.id}
                  onLike={onLikeComment}
                  onEdit={onEditComment}
                  onDelete={onDeleteComment}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
