import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../model/types"
import { QUERY_KEYS } from "@shared/config/QueryKeys"

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: Post) => {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      })
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}
