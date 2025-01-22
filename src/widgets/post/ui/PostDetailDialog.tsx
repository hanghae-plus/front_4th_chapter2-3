import { Comment, NewComment } from "@/entities/comment/model/types"
import { Post } from "@/entities/post/model/types"
import { CommentBody } from "@/features/comment/ui/comment-list/CommentBody"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import HighlightText from "@/shared/ui/HighlightText"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: number
  selectedPost: Post
  comments: Record<number, Comment[]>
  searchQuery: string
  setNewComment: (updater: (prev: NewComment) => NewComment) => void
  setSelectedComment: (comment: Comment) => void
  likeComment: (id: number, postId: number) => void
  deleteComment: (id: number, postId: number) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  selectedPost,
  comments,
  searchQuery,
  setNewComment,
  setSelectedComment,
  likeComment,
  deleteComment,
  setShowAddCommentDialog,
  setShowEditCommentDialog,
}: PostDetailDialogProps) => {
  return (
    selectedPost && (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <HighlightText text={selectedPost.title} highlight={searchQuery} />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <HighlightText text={selectedPost.body} highlight={searchQuery} />
            </p>
            <CommentBody
              postId={selectedPost.id}
              comments={comments}
              searchQuery={searchQuery}
              setSelectedComment={setSelectedComment}
              likeComment={likeComment}
              deleteComment={deleteComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}
