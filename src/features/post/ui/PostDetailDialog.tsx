import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { usePostStore } from "../model/store"
import { CommentList } from "../../comment/ui/CommentList"
import { useDialogStore } from "../../../shared/model/useDialogStore"
import { usePostsFilter } from "../model/usePostFilter"

export const PostDetailDialog = () => {
  const { selectedPost } = usePostStore()
  const { searchQuery } = usePostsFilter()
  const { showPostDetailDialog, setShowPostDetailDialog } = useDialogStore()
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList />
        </div>
      </DialogContent>
    </Dialog>
  )
}
