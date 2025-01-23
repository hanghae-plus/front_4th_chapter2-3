import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import type { NewCommentType } from "@features/addComment/model"
import type { CommentType } from "@entities/comment/model"

export const useAddCommentMutation = (options?: UseMutationOptions<CommentType, Error, NewCommentType>) =>
  useMutation({
    mutationFn: async (comment: NewCommentType) => {
      try {
        const response = await fetch(`/api/comments/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        })
        return await response.json()
      } catch (error) {
        throw new Error(`댓글 추가 오류: ${error}`)
      }
    },
    ...options,
  })
