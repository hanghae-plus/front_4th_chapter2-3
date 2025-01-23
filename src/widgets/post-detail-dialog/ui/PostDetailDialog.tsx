import { useDialog } from "../../../app/model/DialogProvider"
import { useQueryGetComments } from "../../../entities/comment/model/hooks/useQueryGetComments"
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
  selectedPost: PostWithUser | null
  searchQuery: string
  postId: number
  // setShowEditCommentDialog: (open: boolean) => void
  // setShowAddCommentDialog: (open: boolean) => void
  // setNewComment: (post: any) => void
  // setSelectedComment: (comment: Comment) => void
  dialogId: number
}

export const PostDetailDialog = ({
  open,
  selectedPost,
  searchQuery,
  postId,
  // setShowEditCommentDialog,
  // setShowAddCommentDialog,
  // setNewComment,
  dialogId,
}: PostDetailDialogProps) => {
  const { closeDialog } = useDialog()
  const { data } = useQueryGetComments({ postId })

  const comments = data
  if (selectedPost === null) return null

  return (
    <Dialog open={open} onOpenChange={() => closeDialog(dialogId)}>
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
            {/* <PostCommentButton setNewComment={setNewComment} setShowAddCommentDialog={setShowAddCommentDialog} /> */}
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <CommentItem comment={comment} searchQuery={searchQuery} />
                  <div className="flex items-center space-x-1">
                    <LikeCommentButton comment={comment} postId={postId} />
                    <EditCommentButton postId={postId} />
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
