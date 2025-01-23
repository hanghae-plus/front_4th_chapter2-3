import { useMutation } from "@tanstack/react-query"
import type { UseMutationOptions } from "@tanstack/react-query"

export const useDeletePostMutation = (options: UseMutationOptions<number, Error, number>) =>
  useMutation({
    mutationFn: async (postId: number) => {
      try {
        await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        })
        return postId
      } catch (error) {
        throw new Error(`게시물 삭제 오류: ${error}`)
      }
    },
    ...options,
  })
