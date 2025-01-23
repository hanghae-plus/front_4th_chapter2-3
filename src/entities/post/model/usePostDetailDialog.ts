import { useState } from "react"
import { useDialog } from "../../../features/dialog/model/useDialog"
import { useGetPostDetail } from "../api/useGetPostDetail"

export const usePostDetailDialog = () => {
  const { isOpen, open, close } = useDialog()
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const { data: post, isLoading } = useGetPostDetail(selectedPostId)

  const handleDialog = (id: number) => {
    setSelectedPostId(id)
    open()
  }

  const handleClose = () => {
    close()
    setSelectedPostId(null)
  }

  return {
    isOpen,
    handleDialog,
    handleClose,
    post,
    isLoading,
  }
}
