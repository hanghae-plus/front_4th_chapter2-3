import { useCommentStore } from "@/features/comment/model"
import { Header, List } from "@/features/comment/ui/comment-list"
import { usePostStore } from "@/features/post/model"
import { usePostUrlStore } from "@/features/post/post-url/model"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import HighlightText from "@/shared/ui/HighlightText"

export const PostDetailDialog = () => {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostStore()
  const { searchQuery } = usePostUrlStore()
  const {
    comments,
    setSelectedComment,
    setNewComment,
    setShowAddCommentDialog,
    likeComment,
    deleteComment,
    setShowEditCommentDialog,
  } = useCommentStore()
  return (
    selectedPost && (
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
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
            <Header
              postId={selectedPost.id}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
            />
            <List
              postId={selectedPost.id}
              comments={comments}
              searchQuery={searchQuery}
              setSelectedComment={setSelectedComment}
              likeComment={likeComment}
              deleteComment={deleteComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}
