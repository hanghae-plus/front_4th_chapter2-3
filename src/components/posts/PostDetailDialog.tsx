import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { PostComments } from "./PostComments"
import { usePostsStore } from "../../stores/usePostsStore"

export const PostDetailDialog = () => {
  const {
    selectedPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    handleCommentLike,
    handleCommentEdit,
    handleCommentDelete,
  } = usePostsStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedPost?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{selectedPost?.body}</p>
          <PostComments
            comments={selectedPost?.comments || []}
            onCommentLike={handleCommentLike}
            onCommentEdit={handleCommentEdit}
            onCommentDelete={handleCommentDelete}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
