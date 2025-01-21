import { Dialog } from "@shared/ui"
import { Post } from "@entities/post/model"
import { Comment } from "@entities/comment/model"
import { CommentsList } from "@widgets/comment/ui/CommentsList"

interface PostDetailDialogWidgetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
  onLikeComment: (id: number, postId: number) => void
}

export const PostDetailDialogWidget = ({
  open,
  onOpenChange,
  post,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: PostDetailDialogWidgetProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>{post?.title}</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>{post?.body}</p>
          {post?.id && (
            <CommentsList
              postId={post.id}
              comments={comments}
              onAddClick={onAddComment}
              onLike={onLikeComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
