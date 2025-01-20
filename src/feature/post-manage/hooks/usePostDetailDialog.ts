import { useState } from "react"

export const usePostDetailDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const openPostDetailDialog = () => setShowPostDetailDialog(true)
  const closePostDetailDialog = () => setShowPostDetailDialog(false)

  return {
    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetailDialog,
    closePostDetailDialog,
  }
}
