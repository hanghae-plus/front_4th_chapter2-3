import { CommentsList } from "../../comments/ui"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { highlightText } from "../../../shared/lib"

export const PostDetailDialog = ({ showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery }) => {
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
              searchQuery,
            }}
          />
        </div>
      </DialogContent>
    </DialogContainer>
  )
}
