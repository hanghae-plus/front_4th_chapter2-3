import { Dialog } from "@shared/ui"
import { Post } from "@entities/post/model"
import { Comment } from "@entities/comment/model"
import { CommentList } from "@features/comment/ui"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
  onLikeComment: (id: number, postId: number) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: PostDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>{post?.title}</Dialog.Title>
        </Dialog.Header>
        <CommentList
          post={post}
          comments={comments}
          onAddComment={onAddComment}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          onLikeComment={onLikeComment}
        />
      </Dialog.Content>
    </Dialog>
  )
}
