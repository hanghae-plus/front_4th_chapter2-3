import { useMutation } from "@tanstack/react-query"
import type { UseMutationOptions } from "@tanstack/react-query"
import type { PostType } from "../../../entities/post/model"

export const useUpdatePostMutation = (options?: UseMutationOptions<PostType, Error, PostType>) =>
  useMutation({
    mutationFn: async (selectedPost: PostType) => {
      try {
        const response = await fetch(`/api/posts/${selectedPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPost),
        })
        return await response.json()
      } catch (error) {
        throw new Error(`게시물 수정 오류: ${error}`)
      }
    },
    ...options,
  })
