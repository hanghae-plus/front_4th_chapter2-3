import { useStore } from "../../app/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { highlightText } from "../../shared/ui"
import { Comments } from "./"

/**
 * 게시물 상세 보기 대화상자자
 * @returns
 */
export const ViewPostDialog = () => {
  const { showPostDetailDialog, selectedPost, searchQuery, setShowPostDetailDialog } = useStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {Comments(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}
