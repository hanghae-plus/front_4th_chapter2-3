import { CommentsList } from "../../comments/ui"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { highlightText } from "../../../shared/lib"

export const PostDetailDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  setNewComment,
  setShowAddCommentDialog,
  comments,
  likeComment,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}) => {
  return (
    <DialogContainer open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentsList
            {...{
              postId: selectedPost?.id,
              setNewComment,
              setShowAddCommentDialog,
              comments,
              searchQuery,
              likeComment,
              setSelectedComment,
              setShowEditCommentDialog,
              deleteComment,
            }}
          />
        </div>
      </DialogContent>
    </DialogContainer>
  )
}
