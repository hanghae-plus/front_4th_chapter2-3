import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"

export const PostDetailDialog = () => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments postId={selectedPost?.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
