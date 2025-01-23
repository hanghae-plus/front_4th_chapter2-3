import { useState } from "react"
import { useDialog } from "../../../widgets/dialog/model/useDialog"
import { useGetPostDetail } from "../api/useGetPostDetail"
import { useGetPostCommentList } from "../../comment/api/useGetCommentList"

export const usePostDetail = () => {
  const { isOpen, open, close } = useDialog()
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const { data: post, isLoading: isPostLoading } = useGetPostDetail(selectedPostId)
  const { data, isLoading: isCommentsLoading } = useGetPostCommentList(selectedPostId)

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
    comments: data?.comments,
    total: data?.total,
    isLoading: isPostLoading || isCommentsLoading,
  }
}
