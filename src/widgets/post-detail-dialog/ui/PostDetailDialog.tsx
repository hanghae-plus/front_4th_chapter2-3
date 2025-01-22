import {
  CommentItem,
  DeleteCommentButton,
  EditCommentButton,
  LikeCommentButton,
  PostCommentButton,
} from "../../../features/comments/ui"
import { Dialog, HighlightText } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"
import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: PostWithUser | null
  searchQuery: string
  comments: Record<number, Comment[]>
  postId?: number
  setShowEditCommentDialog: (open: boolean) => void
  setShowAddCommentDialog: (open: boolean) => void
  setNewComment: (post: any) => void
  setSelectedComment: (comment: Comment) => void
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  selectedPost,
  searchQuery,
  comments,
  postId,
  setShowEditCommentDialog,
  setShowAddCommentDialog,
  setNewComment,
  setSelectedComment,
}: PostDetailDialogProps) => {
  if (selectedPost === null) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost.title} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost.body} highlight={searchQuery} />
          </p>
          <div className="mt-2">
            <PostCommentButton setNewComment={setNewComment} setShowAddCommentDialog={setShowAddCommentDialog} />
            <div className="space-y-1">
              {postId &&
                comments[postId]?.map((comment) => (
                  <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                    <CommentItem comment={comment} searchQuery={searchQuery} />
                    <div className="flex items-center space-x-1">
                      <LikeCommentButton comment={comment} postId={postId} />
                      <EditCommentButton
                        comment={comment}
                        setShowEditCommentDialog={setShowEditCommentDialog}
                        setSelectedComment={setSelectedComment}
                      />
                      <DeleteCommentButton comment={comment} postId={postId} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
