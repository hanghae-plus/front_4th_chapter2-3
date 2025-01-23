import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { commentMutations } from "../../../entities/comment/api/mutations"
import { queryClient } from "../../../shared/api/query-client"
import { useModal } from "../../../shared/lib/hooks/modal/use-modal"
import { commentQueries } from "../../../entities/comment/api/queries"

import { Comment } from "../../../entities/comment/model/types"

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
    handleClose: close,
    handleSubmit,
    isSubmitting: addCommentMutation.isPending,
  }
}
