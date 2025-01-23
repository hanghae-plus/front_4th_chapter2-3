import { useState } from "react"
import { useDialog } from "../../../features/dialog/model/useDialog"
import { useUpdateComment } from "../api/useUpdateComment"
import { Comment } from "../model/types"

export const useEditComment = () => {
  const { isOpen, open, close } = useDialog()
  const { mutate: updateComment } = useUpdateComment()

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const handleOpen = (comment: Comment) => {
    setSelectedComment(comment)
    open()
  }

  const handleSubmit = () => {
    if (selectedComment) {
      updateComment(selectedComment as Comment, {
        onSuccess: () => {
          close()
          setSelectedComment(null)
        },
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedComment((prev) => ({
      ...prev!,
      body: e.target.value,
    }))
  }

  return {
    isOpen,
    selectedComment,
    handleOpen,
    handleClose: close,
    handleSubmit,
    handleChange,
  }
}
