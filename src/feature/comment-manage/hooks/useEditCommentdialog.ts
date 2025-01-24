import { useState } from "react"

export const useEditCommentDialog = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const openEditCommentDialog = () => setShowEditCommentDialog(true)
  const closeEditCommentDialog = () => setShowEditCommentDialog(false)

  return {
    showEditCommentDialog,
    openEditCommentDialog,
    closeEditCommentDialog,
  }
}
