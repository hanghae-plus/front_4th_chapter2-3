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
      <Dialog.Content aria-describedby="post-detail-description">
        <Dialog.Header>
          <Dialog.Title>게시물 상세</Dialog.Title>
          <p id="post-detail-description">게시물의 상세 내용과 댓글을 확인할 수 있습니다.</p>
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
