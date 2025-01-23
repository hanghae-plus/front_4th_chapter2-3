import { useMutation } from "@tanstack/react-query"

import type { UseMutationOptions } from "@tanstack/react-query"
import type { CommentType } from "@entities/comment/model"

export const useUpdateCommentMutation = (
  options?: UseMutationOptions<
    CommentType,
    Error,
    { comment: Partial<CommentType> | CommentType; selectedCommentId: number | undefined }
  >,
) =>
  useMutation({
    mutationFn: async ({ comment, selectedCommentId }) => {
      try {
        const response = await fetch(`/api/comments/${selectedCommentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: comment.body }),
        })

        return await response.json()
      } catch (error) {
        throw new Error(`댓글 수정 오류: ${error}`)
      }
    },
    ...options,
  })
