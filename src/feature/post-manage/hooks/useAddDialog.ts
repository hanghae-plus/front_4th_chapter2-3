import { useState } from "react"

export const useAddDialog = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const openAddDialog = () => setShowAddDialog(true)
  const closeAddDialog = () => setShowAddDialog(false)

  return {
    showAddDialog,
    setShowAddDialog,
    openAddDialog,
    closeAddDialog,
  }
}
