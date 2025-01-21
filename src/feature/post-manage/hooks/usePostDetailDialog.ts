import { useState } from "react"

export const usePostDetailDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const openPostDetailDialog = (post) => {
    console.log("hook이 동작하는 거에요")
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }
  const closePostDetailDialog = () => {
    setSelectedPost(null)
    setShowPostDetailDialog(false)
  }

  return {
    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetailDialog,
    closePostDetailDialog,
  }
}
