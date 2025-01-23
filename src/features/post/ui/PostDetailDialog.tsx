import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { usePostStore } from "../model/store"
import { CommentList } from "../../comment/ui/CommentList"

export const PostDetailDialog = ({
  setShowAddCommentDialog,
  setShowEditCommentDialog,
  deleteComment,
  searchQuery,
  likeComment,
  showPostDetailDialog,
  setShowPostDetailDialog,
}) => {
  const { selectedPost } = usePostStore()
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList
            setShowAddCommentDialog={setShowAddCommentDialog}
            likeComment={likeComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
