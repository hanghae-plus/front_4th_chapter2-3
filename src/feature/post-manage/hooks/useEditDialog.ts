import { useState } from "react"

export const useEditDialog = () => {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const openEditDialog = () => setShowEditDialog(true)
  const closeEditDialog = () => setShowEditDialog(false)

  return {
    showEditDialog,
    setShowEditDialog,
    openEditDialog,
    closeEditDialog,
  }
}
