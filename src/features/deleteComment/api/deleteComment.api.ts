import { useMutation, UseMutationOptions } from "@tanstack/react-query"

export const useDeleteCommentMutation = (options?: UseMutationOptions<number, Error, { commentId: number }>) =>
  useMutation({
    mutationFn: async ({ commentId }) => {
      try {
        await fetch(`/api/comments/${commentId}`, {
          method: "DELETE",
        })
        return commentId
      } catch (error) {
        throw new Error(`댓글 삭제 오류: ${error}`)
      }
    },
    ...options,
  })
