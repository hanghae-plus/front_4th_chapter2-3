import { useMutation } from "@tanstack/react-query"

import type { UseMutationOptions } from "@tanstack/react-query"
import type { NewPostType } from "@features/addPost/model"

export const useAddPostMutation = (options: UseMutationOptions<NewPostType, Error, NewPostType>) =>
  useMutation({
    mutationFn: async (newPost: NewPostType) => {
      try {
        const response = await fetch("/api/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        })
        return await response.json()
      } catch (error) {
        throw new Error(`게시물 추가 오류: ${error}`)
      }
    },
    ...options,
  })
