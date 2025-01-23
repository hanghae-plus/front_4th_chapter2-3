import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../model/types"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"

export const usePostPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPost: Partial<Post>) => {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
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
      console.error("게시물 추가 오류:", error)
    },
  })
}
