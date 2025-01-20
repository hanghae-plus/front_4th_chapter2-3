import { useState } from "react"

export const useAddCommentDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  const openAddCommentDialog = () => setShowAddCommentDialog(true)
  const closeAddCommentDialog = () => setShowAddCommentDialog(false)

  return {
    showAddCommentDialog,
    setShowAddCommentDialog,
    openAddCommentDialog,
    closeAddCommentDialog,
  }
}
