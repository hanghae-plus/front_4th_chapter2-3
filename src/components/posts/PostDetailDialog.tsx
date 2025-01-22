import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Post, Comment } from "@/types/posts"
import { PostComments } from "./PostComments"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  comments: Comment[]
  searchQuery: string
  onCommentLike: (id: number, postId: number) => void
  onCommentEdit: (comment: Comment) => void
  onCommentDelete: (id: number, postId: number) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  comments,
  searchQuery,
  onCommentLike,
  onCommentEdit,
  onCommentDelete,
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{post.body}</p>
          <PostComments
            comments={comments}
            onCommentLike={onCommentLike}
            onCommentEdit={onCommentEdit}
            onCommentDelete={onCommentDelete}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
