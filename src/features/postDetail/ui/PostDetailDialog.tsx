import { useAtom, useAtomValue } from "jotai"

import { selectedPostAtom } from "../model"
import { searchQueryAtom } from "../../searchPost/model"
import { CommentsList } from "../../comments/ui"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { highlightText } from "../../../shared/lib"
import { dialogAtomFamily } from "../../../shared/model"

export const PostDetailDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(dialogAtomFamily("post-detail"))
  const searchQuery = useAtomValue(searchQueryAtom)
  const selectedPost = useAtomValue(selectedPostAtom)

  return (
    <DialogContainer open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentsList />
        </div>
      </DialogContent>
    </DialogContainer>
  )
}
