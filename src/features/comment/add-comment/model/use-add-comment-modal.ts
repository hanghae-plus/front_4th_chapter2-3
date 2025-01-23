import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { commentMutations, commentQueries } from "../../../../entities/comment/api"
import { queryClient } from "../../../../shared/api"
import { useModal } from "../../../../shared/lib"
import { Comment } from "../../../../entities/comment/model"

export const useAddCommentModal = (postId: number | undefined) => {
  const { isOpen, open, close } = useModal()
  const [body, setBody] = useState<string | null>(null)

  const addCommentMutation = useMutation({
    ...commentMutations.addMutation(),
    onSuccess: (data) => {
      if (!body || !postId) return
      queryClient.setQueryData<{ comments: Comment[] }>(commentQueries.byPost(postId), (prev) => {
        if (!prev) return { comments: [] }
        return {
          comments: [
            ...prev.comments,
            { id: Date.now(), likes: 0, user: { id: 1, username: "현재 사용자", fullName: "Current User" }, ...data },
          ],
        }
      })
      onClose()
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })

  const handleChange = (value: string) => {
    setBody(value)
  }

  const handleSubmit = () => {
    if (!body || !postId) return

    addCommentMutation.mutateAsync({
      body: body,
      postId: postId,
      userId: 1,
    })
  }

  const onClose = () => {
    close()
    setBody(null)
  }

  return {
    isOpen,
    body,
    handleChange,
    handleOpen: open,
    handleClose: onClose,
    handleSubmit,
    isSubmitting: addCommentMutation.isPending,
  }
}
