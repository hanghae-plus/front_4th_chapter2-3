import { useState } from "react"

export const useDetailDialog = () => {
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const openDetailDialog = () => setShowDetailDialog(true)
  const closeDetailDialog = () => setShowDetailDialog(false)

  return {
    showDetailDialog,
    openDetailDialog,
    closeDetailDialog,
  }
}
