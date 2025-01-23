import { highlightText } from "../../../shared/lib/highlightText"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Comment } from "../../comment/model/types"
import { CommentList } from "../../comment/ui/CommentList"
import { Post } from "../model/types"

interface Props {
  open: boolean
  onClose: () => void
  post?: Post
  searchQuery?: string
  comments?: Comment[] | null
  handleClickAddButton: () => void
  handleClickEditButton: (id: number, body: string) => void
  handleClickDeleteButton: (id: number, postId: number) => void
  handleClickLikeButton: (id: number, postId: number) => void
}

export const PostDetailDialog = ({
  open,
  onClose,
  post,
  searchQuery = "",
  comments = [],
  handleClickAddButton,
  handleClickEditButton,
  handleClickDeleteButton,
  handleClickLikeButton,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post?.title && highlightText(post?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{post?.body && highlightText(post?.body, searchQuery)}</p>
          {post?.id && comments && (
            <CommentList
              comments={comments}
              postId={post.id}
              searchQuery={searchQuery}
              handleClickAddButton={handleClickAddButton}
              handleClickEditButton={handleClickEditButton}
              handleClickDeleteButton={handleClickDeleteButton}
              handleClickLikeButton={handleClickLikeButton}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
