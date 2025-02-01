import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { commentMutations, commentQueries } from "../../../../entities/comment/api"
import { queryClient } from "../../../../shared/api"
import { useToggleState } from "../../../../shared/model/ToggleStateContext"
import { Comment } from "../../../../entities/comment/model"
import { ToggleKey } from "../../../../pages/main/model"

export const useAddCommentModal = (postId: number | undefined) => {
  const { onClose } = useToggleState<ToggleKey>()
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
      handleClose()
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

  const handleClose = () => {
    onClose("addComment")
    setBody(null)
  }

  return {
    body,
    handleChange,
    handleSubmit,
    isSubmitting: addCommentMutation.isPending,
  }
}
