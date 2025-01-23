import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { commentMutations, commentQueries } from "../../../../entities/comment/api"
import { Comment, useSelectedComment } from "../../../../entities/comment/model"
import { ToggleKey } from "../../../../pages/main/model"
import { queryClient } from "../../../../shared/api"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

export const useEditCommentModal = (postId: number | undefined) => {
  const { selectedComment, setSelectedComment } = useSelectedComment()
  const { onClose } = useToggleState<ToggleKey>()
  const [body, setBody] = useState<string | null>(null)

  const updateCommentMutation = useMutation({
    ...commentMutations.updateMutation(),
    onSuccess: (data, { id: commentId }) => {
      if (!postId || !selectedComment) return

      queryClient.setQueryData<{ comments: Comment[] }>(commentQueries.byPost(postId), (prev) => {
        if (!prev) return { comments: [] }

        const updatedComments = prev.comments.find((comment) => comment.id === commentId)

        if (!updatedComments) return prev

        return {
          comments: [
            ...prev.comments.filter((comment) => comment.id !== commentId),
            { ...updatedComments, body: data.body },
          ],
        }
      })
      handleClose()
    },
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
  })

  const selectComment = (comment: Comment) => {
    setSelectedComment(comment)
    setBody(body)
  }

  const handleChange = (value: string) => {
    setBody(value)
  }

  const handleSubmit = () => {
    if (!body || !selectedComment) return

    updateCommentMutation.mutateAsync({
      id: selectedComment.id,
      body: body,
    })
  }

  const handleClose = () => {
    onClose("editComment")
    setBody(null)
  }

  return {
    body,
    handleChange,
    handleSubmit,
    selectComment,
    isSubmitting: updateCommentMutation.isPending,
  }
}
