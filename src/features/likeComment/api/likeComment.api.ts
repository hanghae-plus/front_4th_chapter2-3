import { useMutation, UseMutationOptions } from "@tanstack/react-query"

export const useLikeCommentMutation = (
  options?: UseMutationOptions<number, Error, { commentId: number; currentLikeCount: number }>,
) =>
  useMutation({
    mutationFn: async ({ commentId, currentLikeCount }) => {
      try {
        await fetch(`/api/comments/${commentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: currentLikeCount + 1 }),
        })
        return commentId
      } catch (error) {
        throw new Error(`좋아요 추가 오류: ${error}`)
      }
    },
    ...options,
  })
