import { useState } from "react"
import { useDialog } from "../../../widgets/dialog/model/useDialog"
import { usePostComment } from "../api/usePostComment"
import { Comment } from "../model/types"

export const useAddComment = () => {
  const { isOpen, open, close } = useDialog()
  const { mutate: addComment } = usePostComment()

  const [newComment, setNewComment] = useState<{ body: string; postId: number | null; userId: number }>({
    body: "",
    postId: null,
    userId: 1,
  })

  const handleSubmit = (postId: number) => {
    addComment(
      { ...newComment, postId },
      {
        onSuccess: () => {
          close()
          setNewComment({ body: "", postId: null, userId: 1 })
        },
      },
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prev) => ({
      ...prev,
      body: e.target.value,
    }))
  }

  return {
    isOpen,
    handleOpen: open,
    handleClose: close,
    newComment,
    handleSubmit,
    handleChange,
  }
}
